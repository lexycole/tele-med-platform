import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import {Image,SafeAreaView,StatusBar,StyleSheet,Text,TouchableOpacity,View,ScrollView} from "react-native";
// import { useDispatch, useSelector } from "react-redux";
import { proxy, useSnapshot } from "valtio";
// import { postHomeoPathySession, updateHomeoPathySession,} from "../../../src/api/sessions";
import Header from "../components/Header";
import { colors } from "../components/homeo/colors";
// import { fetchMedicalfiles } from "../store/medicalfiles";
// import { fetchPatients } from "../store/patients";
// import { fetchSessions } from "../store/homeopathysessions";
import HomeoTreatmentTab from "../screens/homeo/components/HomeoTreatmentTab";
import InspectionAndExaminationTab from "../screens/homeo/components/InspectionAndExaminationTab";
import InterviewTab from "../screens/homeo/components/InterviewTab";
import MedicalHistoryTab from "../screens/homeo/components/MedicalHistoryTab";
import PatientSelectionSection from "../screens/homeo/components/PatientSelectionSection";
import PreviousSessionTab from "../screens/homeo/components/PreviousSessionTab";
import Tabs from "../screens/homeo/components/Tabs";
// import ActivityIndicator from "../components/ActivityIndicator";
// import apiClient from "../../../src/api/client";

export const homeoState = proxy({
  tabName: "",
  medicalHistory: {},
  isMedical: false,
  interview: null,
  isInterview: false,
  inspection: null,
  isInspection: false,
  HomeoTreatment: null,
  isHomeoTreatment: false,
  isPatient: false,
  isUpdate: false,
  isEdit: true,
  selectedPatient: {},
  doctorNo: "",
  clinicNo: "",
});

