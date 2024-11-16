import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { state } from "../../_layout";

const IconBar = ({ onEditPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require("../../assets/icons/new.jpg")}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.iconContainer} onPress={onEditPress}>
        <Image
          source={require("../../assets/icons/edit.png")}
          style={styles.icon}
        />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={require("../../assets/dele.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require("../../assets/icons/xls.jpg")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require("../../assets/icons/csv.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require("../../assets/icons/pdf.jpg")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IconBar;

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", margin: 10 },
  iconContainer: {
    padding: 5,
    marginRight: 10,
    backgroundColor: "lightblue",
  },
  icon: {
    height: 30,
    width: 30,
  },
});
