import { useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../../_layout";
import Button from "../../../components/forms/AppSubmitButton";
import AppTextArea from "../../../components/forms/AppTextArea";
// import AppTextInput from "../../../components/forms/AppTextInput";
import { tcmTreatmentDropdownValues, inspectionAndExaminationDropdownValues } from "../drowdownItems";
import { tcmState } from "../../../(public)/TCMSession";
import AppMultiDropdown from "../../../components/forms/AppMultiDropdown";
// import AppSingleDropdown from "../../../components/forms/AppSingleDropdown";
import AcuCombination from "./AcuCombination";
import HerbalFormula from "./HerbalFormula";
// import { Dropdown } from "sharingan-rn-modal-dropdown";
import { AppSingleDropdown } from "./InterviewTab";


const validationSchema = Yup.object().shape({});

const TCMTreatmentTab = ({ handleSubmitToDB, MateriaMedic, formulas, acuPoints, pathologies, principleTreatmentOptions, differentiationOptions }) => {
  const { TCMTreatment,isEdit } = useSnapshot(tcmState);
  const [isSuggested, setIsSuggested] = useState(false)
  const [principleTreatments, setPrincipleTreatments] = useState(principleTreatmentOptions)
  const { isTablet } = useSnapshot(state);
  const { dataRemedy, dataNeedleManipulation, dataStimulationMethod, dataYesNo, dataPrincipleTreatment, dataUnit, dataAcuPoints, dataHerbal } = tcmTreatmentDropdownValues;

  const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      tcmDiagnosis: TCMTreatment ? TCMTreatment.tcmDiagnosis : "",
      principleTreatment: TCMTreatment ? TCMTreatment.principleTreatment : "",
      acuCombination: TCMTreatment ? TCMTreatment.acuCombination : [{ acuPoints: '', stimulationDuration: 0, stimulationMethod: '', needleManipulation: '', }],
      // moxibustion:'',
      acuTreatmentNote: TCMTreatment ? TCMTreatment.acuTreatmentNote : "",
      // remedy: TCMTreatment ? TCMTreatment.remedy[0]?.materiaMedica : "",
      herbalFormula1: TCMTreatment ? TCMTreatment.herbalFormula1 : "",
      materiaMedica1: TCMTreatment ? TCMTreatment.materiaMedica1 : [{ materiamedica: '', dosage: "", unit: "" }],
      herbalFormula2: TCMTreatment ? TCMTreatment.herbalFormula2 : "",
      materiaMedica2: TCMTreatment ? TCMTreatment.materiaMedica2 : [{ materiamedica: '', dosage: "", unit: "" }],
      TDP: TCMTreatment ? TCMTreatment.TDP : "",
      TDPNote: TCMTreatment ? TCMTreatment.TDPNote : "",
      tuina: TCMTreatment ? TCMTreatment.tuina : "",
      auricularAcupuncture: TCMTreatment ? TCMTreatment.auricularAcupuncture : "",
      dietTherapy: TCMTreatment ? TCMTreatment.dietTherapy : "",
      recommendation: TCMTreatment ? TCMTreatment.recommendation : "",
    },
    onSubmit: async (values) => {
      const filterd = {
        ...values,
        materiaMedica1: values.materiaMedica1.map((r) => {
          return {
            ...r,
            dosage: Number(r.dosage)
          }
        }),
        materiaMedica2: values.materiaMedica2.map((r) => {
          return {
            ...r,
            dosage: Number(r.dosage)
          }
        })
      };
      tcmState.TCMTreatment = filterd;
      tcmState.isTCMTreatment = true;
      tcmState.tabName = "";
      handleSubmitToDB();
    },
  });

  const handleTcmDiagnosis = (value) => {
    setPrincipleTreatments(
      pathologies.filter((p) => p.differentiation === value).map((p) => {
        return {
          value: p.principleTreatment,
          label: p.principleTreatment,
        }
      }).filter((p) => p !== undefined && p.value !== undefined && p.value !== "")
    )
    setFieldValue('tcmDiagnosis', value)
    setFieldValue('principleTreatment', "")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Differentiation</Text>
      <AppSingleDropdown
        title="TCM Diagnosis :"
        placeholder="Select your TCM Diagnosis for patient..."
        options={differentiationOptions}
        value={values["tcmDiagnosis"]}
        onChange={handleTcmDiagnosis}
        disabled={isEdit ? false : true}
      />
      <AppSingleDropdown
        title="Principle Treatment :"
        placeholder="Select Your Treatment for patient..."
        options={principleTreatments}
        value={values["principleTreatment"]}
        onChange={handleChange("principleTreatment")}
        disabled={isEdit ? false : true}
      />
      <TouchableOpacity
        style={[styles.button, { width: isTablet ? 300 : "100%" }]}
        activeOpacity={0.7}
        onPress={() => setIsSuggested(!isSuggested)}
      >
        <Text style={styles.buttonTitle}>
          Click for suggested remedy from the site

        </Text>
        {/* <Image
          style={[styles.icons, isSuggested && styles.rotateImage]}
          source={require("../../../assets/next.png")}
        /> */}
      </TouchableOpacity>
      {isSuggested && <View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "red" }}>Primary Acu Treatment :</Text>
          {pathologies && pathologies.map((pathology, index) => {
            if (pathology.principleTreatment === values["principleTreatment"]) {
              return (
                <Text key={index}>{pathology.primacuTreatment}</Text>
              )
            }
          })}
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "red" }}>Secondary Acu Treatment :</Text>
          {pathologies && pathologies.map((pathology, index) => {
            if (pathology.principleTreatment === values["principleTreatment"]) {
              return (
                <Text key={index}>{pathology.secacuTreatment}</Text>
              )
            }
          })}
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "red" }}>Herbal Formulas :</Text>
          {pathologies && pathologies.map((pathology, index) => {
            if (pathology.principleTreatment === values["principleTreatment"]) {
              return (
                <Text key={index}>{pathology.herbalPrescription}</Text>
              )
            }
          })}
        </View>
      </View>}
      <Text style={[styles.subtitle, { marginVertical: 16 }]}>
        Acupuncture Treatment
      </Text>
      {/* <TouchableOpacity
        style={[styles.button, { width: isTablet ? 300 : "100%" }]}
        activeOpacity={0.7}
      >a
        <Text style={styles.buttonTitle}>Add Acu-point for Treatment</Text>
      </TouchableOpacity> */}

      {/* <AppSingleDropdown
        title="Moxibustion:"
        placeholder="Yes/No"
        options={dataMoxibustion}
        value={values["moxibustion"]}
        onChange={handleChange("moxibustion")}
      /> */}
      {/* <TouchableOpacity
        style={[styles.button, { width: isTablet ? 300 : "100%" }]}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonTitle}>
          Click for suggested remedy from the site
        </Text>
      </TouchableOpacity> */}
      <AcuCombination
        setFieldlValue={setFieldValue}
        values={values}
        dataYesNo={dataYesNo}
        dataStimulationMethod={dataStimulationMethod}
        dataMoxibustion={dataYesNo}
        dataNeedleManipulation={dataNeedleManipulation}
        //   dataStimulationDuration={datastimulationDuration}		
        dataAcuPoints={acuPoints}
        isEdit={isEdit}
      />

      <AppTextArea
        label="Note for Acu Treatment:"
        placeholder="Note for Acu-treatment of the patient..."
        value={values["acuTreatmentNote"]}
        onChangeText={handleChange("acuTreatmentNote")}
        editable={isEdit ? true : false}
      />
      <Text style={[styles.subtitle, { marginVertical: 16 }]}>
        Herbal Prescription
      </Text>
      <Text style={[styles.subtitle, { marginVertical: 16 }]}>
        Herbal Formula 1
      </Text>
      <AppSingleDropdown
        title=""
        placeholder="Select Formula1"
        options={formulas}
        value={values["herbalFormula1"]}
        onChange={handleChange("herbalFormula1")}
        disabled={isEdit ? false : true}
      />
      {/* +we need materia medica2 */}
      <HerbalFormula
        setFieldlValue={setFieldValue}
        values={values}
        name={"materiaMedica1"}
        dataRemedy={MateriaMedic}
        dataUnit={dataUnit}
        isEdit={isEdit}
      />
      <Text style={[styles.subtitle, { marginVertical: 16 }]}>
        Herbal Formula 2
      </Text>
      <AppSingleDropdown
        title=""
        placeholder="Select formula 2"
        options={formulas}
        value={values["herbalFormula2"]}
        onChange={handleChange("herbalFormula2")}
        disabled={isEdit ? false : true}
      />
      <HerbalFormula
        setFieldlValue={setFieldValue}
        values={values}
        name={"materiaMedica2"}
        dataRemedy={MateriaMedic}
        dataUnit={dataUnit}
        isEdit={isEdit}
      />

      <AppSingleDropdown
        title="TDP:" placeholder="Yes/No"
        options={dataYesNo}
        value={values["TDP"]}
        onChange={handleChange("TDP")}
        disabled={isEdit ? false : true}
      />

      <AppTextArea
        label="TDP Note :"
        placeholder="Type in Note for TDP..."
        value={values["TDPNote"]}
        onChangeText={handleChange("TDPNote")}
        editable={isEdit ? true : false}
      />
      <AppTextArea
        label="Auricular-Acupuncture :"
        placeholder="Type in Auricular-Acupuncture..."
        value={values["auricularAcupuncture"]}
        onChangeText={handleChange("auricularAcupuncture")}
        editable={isEdit ? true : false}
      />
      <AppTextArea
        label="Tuina :"
        placeholder="Type in notes for tuina..."
        value={values["tuina"]}
        onChangeText={handleChange("tuina")}
        editable={isEdit ? true : false}
      />
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
      {!tcmState.isMedical && (
        <Text style={{ fontSize: 12, color: "red", marginVertical: 10 }}>
          Please submit Medical History First
        </Text>
      )}
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
            width: isTablet ? 150 : "30%",
            marginRight: isTablet ? 10 : null,
          }}
          textStyle={{ fontSize: 16 }}
          title="Previous"
          onPress={() => {
            tcmState.tabName = "inspectionAndExamination";
          }}
        />
        {isEdit && <Button
          style={[
            {
              width: isTablet ? 150 : "25%",
              marginRight: isTablet ? 10 : null,
            },
            !tcmState.isMedical && { backgroundColor: "#aaa" },
          ]}
          textStyle={{ fontSize: 16 }}
          title="Save"
          onPress={tcmState.isMedical ? handleSubmit : null}
        />}
        <Button
          style={{ width: isTablet ? 150 : "40%" }}
          textStyle={{ fontSize: 12 }}
          title="File Attachment"
          onPress={() => { tcmState.tabName = "fileAttachment" }}
        />
      </View>
    </View>
  );
};

export default TCMTreatmentTab;

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
  icons: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  rotateImage: {
    transform: [{ rotate: "90deg" }],
  },
});