function HomeoPathySession({ navigation }) {
  // const [loading, setLoading] = useState(false);
  // const [aMateriaMedic, setaMateriaMedic] = useState([]);
  // const [diseasesConditions, setDiseasesConditions] = useState([])
  // const dispatch = useDispatch();
  // const { loading: sessionLoading, sessions } = useSelector(
  //   (state) => state.sessions
  // );
  // const { loading: patientLoading, patients } = useSelector(
  //   (state) => state.patients
  // );
  // const params = useRoute();


  // useEffect(() => {
  //   setLoading(true);
  //   console.log(params.params);
  //   if (params.params === undefined) {
  //     console.log("no params");
  //     homeoState.tabName = "medicalHistory";
  //     homeoState.isEdit = true;
  //   }
  //   dispatch(fetchSessions());
  //   dispatch(fetchPatients());
    
  //   populateAMateriaMedica();
  //   populateDiseasesConditions()


  //   if (params.params === undefined) {
  //     setLoading(false);
  //   }
  //   return () => {
  //     delete homeoState.HomeoTreatment;
  //     delete homeoState.inspection;
  //     delete homeoState.interview;
  //     delete homeoState.medicalHistory;
  //     delete homeoState.isMedical;
  //     delete homeoState.isHomeoTreatment;
  //     delete homeoState.isInterview;
  //     delete homeoState.isInspection;
  //     delete homeoState.isPatient;
  //     delete homeoState.selectedPatient;
  //     delete homeoState.isUpdate;
  //     delete homeoState.isEdit;
  //     delete homeoState.tabName;
  //     delete homeoState.doctorNo;
  //     delete homeoState.clinicNo;
  //   };
  // }, [params.params]);

  // const getSession = () => {
  //   console.log("In get sessions");
  //   console.log(sessions.length);
  //   console.log(patients.length);
  //   const filterSessions = sessions.filter(
  //     (session) => session.id === params.params.sessionId
  //   )[0];
  //   if(filterSessions != undefined){
  //     const filterPatients = patients.filter(
  //     (patient) => patient._id === filterSessions.patientId
  //     )[0];
  //     const filterPatient = {
  //       id: filterPatients._id,
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
  
  //     homeoState.medicalHistory = filterSessions.medicalHistory;
  //     homeoState.interview = filterSessions.interview;
  //     homeoState.inspection = filterSessions.inspectionAndExamination;
  //     homeoState.HomeoTreatment = filterSessions.homeoTreatment;
  //     homeoState.selectedPatient = filterPatient;
  //     homeoState.doctorNo = filterSessions.practitionerId
  //     homeoState.clinicNo = filterSessions.clinicId
  //     homeoState.isInterview = true;
  //     homeoState.isInspection = true;
  //     homeoState.isHomeoTreatment = true;
  //     homeoState.isMedical = true;
  //     homeoState.isPatient = true;
  //     homeoState.isUpdate = true;
  //     homeoState.isEdit = params.params.isEdit;
  //     homeoState.tabName = "medicalHistory";
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (
  //     // !sessionLoading &&
  //     !patientLoading &&
  //     patients.length > 0 &&
  //     sessions.length > 0
  //   ) {
  //     if (params.params) {
  //       console.log("in if ");
  //       console.log(sessions.length);
  //       console.log(patients.length);
  //       getSession();
  //     }
  //   }
  // }, [sessionLoading, patientLoading, patients, sessions]);

  // const populateAMateriaMedica = async () => {
  //   const { data: aMateriaMedicas } = await apiClient.get("/hmateriamedicas");
  //   let aMateriaMedicaArray = aMateriaMedicas.filter((item)=> item.name).map((item) => {
  //     return {
  //       value: item.name,
  //       label: item.name,
  //     }
  //   });
  //   setaMateriaMedic(aMateriaMedicaArray)
  // }

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



  // const handleSubmitToDB = async () => {
  //   if (homeoState.isPatient) {
  //     if (params.params) {
  //       const allTabsData = {
  //         selectedRegisteredPatient: homeoState.selectedPatient.id,
  //         doctorNo: homeoState.doctorNo,
  //         clinicNo: homeoState.clinicNo,
  //         ...homeoState.medicalHistory,
  //         ...homeoState.interview,
  //         ...homeoState.inspection,
  //         ...homeoState.HomeoTreatment,
  //       };
  //       // const response = await updateHomeoPathySession(
  //       //   params.params.sessionId,
  //       //   allTabsData
  //       // );
  //       // if (response.ok) {
  //       //   console.log("done update");
  //       //   alert("Updated");
  //       //   navigation.navigate("Medical Files");
  //       //   // dispatch(fetchMedicalfiles());
  //       // } else {
  //       //   alert(`${response.problem}  ${response.status}`);
  //       //   delete response.config.data;
  //       //   console.log(response);
  //       //   return;
  //       // }
  //     } else {
  //       const allTabsData = {
  //         selectedRegisteredPatient: homeoState.selectedPatient.id,
  //         doctorNo: homeoState.doctorNo,
  //         clinicNo: homeoState.clinicNo,
  //         ...homeoState.medicalHistory,
  //         ...homeoState.interview,
  //         ...homeoState.inspection,
  //         ...homeoState.HomeoTreatment,
  //       };
  //       // const response = await postHomeoPathySession(allTabsData);
  //       // if (response.ok) {
  //       //   console.log("done save");
  //       //   alert("Saved");
  //       //   navigation.navigate("Medical Files");
  //       //   // dispatch(fetchMedicalfiles());
  //       // } else {
  //       //   alert(`${response.problem}  ${response.status}`);
  //       //   delete response.config.data;
  //       //   console.log(response);
  //       //   return;
  //       // }
  //     }
  //   } else {
  //     Alert.alert(
  //       "Error occured",
  //       "Please select a patient before submitting data"
  //     );
  //   }
  // };

  const snapshot = useSnapshot(homeoState);

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <>
      {/* <ActivityIndicator visible={loading} /> */}
      <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
        <Header back title="HomeoPathy Session" />

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
          onPress={onPressTouch}
        >
          <MaterialIcons name="arrow-upward" color="blue" size={20} />
        </TouchableOpacity>
        <ScrollView
          ref={scrollRef}
          nestedScrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* <PatientSelectionSection setLoading={setLoading} isEdit={params.params !== undefined ? true : false} /> */}
          <Tabs />
          {/* {snapshot.tabName === "medicalHistory" && (
            <MedicalHistoryTab handleSubmitToDB={handleSubmitToDB} diseasesConditions={diseasesConditions}/>
          )}
          {snapshot.tabName === "interview" && (
            <InterviewTab handleSubmitToDB={handleSubmitToDB} />
          )}
          {snapshot.tabName === "inspectionAndExamination" && (
            <InspectionAndExaminationTab handleSubmitToDB={handleSubmitToDB} />
          )}
          {snapshot.tabName === "homeoTreatment" && (
            <HomeoTreatmentTab handleSubmitToDB={handleSubmitToDB} aMateriaMedic={aMateriaMedic} />
          )}
          {snapshot.tabName === "previousSession" && <PreviousSessionTab />} */}
        </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

export default HomeoPathySession;

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
    color: colors.inputTitleColor,
    marginHorizontal: "5%",
    marginTop: 10,
    fontWeight: "bold",
    marginVertical: 10,
  },
  headingText: {
    fontSize: 22,
    color: colors.inputTitleColor,
    marginHorizontal: "5%",
    marginTop: 20,
    fontWeight: "bold",
  },
  historyInnerTitle: {
    fontSize: 22,
    color: colors.historyInnerTitleColor,
    marginHorizontal: "8%",
    marginTop: 12,
    fontWeight: "600",
  },
  separator: {
    height: 0.5,
    width: "84%",
    backgroundColor: colors.inputTextColor,
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
    backgroundColor: colors.buttonBackColor,
    alignSelf: "center",
    borderRadius: 5,
  },
  addFamilyRoleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.whiteColor,
  },
  nextButton: {
    height: 42,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.buttonBackColor,
    marginLeft: "5%",
    marginVertical: 20,
  },
  input: {
    height: 42,
    width: "90%",
    backgroundColor: colors.pickerBackColor,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  text: {
    color: colors.textColor,
    fontSize: 18,
  },
  pickerButton: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerText: {
    color: colors.textColor,
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
    color: colors.inputTextColor,
    borderColor: colors.inputPlaceHolder,
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: colors.inputTextColor,
  },
  topView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "5%",
    justifyContent: "space-between",
  },
});
