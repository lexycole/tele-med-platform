import { MaterialIcons } from "@expo/vector-icons";
// import { useRoute } from "@react-navigation/core";
// import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
import { proxy, useSnapshot } from "valtio";
// import { postAyurvedaSession, updateAyurvedaSession, } from "../../src/api/sessions";
import Header from "../components/Header";
// import { colors } from "../../components/TCMSession/colors";
// import { fetchMedicalfiles } from "../store/medicalfiles";
// import { fetchPatients } from "../store/patients";
// import { fetchSessions } from "../../store/sessions";
import TCMTreatmentTab from "../screens/TCMSession/components/TCMTreatmentTab";
import InspectionAndExaminationTab from "../screens/TCMSession/components/InspectionAndExaminationTab";
import InterviewTab from "../screens/TCMSession/components/InterviewTab";
import MedicalHistoryTab from "../screens/TCMSession/components/MedicalHistoryTab";
import PatientSelectionSection from "../screens/TCMSession/components/PatientSelectionSection";
import PreviousSessionTab from "../screens/TCMSession/components/PreviousSessionTab";
import Tabs from "../screens/TCMSession/components/Tabs";
// import ActivityIndicator from "../components/ActivityIndicator";
import { colors } from "../components/tcm/colors";
// import { fetchSessions } from "../../store/tcmsessions";
// import { postTCMSession, updateTCMSession } from "../../src/api/tcmsessions";
// import { getFormulas } from "../../src/api/formulas"
// import apiClient from "../../src/api/client";
// import { getAcupunctures } from "../../src/api/acupunctures";
// import { fetchSessions } from "../store/tcmsessions";

export const tcmState = proxy({
  tabName: "",
  medicalHistory: {},
  isMedical: false,
  interview: null,
  isInterview: false,
  inspection: null,
  isInspection: false,
  TCMTreatment: null,
  isTCMTreatment: false,
  isPatient: false,
  isUpdate: false,
  isEdit: true,
  selectedPatient: {},
  doctorNo: '',
  clinicNo: ''
});

