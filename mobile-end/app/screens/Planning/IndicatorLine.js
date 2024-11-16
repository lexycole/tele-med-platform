import React from "react";
import { View, Text } from "react-native";

const IndicatorLine = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        marginVertical: props.timeMargin,
        marginHorizontal: 5,
      }}
    >
      <Text style={{ color: "red" }}>{props.time}</Text>
      <View
        style={{
          position: "absolute",
          marginHorizontal: 45,
          width: 1000,
          height: 3,
          backgroundColor: "red",
          marginVertical: 20,
        }}
      ></View>
    </View>
  );
};

export default IndicatorLine;
