import { useFormik, Formik, useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../../_layout";
import Button from "../../../components/forms/AppSubmitButton";
import AppTextArea from "../../../components/forms/AppTextArea";
import AppTextInput from "../../../components/forms/AppTextInput";
import { AyurvedaRemedyDropdownValues } from "../drowdownItems";
import { ayurvedaState } from "../../../(public)/AyurvedaSession";
//import { AppMultiDropdown, AppSingleDropdown } from "./InterviewTab";
import AppMultiDropdown from "../../../components/forms/AppMultiDropdown";
import AppSingleDropdown from "../../../components/forms/AppSingleDropdown";
import RemedyFields from "./RemedyFields";
import { inspectionAndExaminationDropdownValues } from "../drowdownItems";
const validationSchema = Yup.object().shape({});

const AyurvedaTreatmentTab = ({ handleSubmitToDB, aMateriaMedic }) => {
  const { AyurvedaTreatment,isEdit } = useSnapshot(ayurvedaState);
  const { isTablet } = useSnapshot(state);
  const { datadosage, dataRemedy, dataUnit } = AyurvedaRemedyDropdownValues;
  const { principleTreatment } = inspectionAndExaminationDropdownValues;

  const initialValues = {
    ayurvedaDiagnosis: AyurvedaTreatment ? AyurvedaTreatment.ayurvedaDiagnosis : "",
    principleTreatment: AyurvedaTreatment
      ? AyurvedaTreatment.principleTreatment
      : [],
    treatmentNote: AyurvedaTreatment ? AyurvedaTreatment.treatmentNote : "",
    remedy: AyurvedaTreatment ? AyurvedaTreatment.remedy : [{ materiaMedica: '', dosage: "", unit: "" }],
    dietTherapy: AyurvedaTreatment ? AyurvedaTreatment.dietTherapy : "",
    recommendation: AyurvedaTreatment ? AyurvedaTreatment.recommendation : "",
  };

  const handleSubmit = async (values) => {
    const filterd = {
      ...values,
      remedy: values.remedy.map((r) => {
        return {
          ...r,
          dosage: Number(r.dosage)
        }
      })
    };
    ayurvedaState.AyurvedaTreatment = filterd;
    ayurvedaState.isAyurvedaTreatment = true;
    ayurvedaState.tabName = "";
    handleSubmitToDB();
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, errors }) => (

          <View style={styles.container}>
            <Text style={styles.subtitle}>Differentiation</Text>
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
              style={[styles.button, { width: isTablet ? 300 : "100%" }]}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonTitle}>
                Click for suggested remedy from the site
              </Text>
            </TouchableOpacity>


            <Text style={[styles.subtitle, { marginVertical: 16 }]}>
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

            {!ayurvedaState.isMedical && (
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
                  ayurvedaState.tabName = "inspectionAndExamination";
                }}
              />
              {isEdit && <Button
                style={[
                  {
                    width: isTablet ? 150 : "25%",
                    marginRight: isTablet ? 10 : null,
                  },
                  !ayurvedaState.isMedical && { backgroundColor: "#aaa" },
                ]}
                textStyle={{ fontSize: 16 }}
                title="Save"
                onPress={ayurvedaState.isMedical ? handleSubmit : null}
              />}
              <Button
                style={{ width: isTablet ? 150 : "40%" }}
                textStyle={{ fontSize: 12 }}
                title="File Attachment"
                onPress={() => { ayurvedaState.tabName = "fileAttachment" }}
              />
            </View>
          </View>
        )}
      </Formik>
    </>

  );
};

export default AyurvedaTreatmentTab;

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
});