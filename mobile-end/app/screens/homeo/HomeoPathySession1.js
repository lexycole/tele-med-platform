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
  View,ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { proxy, useSnapshot } from "valtio";

// import {
//   getHomeoPathySession,
//   postHomeoPathySession,
//   updateHomeoPathySession,
// } from "../../api/HomeoPathy";
import Header from "../../components/Header";
import { colors } from "../../components/homeo/colors";
import { fetchMedicalfiles } from "../../store/medicalfiles";
import { fetchPatients } from "../../store/patients";
import { fetchSessions } from "../../store/homeopathysessions";
import InspectionAndExaminationTab from "./components/InspectionAndExaminationTab";
import InterviewTab from "./components/InterviewTab";
import MedicalHistoryTab from "./components/MedicalHistoryTab";
import PatientSelectionSection from "./components/PatientSelectionSection";
import PreviousSessionTab from "./components/PreviousSessionTab";
import Tabs from "./components/Tabs";
// import ActivityIndicator from "../../components/ActivityIndicator";
import HomeoPathyTreatmentTab from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
// import apiClient from "../../api/client";

export const HomeoPathyState = proxy({
  tabName: "medicalHistory",
  medicalHistory: {},
  isMedical: false,
  interview: null,
  isInterview: false,
  inspection: null,
  isInspection: false,
  HomeoPathyTreatment: null,
  isHomeoPathyTreatment: false,
  isPatient: false,
  isUpdate: false,
  selectedPatient: {},
  doctorNo: "",
  clinicNo: "",
});

