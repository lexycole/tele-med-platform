import * as React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { colors } from "./colors";

const Input = ({ title, placeholder, value, onChangeText, editable }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.inputPlaceHolder}
        value={value}
        onChangeText={onChangeText}
        editable={editable == "false" ? false : true}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  containerStyle: {
    width: "90%",
    alignSelf: "center",
  },
  textStyle: {
    color: colors.inputTitleColor,
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    height: 42,
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 6,
    marginTop: 8,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 16,
    color: colors.inputTextColor,
    borderColor: colors.inputPlaceHolder,
    borderWidth: 1,
  },
});
