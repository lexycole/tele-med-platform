import "react-native-get-random-values"
import { useFormik, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { v4 } from "uuid";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../../_layout";
import Button from "../../../components/forms/AppSubmitButton";
import AppTextArea from "../../../components/forms/AppTextArea";
import AppTextInput from "../../../components/forms/AppTextInput";
import { medicalHistory as historyOptions } from "../drowdownItems";
import { ayurvedaState } from "../../../(public)/AyurvedaSession";
//import { AppMultiDropdown } from "./InterviewTab";
import AppMultiDropdown from "../../../components/forms/AppMultiDropdown";
import { IconButton } from 'react-native-paper';
import AppSingleDropdown from "../../../components/forms/AppSingleDropdown";

const validationSchema = Yup.object().shape({
  chiefComplaint: Yup.string().required("Required"),
  symptoms: Yup.string().required("Required")
});

const MedicalHistoryTab = ({ handleSubmitToDB, diseasesConditions }) => {
  const { isTablet } = useSnapshot(state);
  const { medicalHistory, isMedical,isEdit } = useSnapshot(ayurvedaState);
  const buttonClick = useRef();


  // const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
  //   validationSchema: validationSchema,
  //   initialValues: {
  //     chiefComplaint: medicalHistory ? medicalHistory.chiefComplaint : "",
  //     symptoms: medicalHistory ? medicalHistory.symptoms : "",
  //     westernDisease: medicalHistory ? medicalHistory.westernDisease : "",
  //     currentTreatment: medicalHistory ? medicalHistory.currentTreatment : [],
  //     diseases: medicalHistory ? medicalHistory.diseases : "",
  //     surgeries: medicalHistory ? medicalHistory.surgeries : "",
  //     medicaments: medicalHistory ? medicalHistory.medicaments : "",
  //     allergies: medicalHistory ? medicalHistory.allergies : "",
  //     pregnancies: medicalHistory ? medicalHistory.pregnancies : "",
  //     familyMembers: medicalHistory
  //       ? medicalHistory.familyMembers
  //         ? medicalHistory.familyMembers
  //         : [{ _id: v4(), familyMember: "", disease: "", year: "", state: "" }]
  //       : [{ _id: v4(), familyMember: "", disease: "", year: "", state: "" }],
  //     noteMedicalHistory: medicalHistory
  //       ? medicalHistory.noteMedicalHistory
  //       : "",
  //   },
  //   onSubmit: (values) => {
  //     const filterd = {
  //       ...values,
  //       familyMembers: values.familyMembers.map((member) => ({
  //         familyMember: member.familyMember,
  //         state: member.state,
  //         year: member.year,
  //         disease: member.disease,
  //       })),
  //     };
  //     ayurvedaState.medicalHistory = filterd;
  //     ayurvedaState.isMedical = true;
  //     if (buttonClick.current === "next") ayurvedaState.tabName = "interview";

  //     if (buttonClick.current === "save") {
  //       ayurvedaState.tabName = "";
  //       handleSubmitToDB();
  //     }
  //   },
  // });

  const initialValues = {
    chiefComplaint: medicalHistory ? medicalHistory.chiefComplaint : "",
    symptoms: medicalHistory ? medicalHistory.symptoms : "",
    westernDisease: medicalHistory ? medicalHistory.westernDisease : "",
    currentTreatment: medicalHistory ? medicalHistory.currentTreatment : [],
    diseases: medicalHistory ? medicalHistory.diseases : "",
    surgeries: medicalHistory ? medicalHistory.surgeries : "",
    medicamentsSupplements: medicalHistory ? medicalHistory.medicamentsSupplements : "",
    allergies: medicalHistory ? medicalHistory.allergies : "",
    pregnancies: medicalHistory ? medicalHistory.pregnancies : "",
    familyMembers: medicalHistory
      ? medicalHistory.familyMembers
        ? medicalHistory.familyMembers
        : [{ _id: v4(), familyMember: "", disease: "", year: "", state: "" }]
      : [{ _id: v4(), familyMember: "", disease: "", year: "", state: "" }],
    noteMedicalHistory: medicalHistory
      ? medicalHistory.noteMedicalHistory
      : "",
  };

  const handleSubmit = (values) => {
    const filterd = {
      ...values,
      familyMembers: values.familyMembers.map((member) => ({
        familyMember: member.familyMember,
        state: member.state,
        year: member.year,
        disease: member.disease,
      })),
    };
    ayurvedaState.medicalHistory = filterd;
    ayurvedaState.isMedical = true;
    if (buttonClick.current === "next") ayurvedaState.tabName = "interview";

    if (buttonClick.current === "save") {
      ayurvedaState.tabName = "";
      handleSubmitToDB();
    }
  }


  const symptoms = useRef(null);

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <Text>Medical History</Text>
            <Text style={styles.subtitle}>Personal Medical History</Text>

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

            <Text style={[styles.subtitle, { marginVertical: 16 }]}>
              Family Medical History
            </Text>
            <TouchableOpacity
              style={[styles.button, { width: isTablet ? 300 : "100%" }]}
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

            <AppTextArea
              label="Note for Medical History:"
              placeholder="Type additional information of Medical History"
              returnKeyType="done"
              returnKeyLabel="done"
              value={values["noteMedicalHistory"]}
              onChangeText={handleChange("noteMedicalHistory")}
              onSubmitEditing={handleSubmit}
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
              {isMedical && isEdit && (
                <Button
                  style={{ width: isTablet ? 150 : "45%" }}
                  textStyle={{ fontSize: 16 }}
                  title="Save"
                  onPress={() => {
                    buttonClick.current = "save";
                    handleSubmit();
                  }}
                />
              )}
              <Button
                style={{
                  marginLeft: isMedical && isEdit ? 10 : 0,
                  width: isMedical && isEdit
                    ? isTablet
                      ? 150
                      : "45%"
                    : isTablet
                      ? 150
                      : "100%",
                }}
                title="Next"
                onPress={() => {
                  buttonClick.current = "next";
                  handleSubmit();
                }}
              />
            </View>
          </View>

        )}
      </Formik>
    </>

  );
};

const FamilyMember = ({ setFieldValue, values, item,isEdit, diseasesConditions }) => {
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

export default MedicalHistoryTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    color: "#223e4b",
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
  buttonTitle: {
    fontSize: 16,
    color: "white",
  },
  removeButton: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});
