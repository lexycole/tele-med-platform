import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
// import { useSelector } from "react-redux";
import { useSnapshot } from "valtio";
import { colors } from "../../../components/MedicalSession/colors";
import { ayurvedaState } from "../../../(public)/AyurvedaSession";
import SessionItem from "./SessionItem";
import SessionMoreDetails from "./SessionMoreDetails";
import { state } from "../../../_layout";

function PreviousSessionTab({ }) {
  const snapshot = useSnapshot(ayurvedaState);
  const { isTablet } = useSnapshot(state);
  // const { sessions } = useSelector((state) => state.sessions);
  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedSessionData, setSelectedSessionData] = useState([]);
  // const [patientSessions, setPatientSessions] = useState([]);

  React.useEffect(() => {
    if (snapshot.isPatient && !modalVisible) {
      let filteredPatients = sessions.filter(
        (session) => session.patientId === snapshot.selectedPatient.id
      ).reverse()
      setPatientSessions(filteredPatients)
    }
  }, [snapshot.selectedPatient, modalVisible]);


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={patientSessions}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={{ marginBottom: 16, width: "100%", margin: 10 }}>
            <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
              No patient is selected or there is no previous session
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View key={item.id} style={styles.itemCardContainer}>
              <SessionItem item={item} isTablet={isTablet} 
              // selectItem={() => {
              //   setSelectedSessionData(item);
              //   setModalVisible(true);
              // }} 
              />
              {!isTablet && <TouchableHighlight
                style={styles.openButton}
                // onPress={() => {
                //   setSelectedSessionData(item);
                //   setModalVisible(true);
                // }}
              >
                <Text style={styles.textStyle}>View Detail</Text>
              </TouchableHighlight>}
            </View>
          );
        }}
      />
      {modalVisible && (
        <SessionMoreDetails
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={selectedSessionData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: "bold", fontSize: 20, padding: 20 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  itemCardContainer: {
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginVertical: 10,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#666",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 18,
    margin: 10,
    padding: 10,
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: colors.pickerBackColor,
    borderRadius: 10,
  },
});

export default PreviousSessionTab;