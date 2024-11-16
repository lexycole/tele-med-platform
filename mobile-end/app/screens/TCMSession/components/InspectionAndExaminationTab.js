import { useFormik } from "formik";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Dropdown, MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../../_layout";
import Button from "../../../components/forms/AppSubmitButton";
import AppTextArea from "../../../components/forms/AppTextArea";
import { inspectionAndExaminationDropdownValues } from "../drowdownItems";
import { tcmState } from "../../../(public)/TCMSession";
import { AppMultiDropdown, AppSingleDropdown } from "./InterviewTab";

const validationSchema = Yup.object().shape({});

const InspectionAndExaminationTab = ({ handleSubmitToDB }) => {
  const { inspection, isInspection,isEdit } = useSnapshot(tcmState);
  const { isTablet } = useSnapshot(state);
  const isUpdate = useRef(isInspection).current;
  const buttonClick = useRef();

  // console.log(snapshot.inspection);
  const {
    dataAppearance,
    dataColorAndLustreOfFace,
    dataCough,
    dataOdor,
    dataPainGradations,
    dataPalpationOfTheEpigastrium,
    dataPhysicalAppearance,
    dataRangeOfMotion,
    dataRespiration,
    dataSpeech,
    dataVitality,
	tongueColor,
	tongueShape,	
  tongueQuality,
	dataPulseRate,
	dataPulseType,
	dataPulseRhythm,	
	dataPulseTension,	
	dataPulseStrength,	
	dataPulseDepth,	
	dataPulseSpeed,	
  } = inspectionAndExaminationDropdownValues;

  const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      respiration: inspection ? inspection.respiration : [],
      speech: inspection ? inspection.speech : [],
      cough: inspection ? inspection.cough : [],
      odor: inspection ? inspection.odor : [],
      vitality: inspection ? inspection.vitality : [],
      appearance: inspection ? inspection.appearance : "",
      colorFace: inspection ? inspection.colorFace : "",
      physicalAppearance: inspection ? inspection.physicalAppearance : [],
      appearanceNote: inspection ? inspection.appearanceNote : "",
      tongueColor: inspection ? inspection.tongueColor : [],
      tongueShape: inspection ? inspection.tongueShape : [],	  
      tongueQuality: inspection ? inspection.tongueQuality : [],
      tongueNote: inspection ? inspection.tongueNote : "",	  
      // pulseRate: inspection ? inspection.pulseRate : [],
      pulseRhythm: inspection ? inspection.pulseRhythm : [],	  
      // pulseType: inspection ? inspection.pulseType : [],
      pulseTension: inspection ? inspection.pulseTension : [],	  
      pulseStrength: inspection ? inspection.pulseStrength : [],	  	  
      pulseSpeed: inspection ? inspection.pulseSpeed : [],
      pulseDepth: inspection ? inspection.pulseDepth : [],	  
      epigastriumPalpation: inspection ? inspection.epigastriumPalpation : [],
      epigastriumPalpationNote: inspection ? inspection.epigastriumPalpationNote : "",
      abdomenPalpation: inspection ? inspection.abdomenPalpation : [],
      rangeMotion: inspection ? inspection.rangeMotion : "",
      painLevel: inspection ? inspection.painLevel : "",
      physicalExaminationNote: inspection ? inspection.physicalExaminationNote : "",
	  
    },
    
    onSubmit: (values) => {
      tcmState.inspection = values;
      tcmState.isInspection = true;
      if (buttonClick.current === "next") tcmState.tabName = "tcmTreatment";
      if (buttonClick.current === "save") {
        tcmState.tabName = "";
        handleSubmitToDB();
      }
    },
  });
