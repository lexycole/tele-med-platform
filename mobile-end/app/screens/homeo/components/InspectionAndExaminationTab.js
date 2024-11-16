import { useFormik,Formik } from "formik";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown, MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../../_layout";
import Button from "../../../components/forms/AppSubmitButton";
import AppTextArea from "../../../components/forms/AppTextArea";
import { inspectionAndExaminationDropdownValues } from "../drowdownItems";
import { homeoState } from "../../../(public)/HomeoPathySession";
//import { AppMultiDropdown, AppSingleDropdown } from "./InterviewTab";
import AppMultiDropdown from "../../../components/forms/AppMultiDropdown";
import AppSingleDropdown from "../../../components/forms/AppSingleDropdown";

const validationSchema = Yup.object().shape({});

const InspectionAndExaminationTab = ({ handleSubmitToDB }) => {
  const { inspection, isInspection , isEdit } = useSnapshot(homeoState);
  const { isTablet } = useSnapshot(state);
  const isUpdate = useRef(isInspection).current;
  const buttonClick = useRef();

  // console.log(snapshot.inspection);
  const {
    dataAppearance,
    dataColorAndLustreOfFace,
    dataCough,
    dataOdor,
    PainLevel,
    dataPalpationOfTheEpigastrium,
    dataPhysicalAppearance,
    RangeMotion,
    dataRespiration,
    dataSpeech,
    dataVitality,
  } = inspectionAndExaminationDropdownValues;


const  initialValues = {
  respiration: inspection ? inspection.respiration : [],
  speech: inspection ? inspection.speech : [],
  cough: inspection ? inspection.cough : [],
  odor: inspection ? inspection.odor : [],
  vitality: inspection ? inspection.vitality : [],
  appearance: inspection ? inspection.appearance : "",
  colorFace: inspection ? inspection.colorFace : "",
  physicalAppearance: inspection ? inspection.physicalAppearance : [],
  appearanceNote: inspection ? inspection.appearanceNote : "",
  epigastriumPalpation: inspection ? inspection.epigastriumPalpation : [],
  epigastriumPalpationNote: inspection
    ? inspection.epigastriumPalpationNote
    : "",
  abdomenPalpation: inspection ? inspection.abdomenPalpation : [],

  rangeMotion: inspection ? inspection.rangeMotion : "",
  painLevel: inspection ? inspection.painLevel : "",
  physicalExaminationNote: inspection
    ? inspection.physicalExaminationNote
    : "",
};

const handleSubmit = (values) => {
      homeoState.inspection = values;
      homeoState.isInspection = true;
      if (buttonClick.current === "next") homeoState.tabName = "homeoTreatment";
      if (buttonClick.current === "save") {
        homeoState.tabName = "";
        handleSubmitToDB();
      }
};




  return (
    <>
    <Formik
    validationSchema = {validationSchema}
     initialValues={initialValues}
     onSubmit={handleSubmit}
   >
     {({ handleChange, handleBlur,setFieldValue, handleSubmit, values,errors }) => (

    <View style={styles.container}>
      <Text style={styles.subtitle}>Listening and Smelling</Text>
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
      <Text style={styles.subtitle}>Observation</Text>

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
        //value={values["appearance"]}
        //onChange={handleChange("appearance")}
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

      <Text style={styles.subtitle}>Physical Examination</Text>
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
        options={RangeMotion}
        name="rangeMotion"
        isTablet={isTablet}
        // value={values["rangeMotion"]}
        // onChange={handleChange("rangeMotion")}
        disabled={isEdit ? false : true}
      />
      <AppSingleDropdown
        title="Pain gradations"
        placeholder="Select Pain Level"
        options={PainLevel}
        name="painLevel"
        isTablet={isTablet}
        // value={values["painLevel"]}
        // onChange={handleChange("painLevel")}
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

            width: isUpdate && isEdit ? (isTablet ? 150 : "30%") : isTablet ? 150 : "45%",
          }}
          textStyle={{ fontSize: 14 }}
          title="Previous"
          onPress={() => {
            homeoState.tabName = "interview";
          }}
        />
        {isUpdate && isEdit && (
          <Button
            style={{
              width: isTablet ? 150 : "30%",
              marginRight: isTablet ? 10 : 0,
            }}
            textStyle={{ fontSize: 14 }}
            title="Save"
            onPress={() => {
              buttonClick.current = "save";
              handleSubmit();
            }}
          />
        )}
        <Button
          style={{
            width: isUpdate && isEdit ? (isTablet ? 150 : "30%") : isTablet ? 150 : "45%",
          }}
          textStyle={{ fontSize: 14 }}
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

export default InspectionAndExaminationTab;

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
