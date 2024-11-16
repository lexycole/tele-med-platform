import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const TabButton = ({ selectedTab, title, bgColor, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        backgroundColor: bgColor,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        paddingHorizontal: 10,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingHorizontal: 10,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({});
