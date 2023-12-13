import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text,View } from "react-native";

function MaterialButton(props) {
  if(props.counter ===undefined){
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Text style={[styles.tarea, props.styleText]}>{props.text}</Text>
    </TouchableOpacity>
  );
  }else{
    return (
      <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
        <Text style={[styles.tarea, props.styleText]}>{props.text}</Text>
            <Text style={styles.badgeText}>{props.counter}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "#DFDFDF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
        paddingLeft: 16,
    paddingRight: 16,
    borderRadius:8,
  },
  tarea: {
    fontSize: 14,
    color:'white'
  },
  badgeText: {
    width:25,
    height:25,
    backgroundColor: "#b3261e", 
    borderRadius: 12, 
    padding: 5, 
    position: "absolute",
    top: 10,
    right:15,
    textAlign:"center",
    color: "white", 
    fontSize: 12, 
    fontWeight: "bold",
  },
});

export default MaterialButton;
