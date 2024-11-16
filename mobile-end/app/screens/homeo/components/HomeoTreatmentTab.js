import { useFormik, Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../../_layout";
import Button from "../../../components/forms/AppSubmitButton";
import AppTextArea from "../../../components/forms/AppTextArea";
import AppTextInput from "../../../components/forms/AppTextInput";
import { homeoTreatmentDropdownValues, inspectionAndExaminationDropdownValues } from "../drowdownItems";
import { homeoState } from "../../../(public)/HomeoPathySession";
// import AppMultiDropdown from "../../../../src/components/forms/AppMultiDropdown";
// import AppSingleDropdown from "../../../../src/components/forms/AppSingleDropdown";
import RemedyFields from "./RemedyFields";

const validationSchema = Yup.object().shape({});

const HomeoTreatmentTab = ({ handleSubmitToDB, aMateriaMedic }) => {
  const { HomeoTreatment,isEdit } = useSnapshot(homeoState);
  const { isTablet } = useSnapshot(state);
  //const { dataPotency, dataRemedy, dataUnit } = homeoTreatmentDropdownValues;
  const { dataPotency, dataUnit } = homeoTreatmentDropdownValues;
  // const { principleTreatment } = inspectionAndExaminationDropdownValues

  // const { handleChange, handleSubmit, values } = useFormik({
  //   validationSchema: validationSchema,
  //   initialValues: {
  //     homeoDiagnosis: HomeoTreatment ? HomeoTreatment.homeoDiagnosis : "",
  //     principleTreatment: HomeoTreatment
  //       ? HomeoTreatment.principleTreatment
  //       : "",
  //     treatmentNote: HomeoTreatment ? HomeoTreatment.treatmentNote : "",
  //     remedy: HomeoTreatment ? HomeoTreatment.remedy[0]?.materiaMedica : "",
  //     potency: HomeoTreatment ? HomeoTreatment.remedy[0]?.potency : "",
  //     dietTherapy: HomeoTreatment ? HomeoTreatment.dietTherapy : "",
  //     recommendation: HomeoTreatment ? HomeoTreatment.recommendation : "",
  //   },
  //   onSubmit: async (values) => {
  //     const filterd = {
  //       ...values,
  //       remedy: [
  //         {
  //           materiaMedica: values.remedy,
  //           potency: values.potency,
  //         },
  //       ],
  //     };
  //     delete filterd.potency;
  //     homeoState.HomeoTreatment = filterd;
  //     homeoState.isHomeoTreatment = true;
  //     homeoState.tabName = "";
  //     handleSubmitToDB();
  //   },
  // });

  const initialValues = {
    homeoDiagnosis: HomeoTreatment ? HomeoTreatment.homeoDiagnosis : "",
    principleTreatment: HomeoTreatment ? HomeoTreatment.principleTreatment : "",
    treatmentNote: HomeoTreatment ? HomeoTreatment.treatmentNote : "",
    //remedy: HomeoTreatment ? HomeoTreatment.remedy[0]?.materiaMedica : "",
    //potency: HomeoTreatment ? HomeoTreatment.remedy[0]?.potency : "",
    remedy: HomeoTreatment ? HomeoTreatment.remedy : [{ materiaMedica: '', potency: "" }],
    dietTherapy: HomeoTreatment ? HomeoTreatment.dietTherapy : "",
    recommendation: HomeoTreatment ? HomeoTreatment.recommendation : "",
  };

  const handleSubmit = async (values) => {
    const filterd = {
      ...values,
      // remedy: [
      //   {
      //     materiaMedica: values.remedy,
      //     potency: values.potency,
      //   },
      // ],
      remedy: values.remedy
    };
    delete filterd.potency;
    homeoState.HomeoTreatment = filterd;
    homeoState.isHomeoTreatment = true;
    homeoState.tabName = "";
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
              label="Homeo Diagnosis :"
              placeholder="Your Homeo Diagnosis for patient..."
              value={values["homeoDiagnosis"]}
              onChangeText={handleChange("homeoDiagnosis")}
              editable={isEdit ? true : false}
            />
            {/* <AppMultiDropdown
              title="Principle Treatment :"
              placeholder="Your Treatment for patient..."
              options={principleTreatment}
              name="principleTreatment"
              isTablet={isTablet}
            value={values["principleTreatment"]}
            onChange={(value) => {
              setFieldValue("principleTreatment", value);
            }}
            /> */}
            <AppTextArea
              label="Principle Treatment :"
              placeholder="Your Treatment for patient..."
              value={values["principleTreatment"]}
              onChangeText={handleChange("principleTreatment")}
              editable={isEdit ? true : false}
            />
            <TouchableOpacity
              style={[styles.button, { width: isTablet ? 300 : "100%" }]}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonTitle}>
                Click for suggested remedy from the site
              </Text>
            </TouchableOpacity>

            <Text style={[styles.subtitle, { marginVertical: 16 }]}>
              Remedy Prescription
            </Text>
            <RemedyFields
              updateArray={(arr) => {
                console.log(arr);
                setFieldValue('remedy', arr);

              }}
              //setFieldlValue={setFieldValue}
              remedyInputs={values.remedy}
              values={values}
              //dataUnit={dataUnit} 
              dataRemedy={aMateriaMedic}
              dataPotency={dataPotency}
              isEdit={isEdit}
            />
            {/* <RemedyFields
              updateArray={(arr) => {
                console.log(arr);
                setFieldValue('remedy', arr);

              }}
              //setFieldlValue={setFieldValue}
              remedyInputs={values.remedy}
              values={values}
              dataUnit={dataUnit} dataRemedy={aMateriaMedic} /> */}


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

            {!homeoState.isMedical && (
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
                  homeoState.tabName = "inspectionAndExamination";
                }}
              />
              {isEdit && <Button
                style={[
                  {
                    width: isTablet ? 150 : "25%",
                    marginRight: isTablet ? 10 : null,
                  },
                  !homeoState.isMedical && { backgroundColor: "#aaa" },
                ]}
                textStyle={{ fontSize: 16 }}
                title="Save"
                onPress={homeoState.isMedical ? handleSubmit : null}
              />}
              <Button
                style={{ width: isTablet ? 150 : "40%" }}
                textStyle={{ fontSize: 12 }}
                title="File Attachment"
                onPress={() => { }}
              />
            </View>
          </View>

        )}
      </Formik>
    </>
  );
};

export default HomeoTreatmentTab;

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
