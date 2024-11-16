import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import styles from './styles'

export default function TabItem({ active, title, setIndex, color }) {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width:
          title == "Medical History"
            ? 150
            : title == "Interview"
            ? 95
            : title == "Inspection & Examination"
            ? 245
            : title == "Homeo Treatment"
            ? 170
            : title == "File Attachments"
            ? 170
            : title == "Previous Session"
            ? 170
            : title == "Notes"
            ? 88
            : 100,
        backgroundColor: active ? "transparent" : color,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
      }}
      onPress={setIndex}
    >
      <Text
        style={{ fontSize: 18, fontWeight: "bold", marginHorizontal: "5%" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
