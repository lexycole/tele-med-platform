import "react-native-get-random-values";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button, IconButton } from "react-native-paper";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../_layout";
// import { getPatient, getPatients } from "../../../src/api/patients";
// import {
//   deletePhysicalcondition,
//   getPhysicalcondition,
//   getPhysicalconditions,
//   postPhysicalcondition,
//   updatePhysicalcondition,
// } from "../../../src/api/physicalconditions";
import AppTextArea from "../../components/forms/AppTextArea";
import AppTextInput from "../../components/forms/AppTextInput";
import { v4 } from "uuid";
import calculateBMI, { calculateBMICategory } from "../../utils/bmi/bmiclassification";
// import moment from "moment";

const validationSchema = Yup.object().shape({
  ethnicity: Yup.string(),
  age: Yup.string(),
  bloodPressure: Yup.string(),
  bloodGlucoseLevel: Yup.string(),
});

const AddOrUpdatePhysicalCondition = (props) => {
  const navigation = useNavigation();

  // const [visible, setVisible] = useState(true)
  // const [patientOptions, setPatientOptions] = useState([]);
  // const [finish, setFinish] = useState(false)
  // const {
  //   id,
  //   patientNo,
  //   // clinicNo,
  //   // doctorNo,
  //   age,
  //   ethnicity,
  //   cityOfBirth,
  //   weight,
  //   weightUnit,
  //   height,
  //   heightUnit,
  //   BMI,
  //   BMICategory,
  //   temperature,
  //   temperatureUnit,
  //   bloodPressure,
  //   bloodGroup,
  //   bloodGlucoseLevel,
  //   heartBeat,
  //   oxygenSaturation,
  //   redBloodCell,
  //   whiteBloodCell,
  //   Hgb,
  //   GSR,
  //   GSP,
  //   leftEyeSpherical,
  //   rightEyeSpherical,
  //   systolicBoodPressureNo,
  //   diastolicBloodPressureNo,
  //   // appointmentType,
  //   // sessionType,
  //   note,
  //   // date: new Date(),
  //   // status
  // } = props.route.params.selectedPhysicalCondition;
  // const initialEthnicity = ethnicity ? ethnicity : ""
  // const initialCityOfBirth = cityOfBirth ? cityOfBirth.toString() : ""

  // const {
  //   handleChange,
  //   handleSubmit,
  //   handleBlur,
  //   setFieldValue,
  //   resetForm,
  //   values,
  //   errors,
  //   touched,
  // } = useFormik({
  //   initialValues: {
  //     patientNo: patientNo ? patientNo : "",
  //     age: age ? age.toString() : "",
  //     ethnicity: ethnicity ? ethnicity : "",
  //     cityOfBirth: cityOfBirth ? cityOfBirth.toString() : "",
  //     weight: weight ? weight.toString() : "",
  //     weightUnit: weightUnit ? weightUnit : "kg",
  //     height: height ? height.toString() : "",
  //     heightUnit: heightUnit ? heightUnit : "cm",
  //     BMICategory: BMICategory ? BMICategory : "",
  //     BMI: BMI ? BMI.toString() : "",

  //     temperature: temperature ? temperature.toString() : "",
  //     temperatureUnit: temperatureUnit ? temperatureUnit.toString() : "Celcius",
  //     bloodPressure: bloodPressure ? bloodPressure.toString() : "",
  //     bloodGroup: bloodGroup ? bloodGroup : "",
  //     bloodGlucoseLevel: bloodGlucoseLevel ? bloodGlucoseLevel.toString() : "",
  //     heartBeat: heartBeat ? heartBeat.toString() : "",
  //     oxygenSaturation: oxygenSaturation ? oxygenSaturation.toString() : "",
  //     redBloodCell: redBloodCell ? redBloodCell.toString() : "",
  //     whiteBloodCell: whiteBloodCell ? whiteBloodCell.toString() : "",
  //     Hgb: Hgb ? Hgb.toString() : "",
  //     GSR: GSR ? GSR.toString() : "",
  //     GSP: GSP ? GSP.toString() : "",
  //     leftEyeSpherical: leftEyeSpherical ? leftEyeSpherical.toString() : "",
  //     rightEyeSpherical: rightEyeSpherical ? rightEyeSpherical.toString() : "",
  //     systolicBoodPressureNo: systolicBoodPressureNo ? systolicBoodPressureNo.toString() : "",
  //     diastolicBloodPressureNo: diastolicBloodPressureNo ? diastolicBloodPressureNo.toString() : "",
  //     note: note ? note.toString() : "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: async (values) => {
  //     let filter = { ...values };
  //     filter.whiteBloodCell = Number(filter.whiteBloodCell)
  //     filter.redBloodCell = Number(filter.redBloodCell)
  //     filter.BMI = Number(filter.BMI)
  //     filter.leftEyeSpherical = Number(filter.leftEyeSpherical)
  //     filter.rightEyeSpherical = Number(filter.rightEyeSpherical)

  //     if (id) {
  //       if (initialCityOfBirth !== values["cityOfBirth"] || initialEthnicity !== values["ethnicity"]) {
  //         const { data } = await getPhysicalconditions()
  //         const currentPhusicalCondition = await getPhysicalcondition(id)
  //         const filteredPhysicalConditions = data.filter((e) => e.patientNo._id === currentPhusicalCondition.data.patientNo._id && e._id !== id)
  //         for (const item of filteredPhysicalConditions) {
  //           item.ethnicity = values["ethnicity"]
  //           item.cityOfBirth = values["cityOfBirth"]
  //           item.bloodGroup = values["bloodGroup"]
  //           item.patientNo = item.patientNo._id
  //           item.leftEyeSpherical = item.optical.leftEyeSpherical,
  //           item.rightEyeSpherical = item.optical.rightEyeSpherical,
  //           delete item.optical;
  //           const itemId = item._id
  //           delete item._id;
  //           delete item.__v;
  //           await updatePhysicalcondition(itemId, item);
  //         }
  //       }
  //       await updatePhysicalcondition(id, filter);
  //       hideModal();
  //     } else {
  //       await postPhysicalcondition(filter);
  //       hideModal();
  //     }
  //   },
  // });

  // const hideModal = async () => {
  //   resetForm();
  //   setVisible(false);
  //   navigation.navigate("PhysicalConditions")
  //   props.route.params.callForPhysicalConditions()
  // };

  // const getPatientsForSelect = async () => {
  //   const { ok, data } = await getPatients();
  //   if (ok) {
  //     const filter = data.map((patient) => ({
  //       label: `${patient.patients.contactName.first} ${patient.patients.contactName.last}`,
  //       value: patient._id,
  //     }));

  //     setPatientOptions(filter);
  //   }
  // };
  // const getPatientInfos = async () => {
  //   const { ok, data } = await getPhysicalconditions();
  //   if (ok) {
  //     const filter = data.filter((item) => item.patientNo._id === values["patientNo"])[0];

  //     setFieldValue("ethnicity", filter.ethnicity)
  //     setFieldValue("cityOfBirth", filter.cityOfBirth)
  //     setFieldValue("bloodGroup", filter.bloodGroup)


  //   }
  // };
  const { isTablet } = useSnapshot(state);

  // useEffect(() => {
  //   getPatientsForSelect();
  //   //return () => { };
  // }, []);

  // useEffect(() => {
  //   !id && getPatientInfos()
  // }, [values["patientNo"]])

  return (
    <Modal isVisible={visible} onModalHide={hideModal} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text>{id ? "Update" : "Add"} PhysicalCondition</Text>
        <IconButton onPress={hideModal} icon="close" />
      </View>
      {/* inputs */}
      <ScrollView style={styles.inputsContainer}>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>Patient</Text>
          <Dropdown
            textInputPlaceholder={"Select Patient"}

            // data={patientOptions}
            value={values["patientNo"]}
            // onChange={
            //   async (text) => {
            //     setFieldValue("patientNo", text)
            //     console.log("text " + text)
            //     const patient = await getPatient(text)
            //     const formattedMoment = moment(patient.data[0].dateBirth).format("YYYY/MM/DD");
            //     const birthDate = moment(formattedMoment, "YYYY/MM/DD").toDate();

            //     const now = new Date();
            //     const ageInMs = now.getTime() - birthDate.getTime();

            //     const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
            //     setFieldValue("age", ageInYears.toFixed(0))

            //   }
            // }
            mode="outlined"
          />
        </View>

        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Ethnicity </Text>
          <AppTextInput
            placeholder="Enter Ethnicity of patient"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["ethnicity"]}
            onChangeText={handleChange("ethnicity")}
            onBlur={handleBlur("ethnicity")}
            error={errors.ethnicity}
            touched={touched.ethnicity}
          // onSubmitEditing={() => symptoms.current?.focus()}
          />
        </View>

        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>{"age "}</Text>
          <AppTextInput
            placeholder="Enter age"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            maxLength={3}
            value={values["age"]}
            onChangeText={handleChange("age")}
            onBlur={handleBlur("age")}
            error={errors.age}
            touched={touched.age}
          />
        </View>

        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>City Of Birth</Text>
          <AppTextInput
            placeholder="Enter City Of Birth"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["cityOfBirth"]}
            onChangeText={handleChange("cityOfBirth")}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: isTablet ? null : "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: isTablet ? 0 : 16,
          }}
        >
          <AppTextInput
            label="Height"
            placeholder="Height"
            value={values["height"]}
            keyboardType="decimal-pad"
            onChangeText={
              (text) => {
                setFieldValue("height", text)
                if (values["weight"] && values["heightUnit"] && values["weightUnit"]) {
                  const bmi = calculateBMI(values["weight"], text, values["heightUnit"], values["weightUnit"]).toString();
                  setFieldValue("BMI", bmi);
                  setFieldValue("BMICategory", calculateBMICategory(bmi))

                }

              }
            }
            containerStyle={{
              width: "45%",
              marginHorizontal: 0,
              marginBottom: 0,
            }}
          />
          <View
            style={{
              height: 58,
              width: "45%",
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

              value={values["heightUnit"]}
              onChange={
                (value) => {
                  setFieldValue("heightUnit", value)
                  if (values["weightUnit"] && values["weight"] && values["height"]) {
                    const bmi = calculateBMI(values["weight"], values["height"], value, values["weightUnit"]).toString();
                    setFieldValue("BMI", bmi);
                    setFieldValue("BMICategory", calculateBMICategory(bmi))

                  }

                }
              }
              mode="outlined"
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
            width: "100%",
            marginBottom: isTablet ? 0 : 16,
          }}
        >
          <AppTextInput
            label="Weight"
            placeholder="Weight"
            keyboardType="decimal-pad"
            value={values["weight"]}
            onChangeText={
              (text) => {
                setFieldValue("weight", text)

                if (values["height"] && values["heightUnit"] && values["weightUnit"]) {
                  const bmi = calculateBMI(text, values["height"], values["heightUnit"], values["weightUnit"]).toString();
                  setFieldValue("BMI", bmi);
                  setFieldValue("BMICategory", calculateBMICategory(bmi))

                }

              }
            }

            containerStyle={{
              width: "45%",
              marginBottom: 0,
            }}
          />
          <View
            style={{
              height: 58,
              width: "45%",
              marginTop: 12,
            }}
          >
            <Dropdown
              textInputPlaceholder="Select Value"
              data={[
                { id: `${v4()}`, value: "kg", label: "kg" },
                { id: `${v4()}`, value: "lbs", label: "lbs" },
              ]}
              value={values["weightUnit"]}
              onChange={
                (value) => {
                  setFieldValue("weightUnit", value)

                  if (values["height"] && values["weight"] && values["heightUnit"]) {
                    const bmi = calculateBMI(values["weight"], values["height"], values["heightUnit"], value).toString();
                    setFieldValue("BMI", bmi);
                    setFieldValue("BMICategory", calculateBMICategory(bmi))

                  }
                }
              }
              mode="outlined"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: isTablet ? null : "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: isTablet ? 0 : 16,
          }}
        >
          <AppTextInput
            label="Temperature"
            placeholder="Temperature"
            keyboardType="decimal-pad"
            value={values["temperature"]}
            onChangeText={handleChange("temperature")}
            containerStyle={{
              width: "45%",
              marginHorizontal: 10,
              marginBottom: 0,
            }}
          />
          <View
            style={{
              height: 58,
              width: "45%",
              marginTop: 12,
            }}
          >
            <Dropdown
              textInputPlaceholder="Select Value"
              data={[
                { id: `${v4()}`, value: "Celcius", label: " °C" },
                { id: `${v4()}`, value: "Fahrenheit", label: " °F" },
              ]}
              value={values["temperatureUnit"]}
              onChange={handleChange("temperatureUnit")}
              mode="outlined"
            />
          </View>
        </View>


        <View
          style={{
            flexDirection: "row",
            justifyContent: isTablet ? null : "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: isTablet ? 0 : 16,
          }}
        >
          <AppTextInput
            label="BMI "
            placeholder="BMI "
            keyboardType="decimal-pad"
            value={values["BMI"]}
            onChangeText={
              handleChange("BMI")
            }
            containerStyle={{
              width: "45%",
            }}
          // editable={false}
          />
          <AppTextInput
            label="BMICategory" placeholder="BMICategory"
            value={values["BMICategory"]}
            onChangeText={handleChange("BMICategory")}
            containerStyle={{
              width: "45%",
            }}
          // editable={false}
          />
        </View>


        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>{"BloodPressure"}</Text>
          <AppTextInput
            placeholder="Enter BloodPressure"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["bloodPressure"]}
            onChangeText={handleChange("bloodPressure")}
            onBlur={handleBlur("bloodPressure")}
            error={errors.bloodPressure}
            touched={touched.bloodPressure}
          />
        </View>

        <View style={{ marginBottom: 10, flex: 1 }}>
          <Text>BloodGroupe</Text>
          <Dropdown
            textInputPlaceholder="Select BloodGroupe"
            data={[
              { value: "Aplus", label: "A+" },
              { value: "Aminus", label: "A-" },
              { value: "Bplus", label: "B+" },
              { value: "Bminus", label: "B-" },
              { value: "ABplus", label: "AB+" },
              { value: "ABminus", label: "AB-" },
            ]}
            value={values["bloodGroup"]}
            onChange={handleChange("bloodGroup")}
            mode="outlined"
          />
        </View>

        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>{"BloodGlucoseLevel"}</Text>
          <AppTextInput
            placeholder="Enter BloodGlucoseLevel"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["bloodGlucoseLevel"]}
            onChangeText={handleChange("bloodGlucoseLevel")}
            onBlur={handleBlur("bloodGlucoseLevel")}
            error={errors.bloodGlucoseLevel}
            touched={touched.bloodGlucoseLevel}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>{"HeartBeat"}</Text>
          <AppTextInput
            placeholder="Enter HeartBeat"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["heartBeat"]}
            onChangeText={handleChange("heartBeat")}
          />
        </View>

        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>oxygenSaturation </Text>
          <AppTextInput
            placeholder="Enter oxygenSaturation "
            keyboardType="decimal-pad"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["oxygenSaturation"]}
            onChangeText={handleChange("oxygenSaturation")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>RedBloodCell </Text>
          <AppTextInput
            placeholder="Enter RedBloodCell "
            keyboardType="decimal-pad"

            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["redBloodCell"]}
            onChangeText={handleChange("redBloodCell")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>WhiteBloodCell </Text>
          <AppTextInput
            placeholder="Enter WhiteBloodCell "
            keyboardType="decimal-pad"

            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["whiteBloodCell"]}
            onChangeText={
              handleChange("whiteBloodCell")
            }
          />
        </View>

        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>{"Hgb"}</Text>
          <AppTextInput
            placeholder="Enter Hgb"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["Hgb"]}
            onChangeText={handleChange("Hgb")}
          />
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: isTablet ? 10 : 16,
        }}>
          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 5 }}>{"GSR"}</Text>
            <AppTextInput
              placeholder="Enter GSR"
              keyboardType="decimal-pad"
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel=">"
              value={values["GSR"]}
              onChangeText={handleChange("GSR")}
            />
          </View>
          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 5 }}>{"GSP"}</Text>
            <AppTextInput
              placeholder="Enter GSP"
              keyboardType="decimal-pad"
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel=">"
              value={values["GSP"]}
              onChangeText={handleChange("GSP")}
            />
          </View>
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>{"Systolic Bood Pressure No"}</Text>
          <AppTextInput
            placeholder="Enter Systolic Bood Pressure No"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["systolicBoodPressureNo"]}
            onChangeText={handleChange("systolicBoodPressureNo")}
          />
        </View>
        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>
            {"Diastolic Blood Pressure No"}
          </Text>
          <AppTextInput
            placeholder="Enter Diastolic Blood Pressure No"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel=">"
            value={values["diastolicBloodPressureNo"]}
            onChangeText={handleChange("diastolicBloodPressureNo")}
          />
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: isTablet ? 10 : 16,
        }}>
          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 5 }}>{"leftEyeSpherical"}</Text>
            <AppTextInput
              placeholder="Enter leftEyeSpherical"
              keyboardType="decimal-pad"
              returnKeyType="next"
              returnKeyLabel=">"
              value={values["leftEyeSpherical"]}
              onChangeText={handleChange("leftEyeSpherical")}
            />
          </View>
          <View style={{ marginBottom: 10, width: "45%" }}>
            <Text style={{ marginBottom: 5 }}>{"rightEyeSpherical"}</Text>
            <AppTextInput
              placeholder="Enter rightEyeSpherical"
              keyboardType="decimal-pad"
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel=">"
              value={values["rightEyeSpherical"]}
              onChangeText={handleChange("rightEyeSpherical")}
            />
          </View>
        </View>



        <View style={{ marginBottom: 10, width: "100%" }}>
          <Text style={{ marginBottom: 5 }}>Note </Text>
          <AppTextArea
            placeholder="Enter note"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            numberOfLines={6}
            value={values["note"]}
            onChangeText={handleChange("note")}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
        <Button
          style={[{ flex: 2 }, id && { marginRight: 10 }]}
          mode="contained"
          theme={{
            colors: {
              primary: "#00B7DD",
            },
          }}
          onPress={handleSubmit}
        >
          Submit
        </Button>

      </View>
    </Modal>
  );
};

export default AddOrUpdatePhysicalCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  inputsContainer: {
    marginHorizontal: 10,
    maxHeight: "90%",
  },
  dateAndTimePicker: {
    width: "100%",
    height: 48,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
});