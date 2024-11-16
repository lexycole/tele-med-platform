import "react-native-get-random-values";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
// import { v4 } from "uuid";
import { state } from "../../../_layout";
// import { getClinic, getClinics } from "../../../../src/api/clinics";
// import { getDoctor, getDoctors } from "../../../../src/api/doctors";
//import { getPatients } from "../../../api/patients";
import AppTextInputDisable from "../../../components/forms/AppTextInputDisable";
import { tcmState } from "../../../(public)/TCMSession";

const PatientSelectionSection = ({ setLoading, isEdit }) => {
  const { isTablet } = useSnapshot(state);
  const { patients, loading } = useSelector((state) => state.patients);
  const { sessions } = useSelector((state) => state.sessions);
  const [patientOptions, setPatientOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [clinicOptions, setClinicOptions] = useState([]);

  useEffect(() => {
    if (isEdit) {
      setPatientOptions(
        patients.map((patient) => ({
          label: `${patient.patients?.contactName?.first} ${patient?.patients?.contactName.last}`,
          value: patient._id,
        }))
      );
      getDoctorsForSelect();
      getClinicsForSelect();
    } else {
      setLoading(true);
      setPatientOptions(
        patients.map((patient) => ({
          label: `${patient.patients?.contactName?.first} ${patient?.patients?.contactName.last}`,
          value: patient._id,
        }))
      );
      getDoctorsForSelect();
      getClinicsForSelect();
      setLoading(false);
    }
  }, [loading]);

  const getDoctorsForSelect = async () => {
    const { ok, data } = await getDoctors();
    if (ok) {
      const filter = data.map((doctor) => ({
        label: `${doctor?.doctors?.contactName?.first} ${doctor?.doctors?.contactName?.last}`,
        value: doctor?._id,
      }));
      setDoctorOptions(filter);
    }
  };

  // const getPatientsForSelect = async () => {
  //   const { ok, data } = await getPatients();
  //   if (ok) {
  //     const filter = data.map((patient) => ({
  //       label: `${patient?.patients?.contactName?.first} ${patient?.patients?.contactName?.last}`,
  //       value: patient?._id,
  //     }));
  //     setPatients(data);
  //     setPatientOptions(filter);
  //   }
  // };

  const getClinicsForSelect = async () => {
    const { ok, data } = await getClinics();
    if (ok) {
      const filter = data.map((clinic) => ({
        label: clinic?.companyInfo?.businessName,
        value: clinic?._id,
      }));
      setClinicOptions(filter);
    }
  };

  const handleSelect = (value) => {
    const filterPatients = patients.filter(
      (patient) => patient._id === value
    )[0];
    const filterSessions = sessions.filter(
      (session) => session.patientId === value
    ).reverse()[0];
    tcmState.selectedPatient = {
      id: filterPatients?._id,
      prefix: filterPatients?.patients?.prefix,
      firstName: filterPatients?.patients?.contactName?.first,
      lastName: filterPatients?.patients?.contactName?.last,
      dateOfBirth: dayjs(filterPatients?.patients?.dateBirth).format(
        "DD/MM/YYYY"
      ),
      gender: filterPatients?.patients?.gender,
      phoneNumber: filterPatients?.patients?.phones?.phone,
      avatar: filterPatients?.patients?.imageSrc,
      patientNo: filterPatients?.patients,
    };
    if (filterSessions) {
      tcmState.interview = {
        socialRelationship: filterSessions.interview.socialRelationship ? filterSessions.interview.socialRelationship : "",
        habits: filterSessions.interview.habits ? filterSessions.interview.habits : [],
        profession: filterSessions.interview.profession ? filterSessions.interview.profession : "",
        employmentStatus: filterSessions.interview.employmentStatus,
        sport: filterSessions.interview.sport ? filterSessions.interview.sport : "",
        sportFrequency: filterSessions.interview.sportFrequency ? filterSessions.interview.sportFrequency : [],
        hobby: filterSessions.interview.hobby ? filterSessions.interview.hobby : "",
        height: "",
        heightUnit: "cm",
        weight: "",
        weightUnit: "kg",
        temperature: "",
        temperatureUnit: "Celcius",
        BMI: "",
        BMICategory: "",
        thermalFeeling: [],
        perspiration: [],
        appetite: [],
        appetiteNote: "",
        vomiting: [],
        vomitingNote: "",
        diet: [],
        dietNote: "",
        taste: [],
        thirst: [],
        defecation: [],
        urination: [],
        urinationColor: [],
        sleep: [],
        head: [],
        eyes: [],
        ear: [],
        nose: [],
        throat: [],
        menstruation: [],
        leukorrhea: [],
        painLocation: "",
        painNature: "",
        emotionalStatus: [],
        emotionalNote: "",
        mind: "",
        interviewNote: "",
      }
      tcmState.medicalHistory = {
        chiefComplaint: "",
        symptoms: "",
        westernDisease: "",
        currentTreatment: filterSessions.medicalHistory.currentTreatment ? filterSessions.medicalHistory.currentTreatment : [],
        diseases: filterSessions.medicalHistory.diseases ? filterSessions.medicalHistory.diseases : "",
        surgeries: filterSessions.medicalHistory.surgeries ? filterSessions.medicalHistory.surgeries : "",
        medicaments: filterSessions.medicalHistory.medicamentsSupplements ? filterSessions.medicalHistory.medicamentsSupplements : "",
        allergies: filterSessions.medicalHistory.allergies ? filterSessions.medicalHistory.allergies : "",
        pregnancies: filterSessions.medicalHistory.pregnancies ? filterSessions.medicalHistory.pregnancies : "",
        familyMembers: filterSessions.medicalHistory.familyMembers ? filterSessions.medicalHistory.familyMembers.map((member) => ({
          _id: member._id,
          familyMember: member.familyMember,
          state: member.state,
          year: member.year,
          disease: member.disease,
        })) : [],
        noteMedicalHistory: "",
      }
    }
    tcmState.isPatient = true;
    console.log(tcmState.selectedPatient);
  };
  const { selectedPatient, doctorNo, clinicNo } = useSnapshot(tcmState);

  return (
    <View style={styles.container}>
      {!isEdit && (
        <View
          style={{
            marginBottom: 16,
            width: "100%",
            flexDirection: isTablet ? "row" : "column",
            alignItems: isTablet ? "center" : null,
          }}
        >
          <Text style={{ marginVertical: 10, width: isTablet ? "55%" : "100%" }}>
            Select registered patient from administration * :
          </Text>
          <View
            style={{
              width: isTablet ? "45%" : "100%",
            }}
          >
            <Dropdown
              textInputPlaceholder="Select Patient"
              data={patientOptions}
              value={
                selectedPatient
                  ? selectedPatient?.id
                    ? selectedPatient?.id
                    : ""
                  : ""
              }
              onChange={(value) => handleSelect(value)}
              mode="flat"
            />
          </View>
        </View>
      )}
      <View
        style={{
          marginVertical: isTablet ? 16 : 10,
          width: "100%",
          flexDirection: isTablet ? "row" : "column",
          justifyContent: isTablet ? "center" : null,
          alignItems: isTablet ? "center" : null,
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            marginBottom: 16,
            alignItems: "center",
            marginRight: isTablet ? 10 : 0,
          }}
        >
          {selectedPatient ? (
            <Image
              source={{ uri: selectedPatient.avatar }}
              style={{ height: 200, width: 200 }}
            />
          ) : (
            <View style={{ height: 200, width: 200 }} />
          )}
        </View>
        <View>
          <View
            style={{
              flexDirection: isTablet ? "row" : "column",
              alignItems: isTablet ? "center" : null,
            }}
          >
            <View
              style={{
                marginBottom: 16,
                marginRight: isTablet ? 20 : 0,
                width: isTablet ? 150 : "100%",
              }}
            >
              <Text style={{ marginBottom: 5 }}>Prefix:</Text>
              <AppTextInputDisable
                title={selectedPatient ? selectedPatient.prefix : ""}
              />
            </View>
            <View style={{flexDirection: "row",justifyContent: "space-between"}}>
              <View
                style={{
                  marginBottom: 16,
                  marginRight: isTablet ? 20 : 0,
                  width: isTablet ? 150 : "48%",
                }}
              >
                <Text style={{ marginBottom: 5 }}>First Name:</Text>
                <AppTextInputDisable
                  title={selectedPatient ? selectedPatient.firstName : ""}
                />
              </View>
              <View style={{ marginBottom: 16, width: isTablet ? 150 : "48%" }}>
                <Text style={{ marginBottom: 5 }}>Last Name:</Text>
                <AppTextInputDisable
                  title={selectedPatient ? selectedPatient.lastName : ""}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: isTablet ? "row" : "column",
              alignItems: isTablet ? "center" : null,
            }}
          >
            <View style={{flexDirection: "row",justifyContent: "space-between",marginRight: isTablet ? 20 : 0,}}>
              <View
                style={{
                  marginBottom: 16,
                  marginRight: isTablet ? 20 : 0,
                  width: isTablet ? 150 : "48%",
                }}
              >
                <Text style={{ marginBottom: 5 }}>Date Of Birth:</Text>
                <AppTextInputDisable
                  title={selectedPatient ? selectedPatient.dateOfBirth : ""}
                />
              </View>
              <View
                style={{
                  marginBottom: 16,
                  width: isTablet ? 150 : "48%",
                }}
              >
                <Text style={{ marginBottom: 5 }}>Gender:</Text>
                <AppTextInputDisable
                  title={selectedPatient ? selectedPatient.gender : ""}
                />
              </View>
            </View>
            <View
              style={{
                marginBottom: 16,
                width: isTablet ? 150 : "100%",
              }}
            >
              <Text style={{ marginBottom: 5 }}>Mobile:</Text>
              <AppTextInputDisable
                title={selectedPatient ? selectedPatient.phoneNumber : ""}
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: isTablet ? "row" : "column",
          justifyContent: isTablet ? "space-between" : null,
          alignItems: "center",
          width: "100%",
        }}
      >
        {doctorOptions ?
          <View
            style={{
              width: isTablet ? "48%" : "100%",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                marginBottom: isTablet ? 0 : 5,
                minWidth: isTablet ? 200 : null,
              }}
            >
              {"Doctor"}
            </Text>
            <Dropdown
              title="Doctor"
              textInputPlaceholder="Select Doctor"
              data={doctorOptions}
              value={doctorNo}
              onChange={async (value) => {
                const { ok, data } = await getDoctor(value);
                if (ok) tcmState.doctorNo = data[0]._id
              }}
              disabled={isEdit}
            />
          </View>
          :
          <></>
        }
        <View
          style={{
            width: isTablet ? "48%" : "100%",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              marginBottom: isTablet ? 0 : 5,
              minWidth: isTablet ? 200 : null,
            }}
          >
            {"Clinic"}
          </Text>
          <Dropdown
            title="Clinic"
            textInputPlaceholder="Select Clinic"
            data={clinicOptions}
            value={clinicNo}
            onChange={async (value) => {
              const { ok, data } = await getClinic(value);
              if (ok) tcmState.clinicNo = data[0]._id
            }}
            disabled={isEdit}
          />
        </View>
      </View>

    </View>
  );
};

export default PatientSelectionSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    color: "#ddd",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    color: "#aaa",
    width: "100%",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "left",
    // marginLeft:40
  },
  button: {
    borderRadius: 8,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00B7DD",
    marginBottom: 16,
  },
});
