import React, { Component,useState } from "react";
import { StyleSheet, View, Text} from "react-native";
import AsyncStorage  from '@react-native-async-storage/async-storage'
import {Picker}  from "@react-native-picker/picker";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import { useNavigation } from '@react-navigation/native';
import MaterialButtonText from "../components/MaterialButton";


function CrearTarea(props) {
  const [tipo, setTipo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  

  const saveTask = async () => {
    try {
      const task =  { tipo, titulo, descripcion,status:false };
     
      const existingTasks = await AsyncStorage.getItem("tasks");
     
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
    
      tasks.push(task);


      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));

      setTipo("");
      setTitulo("");
      setDescripcion("");
      navigation.navigate('Home'); 
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agregar Tarea</Text>
      <View style={styles.materialUnderlineTextboxStack}>
        <MaterialUnderlineTextbox
          placeholder='Titulo'
          style={styles.materialUnderlineTextbox}
          onChangeText={(text) => setTitulo(text)}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onChangeText={(value) => setTipo(value)}
          onValueChange={(value) => setTipo(value)}
          style={styles.picker}
        >
          <Picker.Item label="Tipo" value="" />
          <Picker.Item label="Casa" value="casa" />
          <Picker.Item label="Trabajo" value="trabajo" />
          <Picker.Item label="Negocio" value="negocio" />
        </Picker>
      </View>
      <MaterialUnderlineTextbox
        placeholder="Descripcion"
        style={styles.materialUnderlineTextbox3}
        onChangeText={(text) => setDescripcion(text)}
      />
      <MaterialButtonText
        style={[styles.materialButtonSuccess,styles.buttonSave]}
        text='Guardar'
        onPress={saveTask}
      ></MaterialButtonText>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonSave:{
    backgroundColor: "#009688",
    color:'white'
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  picker: {
    width: 150,
    height: 30,
  },
  text: {
    color: "#121212",
    height: 46,
    width: 259,
    fontSize: 35,
    textAlign: "center",
    marginTop: 25,
    marginLeft: 58
  },
  materialUnderlineTextbox: {
    height: 43,
    width: 262,
    position: "absolute",
    left: 0,
    top: 0
  },
  materialUnderlineTextbox1: {
    height: 43,
    width: 266,
    marginLeft: 55
  },
  materialUnderlineTextboxStack: {
    width: 262,
    height: 43,
    marginTop: 40,
    marginLeft: 58
  },
  materialIconTextbox: {
    height: 43,
    width: 268,
    marginTop: 22,
    marginLeft: 46
  },
  materialUnderlineTextbox3: {
    height: 131,
    width: 260,
    overflow: "scroll",
    marginLeft: 57
  },
  materialButtonSuccess: {
    height: 36,
    width: 100,
    marginTop: 35,
    marginLeft: 130
  },
  pickerContainer:{
    marginLeft:45
  }
});

export default CrearTarea;
