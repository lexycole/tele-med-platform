import "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import {Image, SafeAreaView, StatusBar, StyleSheet, Text, View, Button, TextInput} from "react-native";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import { getPatients, savePatient } from '../lib/api';
import { Navbar } from "../components";
import { ErrorMessage, Form, FormDatePicker, FormField, FormPicker, FormSingleImagePicker, SubmitButton } from "../components/forms";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import ActivityIndicator from "../components/ActivityIndicator";


const validationSchema = Yup.object().shape({
  patient: Yup.string().required().label("Patient is required"),
  prefix: Yup.string().optional().label("prefix"),
  imageSrc: Yup.mixed().nullable().label("Image"),
  dateBirth: Yup.mixed().nullable().label("Image"),
});

const OperationsExpense = ({ route, navigation }) => {
  const [selected, setSelected] = useState({});
  const [error, setError] = useState();
  const [patientOptions, setPatientOptions] = useState([]);
  const { goBack } = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const populatePatients = async () => {
    try {
      setIsLoading(true);
      const response = await getPatients(); 
      if (response && response.data && Array.isArray(response.data)) {
        const options = response.data.map((patient) => ({
          label: `${patient.firstName} ${patient.lastName}`,
          value: patient.id, 
        }));
        // console.log('Setting patient options:', options);
        setPatientOptions(options);
      } else {
        console.error('Unexpected patient data structure:', response);
        setPatientOptions([]);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError("An error occurred while loading patients.");
      setPatientOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    populatePatients();
    setSelected({});  
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await populatePatients();
  //     } catch (error) {
  //       setError("An error occurred while loading data.");
  //       console.log('Error in useEffect:', error);
  //     }
  //   };
  
  //   fetchData();
  //   setSelected({});  
  // }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('Form Submitted Values:', values);
    try {
      const response = await savePatient(values);
      if (response.status === 201 || response.status === 200) {
        goBack();
      } else {
        setErrors({ submit: 'Failed to save patient. Please try again.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: error.message || 'An error occurred while saving the patient.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator visible={true} />;
  }

  return (
    <>
      <View style={styles.Container}>
        <KeyboardAwareScrollView>
          <SafeAreaView />
          <StatusBar />
          <Navbar
            onPress={() => goBack()}
            Text={`${selected && selected._id ? "Update" : "Add"} expense`}
          />
          <View style={styles.sideImge}>
            <Image
              style={styles.imgeContainer}
              source={require("../assets/icons/logo.png")}
            />
          </View>
          <View style={styles.loginScreen}>
            <Text style={styles.headingText}>{`${selected._id ? "Update" : "New"} expense`}</Text>
            <Text style={styles.headingText2}>{`Please fill the form to ${selected && selected._id ? "update" : "create"} your account.`} </Text>
            <View style={styles.TextinputFields}>

            <Formik
              initialValues={{
                patient: '',
                prefix: '',
                dateBirth: null,
                imageSrc: null,
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <View>
                  <FormPicker
                    name="patient"
                    items={patientOptions}
                    textInputPlaceholder="Select Patient"
                    mode="flat"
                    onValueChange={(name, value) => {
                      setFieldValue(name, value);
                      console.log(`Selected patient: ${value}`);
                    }}
                  />

                  <FormField
                    Header={"Prefix"}
                    img={require("../assets/icons/user.png")}
                    placeholder="prefix"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="prefix"
                    onChangeText={(value) => {
                      setFieldValue('prefix', value);
                      console.log('Prefix Value: ', value)
                    }}
                  />

              <FormSingleImagePicker 
                  name="imageSrc" 
                  onChangeImage={(name, uri) => {
                    console.log(`Image changed for ${name}: ${uri}`);
                    setFieldValue(name, uri);
                    
                  }}
                />

                <FormDatePicker
                  left={
                    <Icon
                      name="calendar"
                      size={18}
                      style={{ alignSelf: "center" }}
                    />
                  }
                  name="dateBirth"
                  textStyle={{
                    paddingVertical: 4,
                    paddingHorizontal: 24,
                    borderColor: "grey",
                    borderRadius: 8,
                    borderWidth: 1,
                  }}
                  defaultDate="1992-10-01"
                  maxYears="0"
                  minYears="130"
                  onDateChange={(name, value) => {
                    setFieldValue(name, value.toISOString());
                    console.log(`Date changed for ${name}: ${value.toISOString()}`);
                  }}
                />

                  <SubmitButton onPress={handleSubmit} txt="Submit" />
                </View>
              )}   
            </Formik>

        {/* <Formik
            initialValues={{ email: '' }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
              <View style={{padding:20}}> 
              <Text style={styles.heading}>Select Paid To</Text>
             
              
              </View>
             
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            )}
          </Formik> */}

            {/* <Formik
                initialValues={{
                  patient: '',
                  prefix:  '',
                  dateBirth: null,
                  imageSrc:  null,
                }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                {({ handleSubmit }) => (
            <Form
                onSubmit={handleSubmit}
              >
                <ErrorMessage error={error} visible={error} />
                <View>
                  <View style={{padding:20}}> 
                  <Text style={styles.heading}>Select Paid To</Text>
                  {isLoading ? (
                    <ActivityIndicator visible={true} />
                  ) : (
                    <FormPicker
                      name="patient"
                      items={patientOptions}
                      textInputPlaceholder="Select Paid To"
                      mode="flat"
                    />
                  )}
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      margin: 8,
                      borderWidth: 1,
                      borderColor: "#888",
                      borderRadius: 16,
                      paddingVertical: 16,
                      marginTop: 20
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: "#f6f6f6",
                        paddingHorizontal: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        top: -18,
                        left: 24,
                      }}
                    >
                      <Icon name="credit-card" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personalia
                      </Title>
                    </View>
                    <Text>Avatar:</Text>
                    <FormSingleImagePicker name="imageSrc" />
                    <FormField
                      Header={"Prefix"}
                      img={require("../assets/icons/user.png")}
                      placeholder="prefix"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="prefix"
                    />
                    <Text style={{ marginBottom: 5 }}>Date of Birth:</Text>
                    <FormDatePicker
                      left={
                        <Icon
                          name="calendar"
                          size={18}
                          style={{ alignSelf: "center" }}
                        />
                      }
                      name="dateBirth"
                      textStyle={{
                        paddingVertical: 4,
                        paddingHorizontal: 24,
                        borderColor: "grey",
                        borderRadius: 8,
                        borderWidth: 1,
                      }}
                      defaultDate="1992-10-01"
                      maxYears="0"
                      minYears="130"
                    //onDateChange={(value) => console.log("Date:", value)}
                    />
                  </View>
                </View>                 
                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                  >
                  <SubmitButton onPress={handleSubmit} txt={selected && selected._id ? "Update" : "Submit"} />
                </View>
              </Form>
              )}
              </Formik> */}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  Container: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  sideImge: {
    backgroundColor: "#003C75",
    width: "50%",
    height: h("15%"),
    marginTop: h("2%"),
    borderBottomRightRadius: h("10%"),
    borderTopRightRadius: h("10%"),
    justifyContent: "center",
    alignItems: "flex-end",
  },
  imgeContainer: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  loginScreen: {
    // backgroundColor: 'red',
    width: "100%",
    marginTop: h("2%"),
  },
  headingText: {
    fontSize: h("3.8%"),
    color: "black",
    marginLeft: h("2.2%"),
    marginTop: h("2%"),
  },
  headingText2: {
    color: "#0007",
    fontSize: h("2%"),
    marginLeft: h("2.2%"),
  },
  TextinputFields: {
    width: "100%",
    // alignItems: "center",
    marginTop: h("3%"),
  },
  Forgotbutton: {
    marginTop: h("2%"),
  },
  ForgotbuttonText: {
    color: "#0007",
    fontSize: h("2.2%"),
    marginLeft: h("2%"),
  },
  RegisterScreen: {
    width: "100%",
    alignItems: "center",
    // backgroundColor: 'green',
  },
  Register: {
    width: "42%",
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  RegisterText: {
    color: "black",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  DoctorText: {
    color: "black",
    fontSize: h("2%"),
  },
  heading: {
    fontSize: h('2.2%'),
    color: "black",
    fontWeight: "bold",
    marginBottom:10
  }
});

export default OperationsExpense;
