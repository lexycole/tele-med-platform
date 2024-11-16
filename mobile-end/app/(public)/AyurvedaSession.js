import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { useDispatch, useSelector } from "react-redux";
import { proxy, useSnapshot } from "valtio";

// import {
//   getAyurvedaSession,
//   postAyurvedaSession,
//   updateAyurvedaSession,
// } from "../../../src/api/ayurveda";
import Header from "../components/Header";
// import { colors } from "../../components/homeo/colors";
// import { fetchMedicalfiles } from "../store/medicalfiles";
// import { fetchPatients } from "../store/patients";
// import { fetchSessions } from "../store/ayurvedasessions";
import InspectionAndExaminationTab from "../screens/ayurveda/components/InspectionAndExaminationTab";
import InterviewTab from "../screens/ayurveda/components/InterviewTab";
import MedicalHistoryTab from "../screens/ayurveda/components/MedicalHistoryTab";
import PatientSelectionSection from "../screens/ayurveda/components/PatientSelectionSection";
import PreviousSessionTab from "../screens/ayurveda/components/PreviousSessionTab";
import Tabs from "../screens/ayurveda/components/Tabs";
// import ActivityIndicator from "../../components/ActivityIndicator";
import AyurvedaTreatmentTab from "../screens/ayurveda/components/AyurvedaTreatmentTab";
import { SafeAreaView } from "react-native-safe-area-context";
// import apiClient from "../../../src/api/client";

export const ayurvedaState = proxy({
  tabName: "medicalHistory",
  medicalHistory: null,
  isMedical: false,
  interview: null,
  isInterview: false,
  inspection: null,
  isInspection: false,
  AyurvedaTreatment: null,
  isAyurvedaTreatment: false,
  isPatient: false,
  isUpdate: false,
  isEdit: true,
  selectedPatient: {},
  doctorNo: "",
  clinicNo: "",
});

