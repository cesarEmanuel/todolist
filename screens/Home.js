import React, { Component, useState,useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MaterialButtonText from "../components/MaterialButton";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage  from '@react-native-async-storage/async-storage'
function Home(props) {
  const navigation = useNavigation(); 
  const [done,setDone] = useState(false)
  const [counterCasa, setCounterCasa] = useState(0);
  const [counterNegocio, setCounterNegocio] = useState(0);
  const [counterTrabajo, setCounterTrabajo] = useState(0);

  const navigateToCreateTask = () => {
    navigation.navigate('CrearTarea'); 
  };
  const navigateToButton = (tipo,hecho) => {
    navigation.navigate('Listartareas', { tipo:tipo,statusTasks:hecho });
  };
  const countTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        const countCasa = parsedTasks.filter(task => task.tipo === 'casa').length;
        const countNegocio = parsedTasks.filter(task => task.tipo === 'negocio').length;
        const countTrabajo = parsedTasks.filter(task => task.tipo === 'trabajo').length;

        setCounterCasa(countCasa);
        setCounterNegocio(countNegocio);
        setCounterTrabajo(countTrabajo);
      }
    } catch (error) {
      console.error("Error counting tasks:", error);
    }
  };

  // Call the countTasks function whenever the component mounts or 'done' changes
  useEffect(() => {
    countTasks();
  }, [done]);
  return (
    <View style={styles.container}>
        <MaterialButtonText
          style={styles.materialButtonText}
          text='+ Tarea'
          onPress={navigateToCreateTask}
        ></MaterialButtonText>
      <View style={styles.materialButtonVioletRow}>
        <MaterialButtonText
          style={[styles.materialButtonViolet,!done?styles.doneTask:'']}
          text='Por hacer'
          onPress={()=>{setDone(false)}}
        ></MaterialButtonText>
        <MaterialButtonText
          style={[styles.materialButtonPink,done?styles.doneTask:'']}
          text='Completadas'
          onPress={()=>{setDone(true)}}
        ></MaterialButtonText>
      </View>
      <MaterialButtonText
        style={styles.materialButtonLight}
        text='Negocio'
        counter={counterNegocio}
        styleText={styles.materialColoText}
        onPress={()=>navigateToButton('negocio',done)}
      ></MaterialButtonText>
      <MaterialButtonText
        style={[styles.materialButtonLight,styles.materialButtonLight1]}
        text={`Casa`}
        counter={counterCasa}
        styleText={styles.materialColoText}
        onPress={()=>navigateToButton('casa',done)}
      ></MaterialButtonText>
      <MaterialButtonText
        style={[styles.materialButtonLight,styles.materialButtonLight1]}
        text='Trabajo'
        counter={counterTrabajo}
        styleText={styles.materialColoText}
        onPress={()=>navigateToButton('trabajo',done)}
      ></MaterialButtonText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  doneTask:{
    backgroundColor:"gray",
    color:'white',
    borderWidth:2,
    borderColor:'black'
  },
  addStyles:{
    color:'white'
  },
  materialButtonViolet: {
    backgroundColor: "#3F51B5",
    height: 36,
    width: 100
  },
  materialButtonPink: {
    backgroundColor: "#E91E63",
    height: 36,
    width: 120
  },
  materialButtonVioletRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 45,
    marginLeft: 78,
    marginRight: 97
  },
  materialButtonText: {
    height: 36,
    width: 100,
    marginTop: 47,
    marginLeft: 28,
    backgroundColor:'black'
  },
  materialButtonLight: {
    height: 46,
    width: 240,
    marginTop: 40,
    marginLeft: 71,
    backgroundColor:'#fff',
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 45,
    shadowOpacity: 0.63,
    shadowRadius: 15
  },
  materialButtonLight1: {
    marginTop: 35,
  },
  materialColoText:{
    color:'gray'
  }
});

export default Home;
