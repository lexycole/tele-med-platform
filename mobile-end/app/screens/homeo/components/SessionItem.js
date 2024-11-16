import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const SessionItem = ({ item, isTablet, selectItem }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={[{ width: isTablet ? "15%" : "18%" }, styles.tableHeaderText]}>Date</Text>
        <Text style={[{ width: isTablet ? "15%" : "18%" }, styles.tableHeaderText]}>Complaint</Text>
        <Text style={[{ width: isTablet ? "15%" : "18%" }, styles.tableHeaderText]}>session</Text>
        <Text style={[{ width: isTablet ? "15%" : "18%" }, styles.tableHeaderText]}>Practitioner</Text>
        <Text style={[{ width: isTablet ? "15%" : "18%" }, styles.tableHeaderText]}>Clinic</Text>
        {isTablet && <Text style={[{ width: isTablet ? "15%" : "18%" }, styles.tableHeaderText]}></Text>}
      </View>
      <View style={styles.itemInfoContainer}>
        <Text style={[{ width: isTablet ? "16%" : "20%" }, styles.tableItemText]}>{item?.date.split("T")[0]}</Text>
        <Text style={[{ width: isTablet ? "16%" : "20%" }, styles.tableItemText]}>{item?.complaint}</Text>
        <Text style={[{ width: isTablet ? "16%" : "20%" }, styles.tableItemText]}>{item?.sessionType}</Text>
        <Text style={[{ width: isTablet ? "16%" : "20%" }, styles.tableItemText]}>{item?.practitioner}</Text>
        <Text style={[{ width: isTablet ? "16%" : "20%" }, styles.tableItemText]}>{item?.clinic}</Text>
        {isTablet && <TouchableHighlight
          style={styles.openButton}
          onPress={() => selectItem()}
        >
          <Text style={styles.textStyle}>View Detail</Text>
        </TouchableHighlight>}
      </View>
    </View>
  );
};

export default SessionItem;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    width: "100%",
  },
  itemInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableItemText: {
    textAlign: "center",
    fontSize: 12,
  },
  openButton: {
    backgroundColor: "#666",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
});