function AyurvedaSession({ navigation }) {
  // const [loading, setLoading] = useState(false);
  // const [ayurvedasessions, setAyurvedasessions] = useState({});
  // const [aMateriaMedic, setaMateriaMedic] = useState([]);
  // const [diseasesConditions, setDiseasesConditions] = useState([])

  // const dispatch = useDispatch();
  // const { loading: sessionLoading, sessions } = useSelector(
  //   (state) => state.sessions
  // );
  // const { loading: patientLoading, patients } = useSelector(
  //   (state) => state.patients
  // );
  const root = useRoute();

  // useEffect(() => {
  //   setLoading(true);
  //   // console.log(params.params);
  //   if (root.params === undefined) {
  //     console.log("no params");
  //     ayurvedaState.tabName = "medicalHistory";
  //   }
  //   // dispatch(fetchSessions());
  //   // dispatch(fetchPatients());
  //   // if (params.params === undefined) {
  //   //   setLoading(false);
  //   // }
  //   // populateAMateriaMedica()
  //   dispatch(fetchSessions());
  //   populateAMateriaMedica()
  //   const getData = async () => {
  //     const result = await getAyurvedaSession(root.params.sessionId);
  //     setAyurvedasessions(result.data)
  //   }
  //   getData().then(() => setLoading(false))
  //   return () => {
  //     delete ayurvedaState.AyurvedaTreatment;
  //     delete ayurvedaState.inspection;
  //     delete ayurvedaState.interview;
  //     delete ayurvedaState.medicalHistory;
  //     delete ayurvedaState.isMedical;
  //     delete ayurvedaState.isAyurvedaTreatment;
  //     delete ayurvedaState.isInterview;
  //     delete ayurvedaState.isInspection;
  //     delete ayurvedaState.isPatient;
  //     delete ayurvedaState.selectedPatient;
  //     delete ayurvedaState.isUpdate;
  //     delete ayurvedaState.tabName;
  //     delete ayurvedaState.doctorNo;
  //     delete ayurvedaState.clinicNo;
  //   };
  // }, [loading]);

  // useEffect(() => {
  //   setLoading(true);
  //   console.log(params.params);
  //   if (root.params === undefined) {
  //     console.log("no params");
  //     ayurvedaState.tabName = "medicalHistory";
  //     ayurvedaState.isEdit = true;
  //   }
  //   dispatch(fetchSessions());
  //   dispatch(fetchPatients());
  //   if (params.params === undefined) {
  //     setLoading(false);
  //   }
  //   populateAMateriaMedica()
  //   dispatch(fetchSessions());
  //   populateDiseasesConditions()
  //   populateAMateriaMedica();
  //   const getData = async () => {
  //     const result = await getAyurvedaSession(root.params.sessionId);
  //     setAyurvedasessions(result.data)
  //   }
  //   getData();
  //   if (root.params === undefined) {
  //     setLoading(false);
  //   }
  //   return () => {
  //     delete ayurvedaState.AyurvedaTreatment;
  //     delete ayurvedaState.inspection;
  //     delete ayurvedaState.interview;
  //     delete ayurvedaState.medicalHistory;
  //     delete ayurvedaState.isMedical;
  //     delete ayurvedaState.isAyurvedaTreatment;
  //     delete ayurvedaState.isInterview;
  //     delete ayurvedaState.isInspection;
  //     delete ayurvedaState.isPatient;
  //     delete ayurvedaState.selectedPatient;
  //     delete ayurvedaState.isUpdate;
  //     delete ayurvedaState.isEdit;
  //     delete ayurvedaState.tabName;
  //     delete ayurvedaState.doctorNo;
  //     delete ayurvedaState.clinicNo;
  //   };
  // }, [root.params]);

  // console.log("state",ayurvedaState)

  // const getSession = () => {
  //   const filterSessions = sessions.filter(
  //     (session) => session.id === root.params.sessionId
  //   )[0];
  //   if(filterSessions != undefined){
  //     const filterPatients = patients.filter(
  //       (patient) => patient._id === filterSessions.patientId
  //     )[0];
  
  //     const filterPatient = {
  //       id: filterPatients?._id,
  //       prefix: filterPatients.patients.prefix,
  //       firstName: filterPatients.patients.contactName.first,
  //       lastName: filterPatients.patients.contactName.last,
  //       dateOfBirth: dayjs(filterPatients.patients.dateBirth).format(
  //         "DD/MM/YYYY"
  //       ),
  //       gender: filterPatients.patients.gender,
  //       phoneNumber: filterPatients.patients.phones.phone,
  //       avatar: filterPatients.patients.imageSrc,
  //       patientNo: filterPatients._id,
  //     };
  
  //     ayurvedaState.medicalHistory = filterSessions.medicalHistory;
  //     ayurvedaState.interview = filterSessions.interview;
  //     ayurvedaState.inspection = filterSessions.inspectionAndExamination;
  //     ayurvedaState.AyurvedaTreatment = filterSessions.ayurvedaTreatment;
  //     ayurvedaState.selectedPatient = filterPatient;
  //     ayurvedaState.doctorNo = filterSessions.practitionerId
  //     ayurvedaState.clinicNo = filterSessions.clinicId
  //     ayurvedaState.isInterview = true;
  //     ayurvedaState.isInspection = true;
  //     ayurvedaState.isAyurvedaTreatment = true;
  //     ayurvedaState.isMedical = true;
  //     ayurvedaState.isPatient = true;
  //     ayurvedaState.isUpdate = true;
  //     ayurvedaState.isEdit = root.params.isEdit;
  //     ayurvedaState.tabName = "medicalHistory";
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (
  //     !sessionLoading &&
  //     !patientLoading &&
  //     patients.length > 0 &&
  //     sessions.length > 0
  //   ) {
  //     if (root.params !== undefined) {
  //       console.log("in if ");
  //       console.log(sessions.length);
  //       console.log(patients.length);
  //       getSession();
  //     }
  //   }
  // }, [sessionLoading, patientLoading, patients, sessions]);

  // const populateDiseasesConditions = async () => {
  //   const { data: diseasesConditions } = await apiClient.get("/diseaseconditions");
  //   let diseasesConditionsArray = diseasesConditions.map((item) => {
  //     return {
  //       value: item.diseasesconditions,
  //       label: item.diseasesconditions,
  //     }
  //   }).filter((d) => d !== undefined && d.value !== undefined && d.value !== "");
  //   setDiseasesConditions(diseasesConditionsArray)
  // }

  // const populateAMateriaMedica = async () => {
  //   const { data: aMateriaMedicas } = await apiClient.get("/amateriamedicas");
  //   let aMateriaMedicaArray = aMateriaMedicas.map((item) => {
  //     return {
  //       value: item.name,
  //       label: item.name,
  //     };
  //   });
  //   setaMateriaMedic(aMateriaMedicaArray);
  // };

  // const handleSubmitToDB = async () => {
  //   if (ayurvedaState.isPatient) {
  //     if (root.params) {
  //       const allTabsData = {
  //         selectedRegisteredPatient: ayurvedaState.selectedPatient.id,
  //         doctorNo: ayurvedaState.doctorNo,
  //         clinicNo: ayurvedaState.clinicNo,
  //         ...ayurvedaState.medicalHistory,
  //         ...ayurvedaState.interview,
  //         ...ayurvedaState.inspection,
  //         ...ayurvedaState.AyurvedaTreatment,
  //       };
  //       console.log("allTabsData", allTabsData)
  //       const response = await updateAyurvedaSession(
  //         root.params.sessionId,
  //         allTabsData
  //       );
  //       if (response.ok) {
  //         console.log("done update");
  //         alert("Updated");
  //         navigation.navigate("Medical Files");
  //         dispatch(fetchMedicalfiles());
  //       } else {
  //         alert(`${response.problem}  ${response.status}`);
  //         delete response.config.data;
  //         console.log(response);
  //         return;
  //       }
  //     } else {
  //       const allTabsData = {
  //         selectedRegisteredPatient: ayurvedaState.selectedPatient.id,
  //         doctorNo: ayurvedaState.doctorNo,
  //         clinicNo: ayurvedaState.clinicNo,
  //         ...ayurvedaState.medicalHistory,
  //         ...ayurvedaState.interview,
  //         ...ayurvedaState.inspection,
  //         ...ayurvedaState.AyurvedaTreatment,
  //       };
  //       console.log("allTabsData", allTabsData)
  //       const response = await postAyurvedaSession(allTabsData);
  //       if (response.ok) {
  //         console.log("done save");
  //         alert("Saved");
  //         navigation.navigate("Medical Files");
  //         dispatch(fetchMedicalfiles());
  //         // navigation.goBack();
  //       } else {
  //         alert(`${response.problem}  ${response.status}`);
  //         delete response.config.data;
  //         console.log(response);
  //         return;
  //       }
  //     }
  //   } else {
  //     Alert.alert(
  //       "Error occured",
  //       "Please select a patient before submitting data"
  //     );
  //   }
  // };

  const snapshot = useSnapshot(ayurvedaState);

  const scrollRef = useRef();

  // const onPressTouch = () => {
  //   scrollRef.current?.scrollTo({
  //     y: 0,
  //     animated: true,
  //   });
  // };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <ActivityIndicator visible={loading} /> */}
        <View style={{ flex: 1 }}>
          <Header back title="Ayurveda Session" rightComponent={() => null} />

          <TouchableOpacity
            style={{
              position: "absolute",
              height: 50,
              width: 50,
              bottom: 40,
              right: 10,
              backgroundColor: "lightblue",
              zIndex: 100,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
            // onPress={onPressTouch}
          >
            <MaterialIcons name="arrow-upward" color="blue" size={20} />
          </TouchableOpacity>
          <ScrollView
            ref={scrollRef}
            nestedScrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {/* <PatientSelectionSection setLoading={setLoading} isEdit={root.params !== undefined ? true : false} /> */}
            <Tabs />
            {/* {snapshot.tabName === "medicalHistory" && (
              <MedicalHistoryTab handleSubmitToDB={"handleSubmitToDB"} diseasesConditions={diseasesConditions} />
            )}
            {snapshot.tabName === "interview" && (
              <InterviewTab handleSubmitToDB={handleSubmitToDB} />
            )}
            {snapshot.tabName === "inspectionAndExamination" && (
              <InspectionAndExaminationTab
                handleSubmitToDB={handleSubmitToDB}
              />
            )}
            {snapshot.tabName === "ayurvedaTreatment" && (
              <AyurvedaTreatmentTab
                handleSubmitToDB={handleSubmitToDB}
                aMateriaMedic={aMateriaMedic}
              />
            )}
            {snapshot.tabName === "previousSession" && <PreviousSessionTab />} */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default AyurvedaSession;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    height: 50,
  },
  scene: {
    flex: 1,
  },
  pickerTitleText: {
    fontSize: 14,
    // color: colors.inputTitleColor,
    marginHorizontal: "5%",
    marginTop: 10,
    fontWeight: "bold",
    marginVertical: 10,
  },
  headingText: {
    fontSize: 22,
    // color: colors.inputTitleColor,
    marginHorizontal: "5%",
    marginTop: 20,
    fontWeight: "bold",
  },
  historyInnerTitle: {
    fontSize: 22,
    // color: colors.historyInnerTitleColor,
    marginHorizontal: "8%",
    marginTop: 12,
    fontWeight: "600",
  },
  separator: {
    height: 0.5,
    width: "84%",
    // backgroundColor: colors.inputTextColor,
    marginTop: 5,
    alignSelf: "center",
  },
  listView: {
    marginTop: 10,
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    flexWrap: "wrap",
  },
  addFamilyRoleButton: {
    height: 42,
    width: "92%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // backgroundColor: colors.buttonBackColor,
    alignSelf: "center",
    borderRadius: 5,
  },
  addFamilyRoleText: {
    fontSize: 15,
    fontWeight: "bold",
    // color: colors.whiteColor,
  },
  nextButton: {
    height: 42,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    // backgroundColor: colors.buttonBackColor,
    marginLeft: "5%",
    marginVertical: 20,
  },
  input: {
    height: 42,
    width: "90%",
    // backgroundColor: colors.pickerBackColor,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  text: {
    // color: colors.textColor,
    fontSize: 18,
  },
  pickerButton: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerText: {
    // color: colors.textColor,
    fontSize: 16,
  },
  imageButton: {
    height: 150,
    width: 150,
    marginLeft: "auto",
    marginRight: "5%",
    backgroundColor: "gray",
    marginTop: 5,
  },
  selectDate: {
    height: 42,
    width: "90%",
    backgroundColor: "transparent",
    borderRadius: 6,
    marginTop: 8,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 16,
    // color: colors.inputTextColor,
    // borderColor: colors.inputPlaceHolder,
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    // color: colors.inputTextColor,
  },
  topView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "5%",
    justifyContent: "space-between",
  },
});
