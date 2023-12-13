import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text,View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialCheckboxWithLabel(props) {
  return (
    <View>

    <TouchableOpacity style={[styles.container, props.style]}>
      <Icon
        name={props.checked ? "checkbox-marked" : "checkbox-blank-outline"}
        style={styles.checkIcon}
        onPress={props.onPress}
      ></Icon>
      <Text style={styles.entregarProyecto}>
        {props.label }
      </Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon
          name={"edit"}
          style={styles.checkIcon}
          onPress={props.editFunc}
        ></Icon>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  checkIcon: {
    color: "#3F51B5",
    fontSize: 28,
    lineHeight: 28
  },
  entregarProyecto: {
    marginLeft: 2,
    fontSize: 16,
    color: "rgba(0,0,0,0.87)"
  }
});

export default MaterialCheckboxWithLabel;