function TCMSession({ navigation }) {
  // const [loading, setLoading] = useState(false);
  // const [MateriaMedic, setMateriaMedic] = useState([])
  // const [formulas, setFormulas] = useState([])
  // const [acuPoints, setAcuPoints] = useState([])
  // const [pathologies, setPathologies] = useState([])
  // const [principleTreatment, setPrincipleTreatment] = useState([])
  // const [differentiation, setDifferentiation] = useState([])
  // const [diseasesConditions, setDiseasesConditions] = useState([])

  // const dispatch = useDispatch();
  // const { loading: sessionLoading, sessions } = useSelector(
  //   (state) => state.sessions
  // );
  // const { loading: patientLoading, patients } = useSelector(
  //   (state) => state.patients
  // );
  // const params = useRoute();
  // console.log(tcmState.clinicNo, 'patients')
  // useEffect(() => {
  //   setLoading(true);
  //   console.log(params.params);
  //   if (params.params === undefined) {
  //     console.log("no params");
  //     tcmState.tabName = "medicalHistory";
  //     tcmState.isEdit = true;
  //   }
  //   dispatch(fetchPatients());
  //   dispatch(fetchSessions());
  //   if (params.params === undefined) {
  //     setLoading(false);
  //   }
  //   populatePathologies()
  //   populateDiseasesConditions()
  //   populateMateriaMedica()
  //   populateFormulas()
  //   populateAcuPoints()
  //   return () => {
  //     delete tcmState.TCMTreatment;
  //     delete tcmState.inspection;
  //     delete tcmState.interview;
  //     delete tcmState.medicalHistory;
  //     delete tcmState.isMedical;
  //     delete tcmState.isTCMTreatment;
  //     delete tcmState.isInterview;
  //     delete tcmState.isInspection;
  //     delete tcmState.isPatient;
  //     delete tcmState.selectedPatient;
  //     delete tcmState.doctorNo;
  //     delete tcmState.clinicNo;
  //     delete tcmState.isUpdate;
  //     delete tcmState.isEdit;
  //     delete tcmState.tabName;
  //   };
  // }, [params.params]);
  // console.log(tcmState.clinicNo, '========')
  // const getSession = () => {
  //   console.log("In get sessions");
  //   console.log(sessions.length);
  //   console.log(patients.length);
  //   const filterSessions = sessions.filter(
  //     (session) => session.id === params.params.sessionId
  //   )[0];
  //   if(filterSessions != undefined){
  //     const filterPatients = patients.filter(
  //       (patient) => patient._id === filterSessions.patientId
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
  
  //     tcmState.medicalHistory = filterSessions.medicalHistory;
  //     tcmState.interview = filterSessions.interview;
  //     tcmState.inspection = filterSessions.inspectionAndExamination;
  //     tcmState.TCMTreatment = filterSessions.tcmTreatment;
  //     tcmState.selectedPatient = filterPatient;
  //     tcmState.doctorNo = filterSessions.practitionerId
  //     tcmState.clinicNo = filterSessions.clinicId
  //     tcmState.isInterview = true;
  //     tcmState.isInspection = true;
  //     tcmState.isTCMTreatment = true;
  //     tcmState.isMedical = true;
  //     tcmState.isPatient = true;
  //     tcmState.isUpdate = true;
  //     tcmState.isEdit = params.params.isEdit;
  //     tcmState.tabName = "medicalHistory";
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
  //     if (params.params) {
  //       console.log("in if ");
  //       console.log(sessions.length);
  //       console.log(patients.length);
  //       getSession();
  //     }
  //   }
  // }, [sessionLoading, patientLoading, patients, sessions]);

  const populatePathologies = async () => {
    const { data: pathologies } = await apiClient.get("/pathologies");
    let principleTreatmentArray = pathologies.map((item) => {
      return {
        value: item.principleTreatment,
        label: item.principleTreatment,
      }
    }).filter((p) => p !== undefined && p.value !== undefined && p.value !== "");
    let differentiationArray = pathologies.map((item) => {
      return {
        value: item.differentiation,
        label: item.differentiation,
      }
    }).filter((d) => d !== undefined && d.value !== undefined && d.value !== "");
    setPathologies(pathologies)
    setPrincipleTreatment(principleTreatmentArray)
    setDifferentiation(differentiationArray)
  }

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

  // const populateMateriaMedica = async () => {
  //   const { data: MateriaMedicas } = await apiClient.get("/materiamedicas");
  //   let MateriaMedicaArray = MateriaMedicas.map((item) => {
  //     return {
  //       value: item.name,
  //       label: item.name,
  //     }
  //   });
  //   setMateriaMedic(MateriaMedicaArray)
  // }

  // const populateFormulas = async () => {
  //   const { data: formulas } = await getFormulas();
  //   let FormulasArray = formulas.map((item) => {
  //     return {
  //       value: item.name,
  //       label: item.name,
  //     }
  //   });
  //   setFormulas(FormulasArray)
  // }

  // const populateAcuPoints = async () => {
  //   const { data: acuPoints } = await getAcupunctures();
  //   let AcuPointsArray = acuPoints.map((item) => {
  //     return {
  //       value: item.name,
  //       label: item.name,
  //     }
  //   });
  //   setAcuPoints(AcuPointsArray)
  // }

  // const handleSubmitToDB = async () => {
  //   if (tcmState.isPatient) {
  //     if (params.params) {
  //       const allTabsData = {
  //         selectedRegisteredPatient: tcmState.selectedPatient.id,
  //         doctorNo: tcmState.doctorNo,
  //         clinicNo: tcmState.clinicNo,
  //         ...tcmState.medicalHistory,
  //         ...tcmState.interview,
  //         ...tcmState.inspection,
  //         ...tcmState.TCMTreatment,
  //       };
  //       const response = await updateTCMSession(
  //         params.params.sessionId,
  //         allTabsData
  //       );
  //       if (response.ok) {
  //         console.log("done update");
  //         alert("Updated");
  //         dispatch(fetchMedicalfiles());
  //         navigation.navigate("MedicalFilesScreen")
  //         // navigation.goBack();
  //       } else {
  //         alert(`${response.problem}  ${response.status}`);
  //         delete response.config.data;
  //         console.log(response);
  //         return;
  //       }
  //     } else {
  //       console.log(tcmState.doctorNo, '==patient', tcmState.clinicNo)
  //       const allTabsData = {
  //         //selectedRegisteredPatient: tcmState.selectedPatient.patientNo._id,
  //         selectedRegisteredPatient: tcmState.selectedPatient.id,
  //         doctorNo: tcmState.doctorNo,
  //         clinicNo: tcmState.clinicNo,
  //         ...tcmState.medicalHistory,
  //         ...tcmState.interview,
  //         ...tcmState.inspection,
  //         ...tcmState.TCMTreatment,
  //       };
  //       const response = await postTCMSession(allTabsData);
  //       if (response.ok) {
  //         alert('Saved')
  //         console.log("done save");
  //         dispatch(fetchMedicalfiles());
  //         navigation.navigate("MedicalFilesScreen")

  //         // navigation.goBack();
  //       } else {
  //         alert(`${response.problem}  ${response.status}`);
  //         delete response.config.data;
  //         console.log(response);
  //         return;
  //       }
  //     }
  //   } else {
  //     alert(
  //       "Error occured",
  //       "Please select a patient before submitting data"
  //     );
  //   }
  // };

  const snapshot = useSnapshot(tcmState);

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <>
      <StatusBar backgroundColor={"#00B7DD"} barStyle={"light-content"} />
      <SafeAreaView/>
      {/* <ActivityIndicator visible={loading} /> */}
      <View style={{ flex: 1 }}>
        <Header back title="TCM Session" rightComponent={() => null} />

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
          {/* <Text
            style={[
              styles.pickerTitleText,
              { marginTop: StatusBar.currentHeight + 20, fontSize: 20 },
            ]}
          >
            Add tcmpathy session
          </Text> */}
          {/* <PatientSelectionSection setLoading={setLoading} isEdit={params.params !== undefined ? true : false} />
          <Tabs />
          {snapshot.tabName === "medicalHistory" && (
            <MedicalHistoryTab handleSubmitToDB={handleSubmitToDB} diseasesConditions={diseasesConditions} />
          )}
          {snapshot.tabName === "interview" && (
            <InterviewTab handleSubmitToDB={handleSubmitToDB} />
          )}
          {snapshot.tabName === "inspectionAndExamination" && (
            <InspectionAndExaminationTab handleSubmitToDB={handleSubmitToDB} />
          )}
          {snapshot.tabName === "tcmTreatment" && (
            <TCMTreatmentTab handleSubmitToDB={handleSubmitToDB} MateriaMedic={MateriaMedic} formulas={formulas} acuPoints={acuPoints} pathologies={pathologies} principleTreatmentOptions={principleTreatment} differentiationOptions={differentiation} />
          )}
          {snapshot.tabName === "previousSession" && <PreviousSessionTab />} */}
        </ScrollView>
      </View>
    </>
  );
}

export default TCMSession;

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