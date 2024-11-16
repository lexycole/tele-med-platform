import * as React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { colors } from "./colors";

const MultiInput = ({ title, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.inputPlaceHolder}
        value={value}
        onChangeText={onChangeText}
        multiline
      />
    </View>
  );
};

export default MultiInput;

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
    minHeight: 85,
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
    textAlignVertical: "top",
    paddingVertical: 5,
  },
});