// console.log(inspection || '','motion range')
// console.log(inspection || '','pain level')
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Listening and Smelling</Text>
      <AppMultiDropdown
        title="Respiration:"
        placeholder="Respiration"
        options={dataRespiration}
        value={values["respiration"]}
        onChange={(value) => {
          setFieldValue("respiration", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Speech:"
        placeholder="Speech"
        options={dataSpeech}
        value={values["speech"]}
        onChange={(value) => {
          setFieldValue("speech", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Cough:"
        placeholder="Cough"
        options={dataCough}
        value={values["cough"]}
        onChange={(value) => {
          setFieldValue("cough", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Odor:"
        placeholder="Odor"
        options={dataOdor}
        value={values["odor"]}
        onChange={(value) => {
          setFieldValue("odor", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <Text style={styles.subtitle}>Observation</Text>

      <AppMultiDropdown
        title="Vitality:"
        placeholder="Vitality"
        options={dataVitality}
        value={values["vitality"]}
        onChange={(value) => {
          setFieldValue("vitality", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />

      {/* <AppSingleDropdown
        title="Appearance"
        placeholder="Select Appearance"
        options={dataAppearance}
        value={values["appearance"]}
        onChange={handleChange("appearance")}
      /> */}

      <AppMultiDropdown
        title="Color and Lustre of Face:"
        placeholder="Color & Lustre of Face"
        options={dataColorAndLustreOfFace}
        value={values["colorFace"]}
        onChange={(value) => {
          setFieldValue("colorFace", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />

      <Text style={styles.subtitle}>Physical Examination</Text>
      <AppMultiDropdown
        title="Physical Appearance:"
        placeholder="Physical Appearance"
        options={dataPhysicalAppearance}
        value={values["physicalAppearance"]}
        onChange={(value) => {
          setFieldValue("physicalAppearance", value);
        }}
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
        title="Tongue Shape:"
        placeholder="Shape of Tongue"
        options={tongueShape}
        value={values["tongueShape"]}
        onChange={(value) => {
          setFieldValue("tongueShape", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Tongue Color:"
        placeholder="Color of Tongue"
        options={tongueColor}
        value={values["tongueColor"]}
        onChange={(value) => {
          setFieldValue("tongueColor", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
	  
      <AppMultiDropdown
        title="Tongue Quality:"
        placeholder="Quality of Tongue"
        options={tongueQuality}
        value={values["tongueQuality"]}
        onChange={(value) => {
          setFieldValue("tongueQuality", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
	  
      <AppTextArea
        label="Note for Tongue:"
        placeholder="Your additional information for tongue..."
        value={values["tongueNote"]}
        onChangeText={handleChange("tongueNote")}
        editable={isEdit ? true : false}
      />
      <AppMultiDropdown
        title="Pulse Speed:"
        placeholder="Speed of Pulse"
        options={dataPulseSpeed}
        value={values["pulseSpeed"]}
        onChange={(value) => {
          setFieldValue("pulseSpeed", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Pulse-Depth:"
        placeholder="Depth of Pulse"
        options={dataPulseDepth}
        value={values["pulseDepth"]}
        onChange={(value) => {
          setFieldValue("pulseDepth", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Pulse-Rhythm:"
        placeholder="Rhythm of Pulse"
        options={dataPulseRhythm}
        value={values["pulseRhythm"]}
        onChange={(value) => {
          setFieldValue("pulseRhythm", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Pulse-Strength:"
        placeholder="Strength of Pulse"
        options={dataPulseStrength}
        value={values["pulseStrength"]}
        onChange={(value) => {
          setFieldValue("pulseStrength", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Pulse-Tension:"
        placeholder="Tension of Pulse"
        options={dataPulseTension}
        value={values["pulseTension"]}
        onChange={(value) => {
          setFieldValue("pulseTension", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      {/* <AppMultiDropdown
        title="Mind-Constitution:"
        placeholder="Select Mind-Constitution"
        options={dataMindConstitution}
        value={values["mindConstitution"]}
        onChange={(value) => {
          setFieldValue("mindConstitution", value);
        }}
      /> 
      <AppMultiDropdown
        title="Body-Constitution:"
        placeholder="Select Body-Constitution"
        options={dataABodyConstitution}
        value={values["aBodyConstitution"]}
        onChange={(value) => {
          setFieldValue("aBodyConstitution", value);
        }}
      />
      <AppMultiDropdown
        title="Disease-Formation:"
        placeholder="Select Disease-Formation"
        options={dataDiseaseFormation}
        value={values["diseaseFormation"]}
        onChange={(value) => {
          setFieldValue("diseaseFormation", value);
        }}
      />
	  */}
      <AppMultiDropdown
        title="Palpation of the Epigastrium:"
        placeholder="Palpation of the Epigastrium"
        options={dataPalpationOfTheEpigastrium}
        value={values["epigastriumPalpation"]}
        onChange={(value) => {
          setFieldValue("epigastriumPalpation", value);
        }}
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
        options={dataRangeOfMotion}
        value={values["rangeMotion"]}
        onChange={handleChange("rangeMotion")}
        disabled={isEdit ? false : true}
      />
      <AppSingleDropdown
        title="Pain gradations"
        placeholder="Select Pain gradations"
        options={dataPainGradations}
        value={values["painLevel"]}
        onChange={handleChange("painLevel")}
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
            tcmState.tabName = "interview";
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