function HomeoPathySession({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [HomeoPathysessions, setHomeoPathysessions] = useState({});
  const [HMateriaMedic, setHMateriaMedic] = useState([]);

  const dispatch = useDispatch();
  const { loading: sessionLoading, sessions } = useSelector(
    (state) => state.sessions
  );
  const { loading: patientLoading, patients } = useSelector(
    (state) => state.patients
  );
  const root = useRoute();

  useEffect(() => {
    setLoading(true);
    // console.log(params.params);
    if (root.params === undefined) {
      console.log("no params");
      HomeoPathyState.tabName = "medicalHistory";
    }
    dispatch(fetchSessions());
    dispatch(fetchPatients());
    // if (params.params === undefined) {
    //   setLoading(false);
    // }
    // populateHMateriaMedica()
    dispatch(fetchSessions());
    populateHMateriaMedica();
    // const getData = async () => {
    //   const result = await getHomeoPathySession(root.params.sessionId);
    //   setHomeoPathysessions(result.data)
    // }
    // getData();
    if (root.params === undefined) {
      setLoading(false);
    }
    return () => {
      delete HomeoPathyState.HomeoPathyTreatment;
      delete HomeoPathyState.inspection;
      delete HomeoPathyState.interview;
      delete HomeoPathyState.medicalHistory;
      delete HomeoPathyState.isMedical;
      delete HomeoPathyState.isHomeoPathyTreatment;
      delete HomeoPathyState.isInterview;
      delete HomeoPathyState.isInspection;
      delete HomeoPathyState.isPatient;
      delete HomeoPathyState.selectedPatient;
      delete HomeoPathyState.isUpdate;
      delete HomeoPathyState.tabName;
      delete HomeoPathyState.doctorNo;
      delete HomeoPathyState.clinicNo;
    };
  }, []);

  const getSession = () => {
    const filterSessions = sessions.filter(
      (session) => session.id === root.params.sessionId
    )[0];

    const filterPatients = patients.filter(
      (patient) => patient._id === filterSessions.patientId
    )[0];

    const filterPatient = {
      id: filterPatients?._id,
      prefix: filterPatients.patients.prefix,
      firstName: filterPatients.patients.contactName.first,
      lastName: filterPatients.patients.contactName.last,
      dateOfBirth: dayjs(filterPatients.patients.dateBirth).format(
        "DD/MM/YYYY"
      ),
      gender: filterPatients.patients.gender,
      phoneNumber: filterPatients.patients.phones.phone,
      avatar: filterPatients.patients.imageSrc,
      patientNo: filterPatients._id,
    };

    homeopathyState.medicalHistory = filterSessions.medicalHistory;
    homeopathyState.interview = filterSessions.interview;
    homeopathyState.inspection = filterSessions.inspectionAndExamination;
    homeopathyState.HomeoPathyTreatment = filterSessions.HomeoPathyTreatment;
    homeopathyState.selectedPatient = filterPatient;
    homeopathyState.doctorNo = filterSessions.practitionerId
    homeopathyState.clinicNo = filterSessions.clinicId
    homeopathyState.isInterview = true;
    homeopathyState.isInspection = true;
    homeopathyState.isHomeoPathyTreatment = true;
    homeopathyState.isMedical = true;
    homeopathyState.isPatient = true;
    homeopathyState.isUpdate = true;
    homeopathyState.tabName = "medicalHistory";
    setLoading(false);
  };

  useEffect(() => {
    if (
      !sessionLoading &&
      !patientLoading &&
      patients.length > 0 &&
      sessions.length > 0
    ) {
      if (root.params !== undefined) {
        console.log("in if ");
        console.log(sessions.length);
        console.log(patients.length);
        getSession();
      }
    }
  }, [sessionLoading, patientLoading, patients, sessions]);

  const populateHMateriaMedica = async () => {
    const { data: HMateriaMedicas } = await apiClient.get("/HMateriaMedicas");
    let HMateriaMedicaArray = HMateriaMedicas.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
    setHMateriaMedic(HMateriaMedicaArray);
  };

  const handleSubmitToDB = async () => {
    if (homeopathyState.isPatient) {
      if (root.params) {
        const allTabsData = {
          selectedRegisteredPatient: homeopathyState.selectedPatient.id,
          doctorNo: homeopathyState.doctorNo,
          clinicNo: homeopathyState.clinicNo,
          ...homeopathyState.medicalHistory,
          ...homeopathyState.interview,
          ...homeopathyState.inspection,
          ...homeopathyState.HomeoPathyTreatment,
        };
        console.log("allTabsData", allTabsData)
        const response = await updateHomeoPathySession(
          root.params.sessionId,
          allTabsData
        );
        if (response.ok) {
          console.log("done update");
          alert("Updated");
          navigation.navigate("Medical Files");
          dispatch(fetchMedicalfiles());
        } else {
          alert(`${response.problem}  ${response.status}`);
          delete response.config.data;
          console.log(response);
          return;
        }
      } else {
        const allTabsData = {
          selectedRegisteredPatient: homeopathyState.selectedPatient.id,
          doctorNo: homeopathyState.doctorNo,
          clinicNo: homeopathyState.clinicNo,
          ...homeopathyState.medicalHistory,
          ...homeopathyState.interview,
          ...homeopathyState.inspection,
          ...homeopathyState.HomeoPathyTreatment,
        };
        console.log("allTabsData", allTabsData)
        const response = await postHomeoPathySession(allTabsData);
        if (response.ok) {
          console.log("done save");
          alert("Saved");
          navigation.navigate("Medical Files");
          dispatch(fetchMedicalfiles());
          // navigation.goBack();
        } else {
          alert(`${response.problem}  ${response.status}`);
          delete response.config.data;
          console.log(response);
          return;
        }
      }
    } else {
      Alert.alert(
        "Error occured",
        "Please select a patient before submitting data"
      );
    }
  };

  const snapshot = useSnapshot(homeopathyState);

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator visible={loading} />
        <View style={{ flex: 1 }}>
          <Header back title="HomeoPathy Session" rightComponent={() => null} />

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
            <Text
              style={[
                styles.pickerTitleText,
                { marginTop: StatusBar.currentHeight + 20, fontSize: 20 },
              ]}
            >
              Add HomeoPathy session
            </Text>
            <PatientSelectionSection setLoading={setLoading} isEdit={root.params !== undefined ? true : false} />
            <Tabs />
            {snapshot.tabName === "medicalHistory" && (
              <MedicalHistoryTab handleSubmitToDB={handleSubmitToDB} />
            )}
            {snapshot.tabName === "interview" && (
              <InterviewTab handleSubmitToDB={handleSubmitToDB} />
            )}
            {snapshot.tabName === "inspectionAndExamination" && (
              <InspectionAndExaminationTab
                handleSubmitToDB={handleSubmitToDB}
              />
            )}
            {snapshot.tabName === "HomeoPathyTreatment" && (
              <HomeoPathyTreatmentTab
                handleSubmitToDB={handleSubmitToDB}
                HMateriaMedic={HMateriaMedic}
              />
            )}
            {snapshot.tabName === "previousSession" && <PreviousSessionTab />}
          </ScrollView>
        </View>
      </SafeAreaView>
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
