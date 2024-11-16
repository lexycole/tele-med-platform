import React from "react";
import { Text, View } from "react-native";

export default function Timeline({ cellHeight = 60 }) {
  const timelineItems = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let i = 0; i < 4; i++) {
      const minute = i * 15;
      const label = `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
      const subpartHeight = cellHeight / 4;
      {
        timelineItems.push(
          <View
            key={`${hour}-${minute}`}
            style={{
              width: '100%',
              height: subpartHeight,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              // backgroundColor: "#F6F6F6",
            }}
          >
            <Text style={{ fontSize: 10, color: '#003C75' }}>{label}</Text>
          </View>
        );
      }
    }
  }
  
  return (
    <View
      style={{
        height: 24 * cellHeight + 60,
        width: 60,
        backgroundColor: 'white',
      }}
    >
      <View style={{ height: 60, borderBottomWidth: 1, borderColor: '#ddd' }} />
      {timelineItems}
    </View>
  );
      
}
