import "react-native-get-random-values";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import { useSnapshot } from "valtio";
import { v4 } from "uuid";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
// import { state } from "../../../../App";
// import AppTextInputDisable from "../../../../src/components/forms/AppTextInputDisable";
import { colors } from "../../../components/tcm/colors"
import AppTextArea from "../../../components/forms/AppTextArea";
import AppTextInput from "../../../components/forms/AppTextInput";
import AppMultiDropdown from "../../../components/forms/AppMultiDropdown";
import Button from "../../../components/forms/AppSubmitButton";
import { medicalHistory as historyOptions, interviewDropdownValues, inspectionAndExaminationDropdownValues, AyurvedaRemedyDropdownValues } from "../drowdownItems";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { IconButton } from "react-native-paper";
import calculateBMI, {
  calculateBMICategory,
} from "../../../utils/bmi/bmiclassification";
import AppSingleDropdown from "../../../components/forms/AppSingleDropdown";
import RemedyFields from "./RemedyFields";
// import apiClient from "../../../api/client";
// import { updateAyurvedaSession } from "../../../api/ayurveda";
import { fetchSessions } from "../../../store/ayurvedasessions";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  chiefComplaint: Yup.string().required("Required"),
  symptoms: Yup.string().required("Required")
});

const SessionMoreDetails = ({ modalVisible, setModalVisible, data }) => {
  const { isTablet } = useSnapshot(state);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("medicalHistory");
  const [isEdit, setIsEdit] = useState(false)
  const [aMateriaMedic, setaMateriaMedic] = useState([]);
  const [diseasesConditions, setDiseasesConditions] = useState([])

  const dispatch = useDispatch()

  const {
    socialRelationshipOptions,
    hobbiesOptions,
    sportOptions,
    appetiteOptions,
    defecationOptions,
    dietOptions,
    earsOptions,
    emotionalStatusOptions,
    employmentStatusOptions,
    eyesOptions,
    habitsOptions,
    headOptions,
    leukorrheaOptions,
    menstruationOptions,
    naturePainOptions,
    noseOptions,
    perspirationOptions,
    sleepOptions,
    sportFrequencyOptions,
    tasteOptions,
    thermalFeelingOptions,
    thirstOptions,
    throatOptions,
    urinationColorOptions,
    urinationOptions,
    vomitingOptions,
  } = interviewDropdownValues;

  const {
    dataAppearance,
    dataColorAndLustreOfFace,
    dataCough,
    dataOdor,
    dataPainLevel,
    dataPalpationOfTheEpigastrium,
    dataPhysicalAppearance,
    dataMotionRange,
    dataRespiration,
    dataSpeech,
    dataVitality,
    tongueColor,
    tongueShape,
    dataPulseRate,
    dataPulseType,
    mindConstitution,
    aBodyConstitution,
    diseaseFormation, principleTreatment
  } = inspectionAndExaminationDropdownValues;

  const { datadosage, dataRemedy, dataUnit } = AyurvedaRemedyDropdownValues;

  const populateAMateriaMedica = async () => {
    const { data: aMateriaMedicas } = await apiClient.get("/amateriamedicas");
    let aMateriaMedicaArray = aMateriaMedicas.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
    setaMateriaMedic(aMateriaMedicaArray);
  };

  const populateDiseasesConditions = async () => {
    const { data: diseasesConditions } = await apiClient.get("/diseaseconditions");
    let diseasesConditionsArray = diseasesConditions.map((item) => {
      return {
        value: item.diseasesconditions,
        label: item.diseasesconditions,
      }
    }).filter((d) => d !== undefined && d.value !== undefined && d.value !== "");
    setDiseasesConditions(diseasesConditionsArray)
  }

  useEffect(() => {
    populateAMateriaMedica()
    populateDiseasesConditions()
  }, [])

  console.log("previous session data", data)

  const initialValues = {
    chiefComplaint: data.medicalHistory ? data.medicalHistory.chiefComplaint : "",
    symptoms: data.medicalHistory ? data.medicalHistory.symptoms : "",
    westernDisease: data.medicalHistory ? data.medicalHistory.westernDisease : "",
    currentTreatment: data.medicalHistory ? data.medicalHistory.currentTreatment : [],
    diseases: data.medicalHistory ? data.medicalHistory.diseases : "",
    surgeries: data.medicalHistory ? data.medicalHistory.surgeries : "",
    medicamentsSupplements: data.medicalHistory ? data.medicalHistory.medicamentsSupplements : "",
    allergies: data.medicalHistory ? data.medicalHistory.allergies : "",
    pregnancies: data.medicalHistory ? data.medicalHistory.pregnancies : "",
    familyMembers: data.medicalHistory
      ? data.medicalHistory.familyMembers
        ? data.medicalHistory.familyMembers
        : [{ _id: v4(), familyMember: "", disease: "", year: "", state: "" }]
      : [{ _id: v4(), familyMember: "", disease: "", year: "", state: "" }],
    noteMedicalHistory: data.medicalHistory
      ? data.medicalHistory.noteMedicalHistory
      : "",
    socialRelationship: data.interview ? data.interview.socialRelationship : "",
    habits: data.interview ? data.interview.habits : [],
    profession: data.interview ? data.interview.profession : "",
    employmentStatus: data.interview ? data.interview.employmentStatus : [],
    sport: data.interview ? data.interview.sport : "",
    sportFrequency: data.interview ? data.interview.sportFrequency : [],
    hobby: data.interview ? data.interview.hobby : "",
    height: data.interview
      ? {
        value: data.interview.height,
        measure: data.interview.heightUnit,
      }
      : { value: "", measure: "cm" },
    weight: data.interview
      ? {
        value: data.interview.weight,
        measure: data.interview.weightUnit,
      }
      : { value: "", measure: "kg" },
    temperature: data.interview
      ? {
        value: data.interview.temperature,
        measure: data.interview.temperatureUnit,
      }
      : { value: "", measure: "Celcius" },
    BMI: data.interview ? data.interview.BMI : "",
    BMICategory: data.interview ? data.interview.BMICategory : "",
    thermalFeeling: data.interview ? data.interview.thermalFeeling : [],
    perspiration: data.interview ? data.interview.perspiration : [],
    appetite: data.interview ? data.interview.appetite : [],
    appetiteNote: data.interview ? data.interview.appetiteNote : "",
    vomiting: data.interview ? data.interview.vomiting : [],
    vomitingNote: data.interview ? data.interview.vomitingNote : "",
    diet: data.interview ? data.interview.diet : [],
    dietNote: data.interview ? data.interview.dietNote : "",
    taste: data.interview ? data.interview.taste : [],
    thirst: data.interview ? data.interview.thirst : [],
    defecation: data.interview ? data.interview.defecation : [],
    urination: data.interview ? data.interview.urination : [],
    urinationColor: data.interview ? data.interview.urinationColor : [],
    sleep: data.interview ? data.interview.sleep : [],
    head: data.interview ? data.interview.head : [],
    eyes: data.interview ? data.interview.eyes : [],
    ear: data.interview ? data.interview.ear : [],
    nose: data.interview ? data.interview.nose : [],
    throat: data.interview ? data.interview.throat : [],
    menstruationHistory: data.interview ? data.interview.menstruationHistory : [],
    leukorrhea: data.interview ? data.interview.leukorrhea : [],
    painLocation: data.interview ? data.interview.painLocation : "",
    painNature: data.interview ? data.interview.painNature : "",
    emotionalStatus: data.interview ? data.interview.emotionalStatus : [],
    emotionalNote: data.interview ? data.interview.emotionalNote : "",
    mind: data.interview ? data.interview.mind : "",
    interviewNote: data.interview ? data.interview.interviewNote : "",
    respiration: data.inspectionAndExamination ? data.inspectionAndExamination.respiration : [],
    speech: data.inspectionAndExamination ? data.inspectionAndExamination.speech : [],
    cough: data.inspectionAndExamination ? data.inspectionAndExamination.cough : [],
    odor: data.inspectionAndExamination ? data.inspectionAndExamination.odor : [],
    vitality: data.inspectionAndExamination ? data.inspectionAndExamination.vitality : [],
    appearance: data.inspectionAndExamination ? data.inspectionAndExamination.appearance : "",
    colorFace: data.inspectionAndExamination ? data.inspectionAndExamination.colorFace : "",
    physicalAppearance: data.inspectionAndExamination ? data.inspectionAndExamination.physicalAppearance : [],
    appearanceNote: data.inspectionAndExamination ? data.inspectionAndExamination.appearanceNote : "",
    epigastriumPalpation: data.inspectionAndExamination ? data.inspectionAndExamination.epigastriumPalpation : [],
    epigastriumPalpationNote: data.inspectionAndExamination ? data.inspectionAndExamination.epigastriumPalpationNote : "",
    abdomenPalpation: data.inspectionAndExamination ? data.inspectionAndExamination.abdomenPalpation : [],
    rangeMotion: data.inspectionAndExamination ? data.inspectionAndExamination.rangeMotion : "",
    painLevel: data.inspectionAndExamination ? data.inspectionAndExamination.painLevel : "",
    tongueShape: data.inspectionAndExamination ? data.inspectionAndExamination.tongueShape : "",
    tongueColor: data.inspectionAndExamination ? data.inspectionAndExamination.tongueColor : [],
    tongueNote: data.inspectionAndExamination ? data.inspectionAndExamination.tongueNote : "",
    pulseRate: data.inspectionAndExamination ? data.inspectionAndExamination.pulseRate : "",
    pulseType: data.inspectionAndExamination ? data.inspectionAndExamination.pulseType : "",
    mindConstitution: data.inspectionAndExamination ? data.inspectionAndExamination.mindConstitution : "",
    aBodyConstitution: data.inspectionAndExamination ? data.inspectionAndExamination.aBodyConstitution : "",
    diseaseFormation: data.inspectionAndExamination ? data.inspectionAndExamination.diseaseFormation : "",
    physicalExaminationNote: data.inspectionAndExamination ? data.inspectionAndExamination.physicalExaminationNote : "",
    ayurvedaDiagnosis: data.ayurvedaTreatment ? data.ayurvedaTreatment.ayurvedaDiagnosis : "",
    principleTreatment: data.ayurvedaTreatment
      ? data.ayurvedaTreatment.principleTreatment
      : [],
    treatmentNote: data.ayurvedaTreatment ? data.ayurvedaTreatment.treatmentNote : "",
    remedy: data.ayurvedaTreatment ? data.ayurvedaTreatment.remedy : [{ materiaMedica: '', dosage: "", unit: "" }],
    dietTherapy: data.ayurvedaTreatment ? data.ayurvedaTreatment.dietTherapy : "",
    recommendation: data.ayurvedaTreatment ? data.ayurvedaTreatment.recommendation : "",
  };

  const handleSubmit = async (values) => {
    const allTabsData = {
      ...values,
      familyMembers: values.familyMembers.map((member) => ({
        familyMember: member.familyMember,
        state: member.state,
        year: member.year,
        disease: member.disease,
      })),
      height: values.height.value,
      heightUnit: values.height.measure,
      weight: values.weight.value,
      weightUnit: values.weight.measure,
      temperature: values.temperature.value,
      temperatureUnit: values.temperature.measure,
      remedy: values.remedy.map((r) => {
        return {
          ...r,
          dosage: Number(r.dosage)
        }
      }),
      selectedRegisteredPatient: data.patientId,
      doctorNo: data.practitionerId,
      clinicNo: data.clinicId,
    };

    console.log("alltabsdata", allTabsData)
    const response = await updateAyurvedaSession(
      data.id,
      allTabsData
    );
    if (response.ok) {
      console.log("done update");
      dispatch(fetchSessions())
      alert("Updated");
      setIsEdit(false)
    } else {
      alert(`${response.problem}  ${response.status}`);
      delete response.config.data;
      console.log(response);
      return;
    }
  }

  const [menuItems, setMenuItems] = useState([
    { label: "Medical History", value: "medicalHistory" },
    { label: "Interview", value: "interview" },
    { label: "Inspection & Examination", value: "inspectionAndExamination" },
    { label: "Ayurveda Treatment", value: "ayurvedaTreatment" },
    { label: "File Attachments", value: "fileAttachments" },
  ]);

  const familyMembers = data.medicalHistory.familyMembers.map((member) => {
    return (
      <View key={member._id} style={styles.itemInfoContainer}>
        <Text style={styles.tableItemText}>{member?.familyMember}</Text>
        <Text style={styles.tableItemText}>{member?.disease}</Text>
        <Text style={styles.tableItemText}>{member?.year}</Text>
        <Text style={styles.tableItemText}>{member?.state}</Text>
      </View>
    );
  });

  return (
    <Modal animationType="slid" transparent={false} visible={modalVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>Session Info</Text>
        <TouchableHighlight
          style={{ backgroundColor: "#aaa", borderRadius: 20 }}
          onPress={() => {
            setIsEdit(false)
            setModalVisible(!modalVisible);
          }}
        >
          <Feather name="x" size={20} style={{ padding: 5 }} />
        </TouchableHighlight>
      </View>
      <DropDownPicker
        open={open}
        value={value}
        items={menuItems}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setMenuItems}
        containerStyle={{ margin: 10, width: "90%", alignSelf: "center" }}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, errors }) => (
          <ScrollView style={{ flex: 1 }}>
            {console.log("formik values", values)}
            {value === "medicalHistory" && (
              <View style={{ marginHorizontal: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={styles.title}>Medical History</Text>
                  {!isEdit ? (<TouchableOpacity style={{
                    padding: isTablet ? 10 : 5,
                    marginRight: 10,
                    backgroundColor: colors.pickerBackColor,
                  }} onPress={() => setIsEdit(true)}>
                    <Image
                      source={require("../../../assets/icons/edit.png")}
                      style={{
                        height: isTablet ? 30 : 25,
                        width: isTablet ? 30 : 25,
                      }}
                    />
                  </TouchableOpacity>) : null}
                </View>
                <Text style={styles.modalTitle}>Personal Medical History</Text>
                <AppTextArea
                  label="Chief Complaint *"
                  placeholder="Your chief Complaint"
                  value={values["chiefComplaint"]}
                  onChangeText={handleChange("chiefComplaint")}
                  editable={isEdit ? true : false}
                />

                <AppTextArea
                  label="Symptoms:"
                  placeholder="The symptoms"
                  value={values["symptoms"]}
                  onChangeText={handleChange("symptoms")}
                  editable={isEdit ? true : false}
                />

                <AppSingleDropdown
                  title="Western Disease/syndrome :"
                  placeholder="The Western Disease/syndrome"
                  options={diseasesConditions}
                  name="westernDisease"
                  isTablet={isTablet}
                  disabled={isEdit ? false : true}
                />

                <AppMultiDropdown
                  title="Current Treatment:"
                  placeholder="current treatment"
                  options={historyOptions.currentTreatment}
                  name="currentTreatment"
                  isTablet={isTablet}
                  //value={values["currentTreatment"]}
                  //onChange={(value) => {
                  // setFieldValue("currentTreatment", value);
                  //}}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppTextInput
                  label="Diseases & Illnesses :"
                  placeholder="Type in Western Disease Name in the past..."
                  value={values["diseases"]}
                  onChangeText={handleChange("diseases")}
                  editable={isEdit ? true : false}
                />

                <AppTextInput
                  label="Surgeries :"
                  placeholder="surgeries in the past..."
                  value={values["surgeries"]}
                  onChangeText={handleChange("surgeries")}
                  editable={isEdit ? true : false}
                />

                <AppTextInput
                  label="Medicaments & Supplements in use:"
                  placeholder="Medicaments & Supplements in use or used in the past..."
                  value={values["medicamentsSupplements"]}
                  onChangeText={handleChange("medicamentsSupplements")}
                  editable={isEdit ? true : false}
                />

                <AppTextArea
                  label="Allergies:"
                  placeholder="Type in  allergies..."
                  value={values["allergies"]}
                  onChangeText={handleChange("allergies")}
                  editable={isEdit ? true : false}
                />

                <AppTextInput
                  label="Pregnancies:"
                  placeholder="Pregnancies, year of pregnancies in the past..."
                  value={values["pregnancies"]}
                  onChangeText={handleChange("pregnancies")}
                  editable={isEdit ? true : false}
                />

                <Text style={[styles.modalTitle, { marginVertical: 16 }]}>
                  Family Medical History
                </Text>
                <TouchableOpacity
                  style={[{
                    borderRadius: 8,
                    height: 50,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#00B7DD",
                    marginBottom: 16
                  }, { width: isTablet ? 300 : "100%" }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setFieldValue("familyMembers", [
                      ...values["familyMembers"],
                      {
                        _id: v4(),
                        familyMember: "",
                        disease: "",
                        year: "",
                        state: "",
                      },
                    ]);
                  }}
                  disabled={isEdit ? false : true}
                >
                  <Text style={styles.buttonTitle}>
                    Add Family Role with Medical History
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={values["familyMembers"]}
                  renderItem={({ item, index }) => {
                    return (
                      <FamilyMember
                        key={`${index}`}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        values={values}
                        item={item}
                        isEdit={isEdit}
                        diseasesConditions={diseasesConditions}
                      />
                    );
                  }}
                />

                {/* <Text style={styles.modalTitle}>Family Medical History</Text>
                <View style={styles.headerContainer}>
                  <Text style={styles.tableHeaderText}>Family Member </Text>
                  <Text style={styles.tableHeaderText}>Disease</Text>
                  <Text style={styles.tableHeaderText}>Year</Text>
                  <Text style={styles.tableHeaderText}>State</Text>
                </View>
                {familyMembers} */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: isTablet ? "flex-end" : "space-between",
                    width: "100%",
                  }}
                >
                  {isEdit && (<Button
                    style={{ width: isTablet ? 150 : "45%" }}
                    textStyle={{ fontSize: 16 }}
                    title="Save"
                    onPress={() => {
                      handleSubmit();
                    }}
                  />)}
                  <Button
                    style={{
                      marginLeft: 10,
                      width: isEdit
                        ? isTablet
                          ? 150
                          : "45%"
                        : isTablet
                          ? 150
                          : "95%",
                    }}
                    title="Next"
                    onPress={() => {
                      setValue("interview")
                    }}
                  />
                </View>
              </View>

            )}
            {value === "interview" && (
              <View style={{ marginHorizontal: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={styles.title}>Interview</Text>
                  {!isEdit ? (<TouchableOpacity style={{
                    padding: isTablet ? 10 : 5,
                    marginRight: 10,
                    backgroundColor: colors.pickerBackColor,
                  }} onPress={() => setIsEdit(true)}>
                    <Image
                      source={require("../../../assets/icons/edit.png")}
                      style={{
                        height: isTablet ? 30 : 25,
                        width: isTablet ? 30 : 25,
                      }}
                    />
                  </TouchableOpacity>) : null}
                </View>

                <Text style={styles.modalTitle}>Lifestyle</Text>
                <AppSingleDropdown
                  title="Social Relationship"
                  placeholder="Select Social Relationship"
                  options={socialRelationshipOptions}
                  name="socialRelationship"
                  isTablet={isTablet}
                  disabled={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="Habits:"
                  placeholder="Habits"
                  options={habitsOptions}
                  name="habits"
                  isTablet={isTablet}
                  // value={values["habits"]}
                  // onChange={(value) => {
                  //   setFieldValue("habits", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppTextInput
                  label="Profession"
                  placeholder="Your Profession"
                  value={values["profession"]}
                  onChangeText={handleChange("profession")}
                  editable={isEdit ? true : false}
                />
                <AppMultiDropdown
                  title="Employment Status:"
                  placeholder="Employment Status"
                  options={employmentStatusOptions}
                  name="employmentStatus"
                  isTablet={isTablet}
                  // value={values["employmentStatus"]}
                  // onChange={(value) => {
                  //   setFieldValue("employmentStatus", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppTextArea
                  label="Sport:"
                  placeholder="Your Sport"
                  value={values["sport"]}
                  onChangeText={handleChange("sport")}
                  editable={isEdit ? true : false}
                />
                <AppMultiDropdown
                  title="Sport Frequency:"
                  placeholder="Sport Frequency"
                  options={sportFrequencyOptions}
                  name="sportFrequency"
                  isTablet={isTablet}
                  // value={values["sportFrequency"]}
                  // onChange={(value) => {
                  //   setFieldValue("sportFrequency", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppTextArea
                  label="Hobbies:"
                  placeholder="Your hobbies"
                  value={values["hobby"]}
                  onChangeText={handleChange("hobby")}
                  editable={isEdit ? true : false}
                />
                <Text style={styles.modalTitle}>
                  Inquiring for physical constitution
                </Text>
                <View
                  horizontal
                  style={{
                    flexDirection: isTablet ? "row" : "column",
                    alignItems: isTablet ? "center" : null,
                    marginBottom: isTablet ? 16 : null,
                    // width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: isTablet ? null : "space-between",
                      alignItems: "center",
                      width: isTablet ? "30%" : "100%",
                      marginBottom: isTablet ? 0 : 16,
                    }}
                  >
                    <AppTextInput
                      label="Height"
                      placeholder="Height"
                      value={values["height"].value}
                      keyboardType="decimal-pad"
                      onChangeText={(text) => {
                        setFieldValue("height", {
                          ...values["height"],
                          value: text,
                        });
                        if (
                          values["weight"].value &&
                          values["height"].measure &&
                          values["weight"].measure
                        ) {
                          const bmi = calculateBMI(
                            values["weight"].value,
                            text,
                            values["height"].measure,
                            values["weight"].measure
                          ).toString();
                          setFieldValue("BMI", bmi);
                          setFieldValue("BMICategory", calculateBMICategory(bmi));
                        }
                      }}
                      editable={isEdit ? true : false}
                      containerStyle={{
                        width: "50%",
                        marginHorizontal: 10,
                        marginBottom: 0,
                      }}
                    />
                    <View
                      style={{
                        height: 58,
                        width: "40%",
                        // borderWidth: 1,
                        // borderColor: "#aaa",
                        // borderRadius: 8,
                        marginTop: 12,
                      }}
                    >
                      <Dropdown
                        textInputPlaceholder="Select Value"
                        data={[
                          { id: `${v4()}`, value: "cm", label: "cm" },
                          { id: `${v4()}`, value: "inch", label: "inch" },
                        ]}
                        value={values["height"].measure}
                        onChange={(value) => {
                          setFieldValue("height", {
                            ...values["height"],
                            measure: value,
                          });
                          if (
                            (values["weight"].measure && values["weight"].value,
                              values["height"].value)
                          ) {
                            const bmi = calculateBMI(
                              values["weight"].value,
                              values["height"].value,
                              value,
                              values["weight"].measure
                            ).toString();
                            setFieldValue("BMI", bmi);
                            setFieldValue("BMICategory", calculateBMICategory(bmi));
                          }
                        }}
                        mode="outlined"
                        disabled={isEdit ? false : true}
                      />
                    </View>
                    {/*<BottomModal
          style={{width: isTablet ? 100 :'50%'}}
            onValueChange={(value) => {
              setFieldValue("height", {
                ...values["height"],
                measure: value,
              });
            }}
            placeholder={"Select Height"}
            selectedValue={values["height"].measure}
          >
            <Picker.Item label="cm" value="cm" />
            <Picker.Item label="inch" value="inch" />

          </BottomModal>*/}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: isTablet ? null : "space-between",
                      alignItems: "center",
                      width: isTablet ? "30%" : "100%",
                      marginBottom: isTablet ? 0 : 16,
                    }}
                  >
                    <AppTextInput
                      label="Weight"
                      placeholder="Weight"
                      keyboardType="decimal-pad"
                      value={values["weight"].value}
                      onChangeText={(text) => {
                        setFieldValue("weight", {
                          ...values["weight"],
                          value: text,
                        });
                        if (
                          values["height"].value &&
                          values["height"].measure &&
                          values["weight"].measure
                        ) {
                          const bmi = calculateBMI(
                            text,
                            values["height"].value,
                            values["height"].measure,
                            values["weight"].measure
                          ).toString();
                          setFieldValue("BMI", bmi);
                          setFieldValue("BMICategory", calculateBMICategory(bmi));
                        }
                      }}
                      containerStyle={{
                        width: "50%",
                        marginHorizontal: 10,
                        marginBottom: 0,
                      }}
                      editable={isEdit ? true : false}
                    />
                    <View
                      style={{
                        height: 58,
                        width: "40%",
                        marginTop: 12,
                      }}
                    >
                      <Dropdown
                        textInputPlaceholder="Select Value"
                        data={[
                          { id: `${v4()}`, value: "kg", label: "kg" },
                          { id: `${v4()}`, value: "lbs", label: "lbs" },
                        ]}
                        value={values["weight"].measure}
                        onChange={(value) => {
                          setFieldValue("weight", {
                            ...values["weight"],
                            measure: value,
                          });
                          if (
                            (values["height"].measure && values["weight"].value,
                              values["height"].value)
                          ) {
                            const bmi = calculateBMI(
                              values["weight"].value,
                              values["height"].value,
                              values["height"].measure,
                              value
                            ).toString();
                            setFieldValue("BMI", bmi);
                            setFieldValue("BMICategory", calculateBMICategory(bmi));
                          }
                        }}
                        mode="outlined"
                        disabled={isEdit ? false : true}
                      />
                    </View>
                    {/* <BottomModal
           style={{width: isTablet ? 100 :'50%'}}
            onValueChange={(value) => {
              setFieldValue("weight", {
                ...values["weight"],
                measure: value,
              });
            }}
            placeholder={"Select Weight"}
            selectedValue={values["weight"].measure}>
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="lbs" value="lbs" />

          </BottomModal>*/}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: isTablet ? null : "space-between",
                      alignItems: "center",
                      width: isTablet ? "35%" : "100%",
                      marginBottom: isTablet ? 0 : 16,
                    }}
                  >
                    <AppTextInput
                      label="Temperature"
                      placeholder="Temperature"
                      keyboardType="decimal-pad"
                      value={values["temperature"].value}
                      onChangeText={(text) =>
                        setFieldValue("temperature", {
                          ...values["temperature"],
                          value: text,
                        })
                      }
                      containerStyle={{
                        width: "50%",
                        marginHorizontal: 10,
                        marginBottom: 0,
                      }}
                      editable={isEdit ? true : false}
                    />
                    <View
                      style={{
                        height: 58,
                        width: "40%",
                        marginTop: 12,
                      }}
                    >
                      <Dropdown
                        textInputPlaceholder="Select Value"
                        data={[
                          { id: `${v4()}`, value: "Celcius", label: " °C" },
                          { id: `${v4()}`, value: "Fahrenheit", label: " °F" },
                        ]}
                        value={values["temperature"].measure}
                        onChange={(value) => {
                          setFieldValue("temperature", {
                            ...values["temperature"],
                            measure: value,
                          });
                        }}
                        mode="outlined"
                        disabled={isEdit ? false : true}
                      />
                    </View>
                    {/*<BottomModal
           style={{width: isTablet ? 100 :'50%'}}
            onValueChange={(value) => {
              setFieldValue("temperature", {
                ...values["temperature"],
                measure: value,
              });
            }}
            placeholder={"Select Temperature"}
            selectedValue={values["temperature"].measure}
          >
            <Picker.Item label=" °C" value="Celcius (°C)" />
            <Picker.Item label=" °F" value="Fahrenheit (°F)" />
          </BottomModal>*/}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: isTablet ? null : "space-between",
                    alignItems: "center",
                    width: isTablet ? "35%" : "100%",
                    marginBottom: isTablet ? 0 : 16,
                  }}
                >
                  <AppTextInput
                    label="BMI "
                    placeholder="BMI "
                    keyboardType="decimal-pad"
                    value={values["BMI"]}
                    onChangeText={handleChange("BMI")}
                    containerStyle={{
                      width: "45%",
                    }}
                    editable={false}
                  />
                  <AppTextInput
                    label="BMICategory"
                    placeholder="BMICategory"
                    value={values["BMICategory"]}
                    onChangeText={handleChange("BMICategory")}
                    containerStyle={{
                      width: "45%",
                    }}
                    editable={false}
                  />
                </View>

                <AppMultiDropdown
                  title="1. Thermal Feeling:"
                  placeholder="Thermal Feeling"
                  options={thermalFeelingOptions}
                  name="thermalFeeling"
                  isTablet={isTablet}
                  // value={values["thermalFeeling"]}
                  // onChange={(value) => {
                  //   setFieldValue("thermalFeeling", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="2. Perspiration:"
                  placeholder="Perspiration"
                  options={perspirationOptions}
                  name="perspiration"
                  isTablet={isTablet}
                  // value={values["perspiration"]}
                  // onChange={(value) => {
                  //   setFieldValue("perspiration", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="3. Appetite:"
                  placeholder="Appetite"
                  options={appetiteOptions}
                  name="appetite"
                  isTablet={isTablet}
                  // value={values["appetite"]}
                  // onChange={(value) => {
                  //   setFieldValue("appetite", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppTextArea
                  label="Note for appetite "
                  placeholder="Your additional information for appetite..."
                  value={values["appetiteNote"]}
                  onChangeText={handleChange("appetiteNote")}
                  editable={isEdit ? true : false}
                />
                <AppMultiDropdown
                  title="4. Vomiting:"
                  placeholder="Vomiting"
                  options={vomitingOptions}
                  name="vomiting"
                  isTablet={isTablet}
                  // value={values["vomiting"]}
                  // onChange={(value) => {
                  //   setFieldValue("vomiting", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />

                <AppTextArea
                  label="Note for vomiting"
                  placeholder="Your additional information for vomiting..."
                  value={values["vomitingNote"]}
                  onChangeText={handleChange("vomitingNote")}
                  editable={isEdit ? true : false}
                />
                <AppMultiDropdown
                  title="5. Diet:"
                  placeholder="Diet"
                  options={dietOptions}
                  name="diet"
                  isTablet={isTablet}
                  // value={values["diet"]}
                  // onChange={(value) => {
                  //   setFieldValue("diet", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppTextArea
                  label="Note for diet"
                  placeholder="Your additional information for diet..."
                  value={values["dietNote"]}
                  onChangeText={handleChange("dietNote")}
                  editable={isEdit ? true : false}
                />
                <AppMultiDropdown
                  title="6. Taste:"
                  placeholder="Taste"
                  options={tasteOptions}
                  name="taste"
                  isTablet={isTablet}
                  // value={values["taste"]}
                  // onChange={(value) => {
                  //   setFieldValue("taste", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="7. Thirst:"
                  placeholder="Thirst"
                  options={thirstOptions}
                  name="thirst"
                  isTablet={isTablet}
                  // value={values["thirst"]}
                  // onChange={(value) => {
                  //   setFieldValue("thirst", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="8. Defecation/Stool:"
                  placeholder="Defecation/Stool"
                  options={defecationOptions}
                  name="defecation"
                  isTablet={isTablet}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="9. Urination:"
                  placeholder="Urination"
                  options={urinationOptions}
                  name="urination"
                  isTablet={isTablet}
                  // value={values["urination"]}
                  // onChange={(value) => {
                  //   setFieldValue("urination", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="10. Urination-color:"
                  placeholder="Urination-color"
                  options={urinationColorOptions}
                  name="urinationColor"
                  isTablet={isTablet}
                  // value={values["urinationColor"]}
                  // onChange={(value) => {
                  //   setFieldValue("urinationColor", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="11. Sleep:"
                  placeholder="Sleep"
                  options={sleepOptions}
                  name="sleep"
                  isTablet={isTablet}
                  // value={values["sleep"]}
                  // onChange={(value) => {
                  //   setFieldValue("sleep", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="12. Head:"
                  placeholder="Head"
                  options={headOptions}
                  name="head"
                  isTablet={isTablet}
                  // value={values["head"]}
                  // onChange={(value) => {
                  //   setFieldValue("head", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="13. Eyes:"
                  placeholder="Eyes"
                  options={eyesOptions}
                  name="eyes"
                  isTablet={isTablet}
                  // value={values["eyes"]}
                  // onChange={(value) => {
                  //   setFieldValue("eyes", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="14. Ear:"
                  placeholder="Ear"
                  options={earsOptions}
                  name="ear"
                  isTablet={isTablet}
                  // value={values["ear"]}
                  // onChange={(value) => {
                  //   setFieldValue("ear", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="15. Nose:"
                  placeholder="Nose"
                  options={noseOptions}
                  name="nose"
                  isTablet={isTablet}
                  // value={values["nose"]}
                  // onChange={(value) => {
                  //   setFieldValue("nose", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="16. Throat:"
                  placeholder="Throat"
                  options={throatOptions}
                  name="throat"
                  isTablet={isTablet}
                  // value={values["throat"]}
                  // onChange={(value) => {
                  //   setFieldValue("throat", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="17. Menstruation History:"
                  placeholder="Menstruation History"
                  options={menstruationOptions}
                  name="menstruationHistory"
                  isTablet={isTablet}
                  // value={values["menstruation"]}
                  // onChange={(value) => {
                  //   setFieldValue("menstruation", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="18. Leukorrea:"
                  placeholder="Leukorrea"
                  options={leukorrheaOptions}
                  name="leukorrhea"
                  isTablet={isTablet}
                  // value={values["leukorrhea"]}
                  // onChange={(value) => {
                  //   setFieldValue("leukorrhea", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppTextInput
                  label="19. Locality of Pain:"
                  placeholder="Type in location of pain"
                  value={values["painLocation"]}
                  onChangeText={handleChange("painLocation")}
                  editable={isEdit ? true : false}
                />
                <AppSingleDropdown
                  title="20. Nature of Pain"
                  placeholder="Select Nature of Pain"
                  options={naturePainOptions}
                  name="painNature"
                  isTablet={isTablet}
                  disabled={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="21. Emotional Status:"
                  placeholder="Emotional Status"
                  options={emotionalStatusOptions}
                  name="emotionalStatus"
                  isTablet={isTablet}
                  // value={values["emotion"]}
                  // onChange={(value) => {
                  //   setFieldValue("emotion", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />

                <AppTextArea
                  label="Note for Emotion"
                  placeholder="Your additional information for emotion ..."
                  value={values["emotionalNote"]}
                  onChangeText={handleChange("emotionalNote")}
                  editable={isEdit ? true : false}
                />
                <AppTextArea
                  label="22. Mind"
                  placeholder="State of Mind of patient"
                  value={values["mind"]}
                  onChangeText={handleChange("mind")}
                  editable={isEdit ? true : false}
                />
                <AppTextArea
                  label="Note for interview"
                  placeholder="Your additional information for interview ..."
                  value={values["interviewNote"]}
                  onChangeText={handleChange("interviewNote")}
                  editable={isEdit ? true : false}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: isTablet ? "flex-end" : "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    style={{
                      marginRight: isTablet ? 10 : 0,

                      width: isEdit
                        ? isTablet
                          ? 150
                          : "30%"
                        : isTablet
                          ? 150
                          : "45%",
                    }}
                    textStyle={{ fontSize: 14 }}
                    title="Previous"
                    onPress={() => {
                      setValue("medicalHistory")
                    }}
                  />
                  {isEdit && (<Button
                    style={{
                      width: isTablet ? 150 : "30%",
                      marginRight: isTablet ? 10 : 0,
                    }}
                    textStyle={{ fontSize: 14 }}
                    title="Save"
                    onPress={() => {
                      handleSubmit();
                    }}
                  />)}
                  <Button
                    style={{
                      width: isEdit
                        ? isTablet
                          ? 150
                          : "30%"
                        : isTablet
                          ? 150
                          : "45%",
                    }}
                    textStyle={{ fontSize: 14 }}
                    title="Next"
                    onPress={() => {
                      setValue("inspectionAndExamination");
                    }}
                  />
                </View>
              </View>
            )}
            {value === "inspectionAndExamination" && (
              <View style={{ marginHorizontal: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={styles.title}>Inspection & Examination</Text>
                  {!isEdit ? (<TouchableOpacity style={{
                    padding: isTablet ? 10 : 5,
                    marginRight: 10,
                    backgroundColor: colors.pickerBackColor,
                  }} onPress={() => setIsEdit(true)}>
                    <Image
                      source={require("../../../assets/icons/edit.png")}
                      style={{
                        height: isTablet ? 30 : 25,
                        width: isTablet ? 30 : 25,
                      }}
                    />
                  </TouchableOpacity>) : null}
                </View>

                <Text style={styles.modalTitle}>Listening and Smelling</Text>
                <AppMultiDropdown
                  title="Respiration:"
                  placeholder="Respiration"
                  options={dataRespiration}
                  name="respiration"
                  isTablet={isTablet}
                  // value={values["respiration"]}
                  // onChange={(value) => {
                  //   setFieldValue("respiration", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="Speech:"
                  placeholder="Speech"
                  options={dataSpeech}
                  name="speech"
                  isTablet={isTablet}
                  // value={values["speech"]}
                  // onChange={(value) => {
                  //   setFieldValue("speech", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="Cough:"
                  placeholder="Cough"
                  options={dataCough}
                  name="cough"
                  isTablet={isTablet}
                  // value={values["cough"]}
                  // onChange={(value) => {
                  //   setFieldValue("cough", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="Odor:"
                  placeholder="Odor"
                  options={dataOdor}
                  name="odor"
                  isTablet={isTablet}
                  // value={values["odor"]}
                  // onChange={(value) => {
                  //   setFieldValue("odor", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <Text style={styles.modalTitle}>Observation</Text>

                <AppMultiDropdown
                  title="Vitality:"
                  placeholder="Vitality"
                  options={dataVitality}
                  name="vitality"
                  isTablet={isTablet}
                  // value={values["vitality"]}
                  // onChange={(value) => {
                  //   setFieldValue("vitality", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />

                <AppSingleDropdown
                  title="Appearance"
                  placeholder="Select Appearance"
                  options={dataAppearance}
                  name="appearance"
                  isTablet={isTablet}
                  // value={values["appearance"]}
                  // onChange={handleChange("appearance")}
                  disabled={isEdit ? false : true}
                />

                <AppMultiDropdown
                  title="Color and Lustre of Face:"
                  placeholder="Color & Lustre of Face"
                  options={dataColorAndLustreOfFace}
                  name="colorFace"
                  isTablet={isTablet}
                  // value={values["colorFace"]}
                  // onChange={(value) => {
                  //   setFieldValue("colorFace", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />

                <Text style={styles.modalTitle}>Physical Examination</Text>
                <AppMultiDropdown
                  title="Physical Appearance:"
                  placeholder="Physical Appearance"
                  options={dataPhysicalAppearance}
                  name="physicalAppearance"
                  isTablet={isTablet}
                  // value={values["physicalAppearance"]}
                  // onChange={(value) => {
                  //   setFieldValue("physicalAppearance", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />

                <AppTextArea
                  label="Note for Appearance"
                  placeholder="Your additional information for Appearance ..."
                  value={values["appearanceNote"]}
                  onChangeText={handleChange("appearanceNote")}
                  editable={isEdit ? true : false}
                />
                <AppMultiDropdown
                  title="Palpation of the Epigastrium:"
                  placeholder="Palpation of the Epigastrium"
                  options={dataPalpationOfTheEpigastrium}
                  name="epigastriumPalpation"
                  isTablet={isTablet}
                  // value={values["epigastriumPalpation"]}
                  // onChange={(value) => {
                  //   setFieldValue("epigastriumPalpation", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                <AppTextArea
                  label="Note for Palpation of the Epigastrium:"
                  placeholder="Your additional information for Palpation of the Epigastrium..."
                  value={values["epigastriumPalpationNote"]}
                  onChangeText={handleChange("epigastriumPalpationNote")}
                  editable={isEdit ? true : false}
                />
                <AppSingleDropdown
                  title="Range of motion"
                  placeholder="Select Range of motion"
                  options={dataMotionRange}
                  name="rangeMotion"
                  isTablet={isTablet}
                  // value={values["motionRange"]}
                  // onChange={handleChange("motionRange")}
                  disabled={isEdit ? false : true}
                />
                <AppSingleDropdown
                  title="Pain-Levels"
                  placeholder="Select Pain-Levels"
                  options={dataPainLevel}
                  name="painLevel"
                  isTablet={isTablet}
                  // value={values["painLevels"]}
                  // onChange={handleChange("painLevel")}
                  disabled={isEdit ? false : true}
                />

                <AppSingleDropdown
                  title="Tongue-Shape"
                  placeholder="Select Tongue Shape"
                  options={tongueShape}
                  name="tongueShape"
                  isTablet={isTablet}
                  // value={values["tongueShape"]}
                  // onChange={handleChange("tongueShape")}
                  disabled={isEdit ? false : true}
                />
                <AppMultiDropdown
                  title="Tongue-Color"
                  placeholder="Select Tongue Color"
                  options={tongueColor}
                  name="tongueColor"
                  isTablet={isTablet}
                  //  value={values["tongueColor"]}
                  // onChange={(value) => {
                  //   setFieldValue("tongueColor", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                {/* <AppSingleDropdown
        title="Tongue-Color"
        placeholder="Select Tongue Color"
        options={tongueColor}
        value={values["tongueColor"]}
        onChange={handleChange("tongueColor")}
      /> */}
                <AppTextArea
                  label="Note for Tongue:"
                  placeholder="Your additional information for Tongue..."
                  value={values["tongueNote"]}
                  onChangeText={handleChange("tongueNote")}
                  editable={isEdit ? true : false}
                />
                <AppSingleDropdown
                  title="Pulse-Rate (Vega)"
                  placeholder="Select Pulse-Rate"
                  options={dataPulseRate}
                  name="pulseRate"
                  isTablet={isTablet}
                  // value={values["pulseRate"]}
                  // onChange={handleChange("pulseRate")}
                  disabled={isEdit ? false : true}
                />
                <AppSingleDropdown
                  title="Pulse-Type"
                  placeholder="Select Pulse-Type"
                  options={dataPulseType}
                  name="pulseType"
                  isTablet={isTablet}
                  // value={values["pulseType"]}
                  // onChange={handleChange("pulseType")}
                  disabled={isEdit ? false : true}
                />
                <AppSingleDropdown
                  title="Mind-Constitution"
                  placeholder="Select Mind-Constitution"
                  options={mindConstitution}
                  name="mindConstitution"
                  isTablet={isTablet}
                  // value={values["mindConstitution"]}
                  // onChange={handleChange("mindConstitution")}
                  disabled={isEdit ? false : true}
                />
                <AppSingleDropdown
                  title="Body-Constitution"
                  placeholder="Select Body-Constitution"
                  options={aBodyConstitution}
                  name="aBodyConstitution"
                  isTablet={isTablet}
                  //value={values["bodyConstitution"]}
                  //onChange={handleChange("bodyConstitution")}
                  disabled={isEdit ? false : true}
                />
                <AppSingleDropdown
                  title="Disease-Formation"
                  placeholder="Select Disease-Formation"
                  options={diseaseFormation}
                  name="diseaseFormation"
                  isTablet={isTablet}
                  //value={values["diseaseFormation"]}
                  //onChange={handleChange("diseaseFormation")}
                  disabled={isEdit ? false : true}
                />
                <AppTextArea
                  label="Note for Physical Examination:"
                  placeholder="Your additional information for Physical Examination..."
                  value={values["physicalExaminationNote"]}
                  onChangeText={handleChange("physicalExaminationNote")}
                  editable={isEdit ? true : false}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: isTablet ? "flex-end" : "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    style={{
                      marginRight: isTablet ? 10 : 0,
                      width: isEdit
                        ? isTablet
                          ? 150
                          : "30%"
                        : isTablet
                          ? 150
                          : "45%",
                    }}
                    textStyle={{ fontSize: 14 }}
                    title="Previous"
                    onPress={() => {
                      setValue("interview")
                    }}
                  />
                  {isEdit && (<Button
                    style={{
                      width: isTablet ? 150 : "30%",
                      marginRight: isTablet ? 10 : 0,
                    }}
                    textStyle={{ fontSize: 14 }}
                    title="Save"
                    onPress={() => {
                      handleSubmit();
                    }}
                  />)}
                  <Button
                    style={{
                      width: isEdit
                        ? isTablet
                          ? 150
                          : "30%"
                        : isTablet
                          ? 150
                          : "45%",
                    }}
                    textStyle={{ fontSize: 14 }}
                    title="Next"
                    onPress={() => {
                      setValue("ayurvedaTreatment");
                    }}
                  />
                </View>
              </View>
            )}
            {value === "ayurvedaTreatment" && (
              <View style={{ marginHorizontal: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={styles.title}>Ayuruveda Treatment</Text>
                  {!isEdit ? (<TouchableOpacity style={{
                    padding: isTablet ? 10 : 5,
                    marginRight: 10,
                    backgroundColor: colors.pickerBackColor,
                  }} onPress={() => setIsEdit(true)}>
                    <Image
                      source={require("../../../assets/icons/edit.png")}
                      style={{
                        height: isTablet ? 30 : 25,
                        width: isTablet ? 30 : 25,
                      }}
                    />
                  </TouchableOpacity>) : null}
                </View>
                <Text style={styles.modalTitle}>Differentiation</Text>
                <AppTextInput
                  label="Ayurveda Diagnosis :"
                  placeholder="Your Ayurveda Diagnosis for patient..."
                  value={values["ayurvedaDiagnosis"]}
                  onChangeText={handleChange("ayurvedaDiagnosis")}
                  editable={isEdit ? true : false}
                />
                <AppMultiDropdown
                  title="Principle Treatment :"
                  placeholder="Your Treatment for patient..."
                  options={principleTreatment}
                  name="principleTreatment"
                  isTablet={isTablet}
                  // value={values["principleTreatment"]}
                  // onChange={(value) => {
                  //   setFieldValue("principleTreatment", value);
                  // }}
                  disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
                />
                {/* <AppTextInput
        label="Principle Treatment :"
        placeholder="Your Treatment for patient..."
        value={values["principleTreatment"]}
        onChangeText={handleChange("principleTreatment")}
      /> */}
                <TouchableOpacity
                  style={[{
                    borderRadius: 8,
                    height: 50,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#00B7DD",
                    marginBottom: 16
                  }, { width: isTablet ? 300 : "100%" }]}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonTitle}>
                    Click for suggested remedy from the site
                  </Text>
                </TouchableOpacity>


                <Text style={[styles.modalTitle, { marginVertical: 16 }]}>
                  Herbal Prescription
                </Text>
                <RemedyFields
                  setFieldlValue={setFieldValue}
                  name={"remedy"}
                  values={values}
                  dataUnit={dataUnit}
                  dataRemedy={aMateriaMedic}
                  isEdit={isEdit} />

                <AppTextArea
                  label="Diet-therapy :"
                  placeholder="Type in diet for the patient..."
                  value={values["dietTherapy"]}
                  onChangeText={handleChange("dietTherapy")}
                  editable={isEdit ? true : false}
                />
                <AppTextArea
                  label="Recommendation :"
                  placeholder="Type in recommendation for the patient..."
                  value={values["recommendation"]}
                  onChangeText={handleChange("recommendation")}
                  editable={isEdit ? true : false}
                />
                <AppTextArea
                  label="Note :"
                  placeholder="Note for treatment for the patient..."
                  value={values["treatmentNote"]}
                  onChangeText={handleChange("treatmentNote")}
                  editable={isEdit ? true : false}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: isTablet ? "flex-end" : "space-between",
                    width: "100%",
                    marginVertical: 10,
                  }}
                >
                  <Button
                    style={{
                      width: isEdit
                        ? isTablet
                          ? 150
                          : "30%"
                        : isTablet
                          ? 150
                          : "45%",
                      marginRight: isTablet ? 10 : null,
                    }}
                    textStyle={{ fontSize: 16 }}
                    title="Previous"
                    onPress={() => {
                      setValue("inspectionAndExamination")
                    }}
                  />
                  {isEdit && (<Button
                    style={[
                      {
                        width: isTablet ? 150 : "25%",
                        marginRight: isTablet ? 10 : null,
                      }
                    ]}
                    textStyle={{ fontSize: 16 }}
                    title="Save"
                    onPress={handleSubmit}
                  />)}
                  <Button
                    style={{
                      width: isEdit
                        ? isTablet
                          ? 150
                          : "40%"
                        : isTablet
                          ? 150
                          : "45%",
                    }}
                    textStyle={{ fontSize: 12 }}
                    title="File Attachment"
                    onPress={() => { setValue("fileAttachments") }}
                  />
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </Formik>
    </Modal>
  );
};

