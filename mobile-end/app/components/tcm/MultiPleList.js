import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

const MultipleList = ({ data }) => {
  return (
    <>
      <Text style={{ margin: 10, fontSize: 20, color: "#888" }}>
        {data.title}
      </Text>
      <FlatList
        style={{ marginVertical: 10, marginHorizontal: 10, flex: 1 }}
        data={data.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              padding: 5,
              borderWidth: 1,
              borderColor: "#ddd",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              marginVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 10,
                marginRight: 10,
              }}
            >
              {item.lable}:
            </Text>
            <Text style={{ fontSize: 16, color: "#666" }}>{item.value}</Text>
          </View>
        )}
      />
    </>
  );
};

export default MultipleList;

const styles = StyleSheet.create({});
