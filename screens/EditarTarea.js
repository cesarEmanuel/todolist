// EditarTarea.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import MaterialButtonText from "../components/MaterialButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import {Picker}  from "@react-native-picker/picker";
import AsyncStorage  from '@react-native-async-storage/async-storage'


function EditarTarea() {
  const route = useRoute();
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    // Fetch task details based on the task ID from route.params
    const fetchTaskDetails = async () => {
      try {
        const taskId = route.params.taskId; // Assuming taskId is passed from the navigator
        const existingTasks = await AsyncStorage.getItem("tasks");
        const tasks = existingTasks ? JSON.parse(existingTasks) : [];

        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (taskToEdit) {
          setTitulo(taskToEdit.titulo);
          setTipo(taskToEdit.tipo);
          setDescripcion(taskToEdit.descripcion);
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [route.params]);

  const updateTask = async () => {
    try {
      const taskId = route.params.taskId; 
      const existingTasks = await AsyncStorage.getItem("tasks");
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];

      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, titulo, tipo, descripcion }
          : task
      );
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating task:", error);
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
          value={titulo}
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
        value={descripcion}
      />
      <MaterialButtonText
        style={[styles.materialButtonSuccess,styles.buttonSave]}
        text='Guardar'
        onPress={updateTask}
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
export default EditarTarea;