const FamilyMember = ({ setFieldValue, values, item, isEdit, diseasesConditions }) => {
  const { isTablet } = useSnapshot(state);
  const [isLandscape, setIsLandscape] = useState(false);
  const { landscape } = useDeviceOrientation();

  const { familyMember, status, years } = historyOptions;

  const handleMemberChange = (name, value) => {
    setFieldValue(
      "familyMembers",
      values["familyMembers"].map((member) => {
        if (member._id === item._id) {
          return {
            ...member,
            [name]: value,
          };
        } else {
          return member;
        }
      })
    );
  }

  useEffect(() => {
    setIsLandscape(landscape);
  }, [landscape]);

  return (
    <View>
      <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
        Family Member Information
      </Text>
      <View
        style={{
          backgroundColor: "#eee",
          borderRadius: 10,
          paddingVertical: 10,
          paddingLeft: 5,
          width: "100%",
          marginBottom: 8,
          flexDirection: isTablet ? "row" : "column",
          alignItems: isTablet ? "space-between" : "flex-start",
        }}
      >
        <View
          style={{
            marginBottom: isTablet ? 0 : 16,
            marginRight: 10,
            width: isTablet ? item._id === values["familyMembers"][0]._id ? "31%" : "31%" : "100%",
          }}
        >
          <Text>Family Member</Text>
          <Dropdown
            textInputPlaceholder="Select Family Member"
            data={familyMember}
            value={item.familyMember}
            onChange={(selected) => {
              console.log(selected);
              handleMemberChange("familyMember", selected)
            }}
            mode="outlined"
            disabled={isEdit ? false : true}
          />
        </View>
        <View
          style={{
            marginBottom: isTablet ? 0 : 16,
            marginRight: 10,
            width: isTablet ? item._id === values["familyMembers"][0]._id ? isLandscape ? "35%" : "29%" : isLandscape ? "35%" : "25%" : "100%",
          }}
        >
          <Text>Disease</Text>
          <Dropdown
            textInputPlaceholder="Western Disease name of the family member"
            data={diseasesConditions}
            value={item.disease}
            onChange={(selected) => {
              handleMemberChange("disease", selected)
            }}
            mode="outlined"
            disabled={isEdit ? false : true}
          />
        </View>

        {/* <AppTextInput
          label="Disease"
          placeholder="Western Disease name of the family member"
          defaultValue={item.disease}
          containerStyle={{
            marginBottom: isTablet ? 0 : 16,
            marginRight: isTablet ? 10 : 0,
            width: isTablet ? item._id === values["familyMembers"][0]._id ? "28%" : "24%" : "100%",
          }}
          style={{
            fontSize: 14,
            textAlignVertical: "center",
            height: "100%",
          }}
          onChangeText={(text) =>
            handleMemberChange("disease", text)
          }
        /> */}
        {/* Row */}
        <View style={{ flexDirection: 'row', justifyContent: "space-between", width: isTablet ? item._id === values["familyMembers"][0]._id ? isLandscape ? "30%" : "36%" : isLandscape ? "31%" : "41%" : "100%", alignItems: "center" }}>


          <View
            style={{
              marginBottom: isTablet ? 0 : 16,
              width: item._id === values["familyMembers"][0]._id ? "40%" : "35%",
            }}
          >
            <Text>Year </Text>
            <Dropdown
              textInputPlaceholder="Year"
              data={years}
              value={`${item.year}`}
              onChange={(year) =>
                handleMemberChange("year", year)
              }
              mode="outlined"
              disabled={isEdit ? false : true}
            />
          </View>

          <View
            style={{
              marginBottom: isTablet ? 0 : 16,
              width: item._id === values["familyMembers"][0]._id ? "55%" : "50%"
            }}
          >
            <Text>Status</Text>
            <Dropdown
              textInputPlaceholder="Select Status"
              data={status}
              value={item.state}
              onChange={(selected) =>
                handleMemberChange("state", selected)
              }
              mode="outlined"
              disabled={isEdit ? false : true}
            />
          </View>
          {isEdit && item._id !== values["familyMembers"][0]._id && (
            <View style={{ width: "10%", justifyContent: "center", alignItems: "center" }}>
              <IconButton
                icon="delete"
                style={{ backgroundColor: "#fa5a5a", }}
                color="white"
                onPress={() => {
                  // values["familyMembers"].forEach((member, index) => {
                  //   if (member._id === item._id) {
                  //     values["familyMembers"].splice(index, 1);
                  //   }
                  // });
                  setFieldValue(
                    "familyMembers",
                    values["familyMembers"].filter(
                      (member) => member._id !== item._id
                    )
                  );
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default SessionMoreDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  title: { margin: 10, fontSize: 20, color: "#888" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    marginVertical: 10,
    padding: 10,
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: colors.pickerBackColor,
    borderRadius: 10,
  },
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
    width: "25%",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableItemText: {
    width: "25%",
    textAlign: "center",
    fontSize: 12,
  },
});

// export const AppSingleDropdown = ({
//   title,
//   placeholder,
//   options,
//   value,
//   onChange,
//   isEdit
// }) => {
//   const { isTablet } = useSnapshot(state);

//   return (
//     <View
//       style={{
//         marginBottom: 16,
//         width: "100%",
//         flexDirection: isTablet ? "row" : "column",
//         alignItems: isTablet ? "center" : null,
//       }}
//     >
//       <Text
//         style={{
//           marginBottom: isTablet ? 0 : 5,
//           minWidth: isTablet ? 200 : null,
//         }}
//       >
//         {title}
//       </Text>
//       <View
//         style={{
//           width: isTablet ? 350 : "100%",
//           marginLeft: isTablet ? 50 : 0,
//         }}
//       >
//         <Dropdown
//           textInputPlaceholder={placeholder}
//           data={options}
//           value={value}
//           onChange={onChange}
//           mode="flat"
//           disabled={isEdit ? false : true}
//         />
//       </View>
//     </View>
//   );
// };
