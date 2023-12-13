import React, { Component,useState,useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCheckboxWithLabel from "../components/MaterialCheckboxWithLabel";
import MaterialButtonText from "../components/MaterialButton";
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

function Listartareas({ route }) {
  const { tipo,statusTasks } = route.params;
  // console.log(tipo,statusTasks);
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation(); 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Filter tasks based on the tipo parameter
  const filteredTasks = tasks.filter((task) => task.tipo === tipo && task.status === statusTasks);

  const handleCheckboxPress = (index) => {
    const updatedTasks = [...tasks]; // Create a copy of the tasks array
    updatedTasks[index].marked = !updatedTasks[index].marked; // Toggle the status
    setTasks(updatedTasks); // Update the state with the modified tasks
    console.log(updatedTasks,index);
  };

  const handleDeleteTasks = async () => {
    try {
      const updatedTasks = tasks.filter((task) =>  !task.marked);
      setTasks(updatedTasks);

      // Save the updated tasks array back to AsyncStorage
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

      console.log(" tasks deleted successfully");
    } catch (error) {
      console.error("Error deleting  tasks:", error);
    }
  };
  const handleCompleteTasks = async () => {
    try {
      const updatedTasks = tasks.map((task) => ({
        ...task,
        status: task.marked ? true : task.status,
        marked: false
      }));
      setTasks(updatedTasks);

      // Save the updated tasks array back to AsyncStorage
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      
      console.log(updatedTasks);
      console.log(" tasks Updated successfully");
    } catch (error) {
      console.error("Error Updated  tasks:", error);
    }
  };
  const navigateToEditScreen = (taskId) => {
    navigation.navigate("EditarTarea", { taskId });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.stadotarea}>{!statusTasks?'Por hacer':'Completadas'}</Text>
      <Text style={styles.trabajo}>{tipo}</Text>

      <View style={styles.materialButtonPink1Row}>
        <MaterialButtonText
          style={styles.buttonBorrar}
          text='Borrar'
          onPress={handleDeleteTasks}
        ></MaterialButtonText>
        {!statusTasks &&
        <MaterialButtonText
          style={styles.materialButtonSuccess1}
          text='Completar'
          onPress={handleCompleteTasks}
        ></MaterialButtonText>
      }
      </View>
      <View style={{ marginLeft:45 }}>
        {filteredTasks.map((task, index) => (
            <MaterialCheckboxWithLabel
              key={index}
              label={task.titulo}
              checked={task.marked}
              onPress={() => handleCheckboxPress(index)}
              // checked = {checked}
              editFunc={() => navigateToEditScreen(task.id)}
            />
          ))}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  stadotarea:{
    fontSize:18,
    marginLeft:50,
    marginTop:25
  },
  trabajo: {
    color: "#121212",
    height: 46,
    width: 259,
    fontSize: 35,
    textAlign: "center",
    marginTop: 12,
    marginBottom:25,
    marginLeft: 58
  },
  materialCheckboxWithLabel: {
    height: 55,
    width: 335,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 39,
    shadowOpacity: 0.21,
    shadowRadius: 13,
    marginLeft: 0
  },
  buttonBorrar: {
    height: 36,
    width: 100,
    marginTop: 3,
    backgroundColor:'red',
    
  },
  materialButtonSuccess1: {
    height: 36,
    width: 100,
    marginLeft: 64,
    backgroundColor:'green'
  },
  materialButtonPink1Row: {
    height: 39,
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 68,
    marginRight: 0,
    marginBottom:55
  }
});

export default Listartareas;
