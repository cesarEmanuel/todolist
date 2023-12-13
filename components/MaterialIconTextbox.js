import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialIconTextbox(props) {
  return (
    <View style={[styles.container, props.style]} onPress={props.onPress}>
      <TextInput
        placeholder={props.placeholder }
        style={styles.inputStyle}
        onChangeText={props.onChangeText}
      ></TextInput>
      <Icon name="calendar" style={styles.iconStyle}></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    
  },
  inputStyle: {
    color: "#000",
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    paddingTop: 14,
    paddingBottom: 8,
    textAlign: "left"
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 8
  }
});

export default MaterialIconTextbox;
