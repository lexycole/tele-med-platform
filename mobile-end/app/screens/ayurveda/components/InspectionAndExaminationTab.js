import { useFormik, Formik } from "formik";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Dropdown, MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../../_layout";
import Button from "../../../components/forms/AppSubmitButton";
import AppTextArea from "../../../components/forms/AppTextArea";
import { inspectionAndExaminationDropdownValues } from "../drowdownItems";
import { ayurvedaState } from "../../../(public)/AyurvedaSession";
//import { AppMultiDropdown, AppSingleDropdown } from "./InterviewTab";
import AppMultiDropdown from "../../../components/forms/AppMultiDropdown";
import AppSingleDropdown from "../../../components/forms/AppSingleDropdown";
const validationSchema = Yup.object().shape({});

const InspectionAndExaminationTab = ({ handleSubmitToDB }) => {
  const { inspection, isInspection,isEdit } = useSnapshot(ayurvedaState);
  const { isTablet } = useSnapshot(state);
  const buttonClick = useRef();

  // console.log(snapshot.inspection);
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
    diseaseFormation
  } = inspectionAndExaminationDropdownValues;

  // const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
  //   validationSchema: validationSchema,
  //   initialValues: {
  //     respiration: inspection ? inspection.respiration : [],
  //     speech: inspection ? inspection.speech : [],
  //     cough: inspection ? inspection.cough : [],
  //     odor: inspection ? inspection.odor : [],
  //     vitality: inspection ? inspection.vitality : [],
  //     appearance: inspection ? inspection.appearance : "",
  //     colorFace: inspection ? inspection.colorFace : "",
  //     physicalAppearance: inspection ? inspection.physicalAppearance : [],
  //     physicalAppearanceNote: inspection
  //       ? inspection.physicalAppearanceNote
  //       : "",
  //     epigastriumPalpation: inspection ? inspection.epigastriumPalpation : [],
  //     epigastriumPalpationNote: inspection
  //       ? inspection.epigastriumPalpationNote
  //       : "",
  //     abdomenPalpation: inspection ? inspection.abdomenPalpation : [],

  //     motionRange: inspection ? inspection.motionRange : "",
  //     painGradations: inspection ? inspection.painGradations : "",
  //     tongueShape:inspection ? inspection.tongueShape : "",
  //     tongueColor:inspection ? inspection.tongueColor : [],
  //     tongueNote:inspection ? inspection.tongueNote : "",
  //     pulseRate:inspection ? inspection.pulseRate : "",
  //     pulseType:inspection ? inspection.pulseType : "",
  //     mindConstitution:inspection ? inspection.mindConstitution : "",
  //     bodyConstitution:inspection ? inspection.bodyConstitution : "",
  //     diseaseFormation:inspection ? inspection.diseaseFormation : "",
  //     physicalExaminationNote: inspection  ? inspection.physicalExaminationNote : "",
  //   },
  //   onSubmit: (values) => {
  //     ayurvedaState.inspection = values;
  //     ayurvedaState.isInspection = true;
  //     if (buttonClick.current === "next") ayurvedaState.tabName = "ayurvedaTreatment";
  //     if (buttonClick.current === "save") {
  //       ayurvedaState.tabName = "";
  //       handleSubmitToDB();
  //     }
  //   },
  // });

  const initialValues = {
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
    epigastriumPalpationNote: inspection ? inspection.epigastriumPalpationNote : "",
    abdomenPalpation: inspection ? inspection.abdomenPalpation : [],
    rangeMotion: inspection ? inspection.rangeMotion : "",
    painLevel: inspection ? inspection.painLevel : "",
    tongueShape: inspection ? inspection.tongueShape : "",
    tongueColor: inspection ? inspection.tongueColor : [],
    tongueNote: inspection ? inspection.tongueNote : "",
    pulseRate: inspection ? inspection.pulseRate : "",
    pulseType: inspection ? inspection.pulseType : "",
    mindConstitution: inspection ? inspection.mindConstitution : "",
    aBodyConstitution: inspection ? inspection.aBodyConstitution : "",
    diseaseFormation: inspection ? inspection.diseaseFormation : "",
    physicalExaminationNote: inspection ? inspection.physicalExaminationNote : "",
  };

  const handleSubmit = (values) => {
    ayurvedaState.inspection = values;
    ayurvedaState.isInspection = true;
    if (buttonClick.current === "next") ayurvedaState.tabName = "ayurvedaTreatment";
    if (buttonClick.current === "save") {
      ayurvedaState.tabName = "";
      handleSubmitToDB();
    }
  };



  //console.log(values['tongueColor'])

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, errors }) => (

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

                  width: isInspection && isEdit ? (isTablet ? 150 : "30%") : isTablet ? 150 : "45%",
                }}
                textStyle={{ fontSize: 14 }}
                title="Previous"
                onPress={() => {
                  ayurvedaState.tabName = "interview";
                }}
              />
              {isInspection && isEdit && (
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
                  width: isInspection && isEdit ? (isTablet ? 150 : "30%") : isTablet ? 150 : "45%",
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
