import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import {Image, SafeAreaView, StatusBar, StyleSheet, Text, View, } from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { getCOAs, getPatients, savePatient } from '../lib/api';
import { Navbar } from "../components";
import ActivityIndicator from "../components/ActivityIndicator";
import { ErrorMessage, Form, FormDatePicker, FormField, FormPicker, FormSingleImagePicker, SubmitButton } from "../components/forms";
import useApi from "../hooks/useApi";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";


const validationSchema = Yup.object().shape({
  patient: Yup.string().required().label("Patient is required"),
  prefix: Yup.string().optional().label("prefix"),
  firstName: Yup.string().required().label("First Name"),
  initials: Yup.string().optional().label("initials"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  dateBirth: Yup.date().required().label("Day of Birth").nullable(),
  gender: Yup.string().required().label("gender"),
  address1: Yup.string().required().label("Adress 1"),
  address2: Yup.string().optional().label("Adress 2"),
  address3: Yup.string().optional().label("Adress 3"),
  zip: Yup.string().optional().label("Zip Code"),
  city: Yup.string().optional().label("City"),
  state: Yup.string().optional().label("State"),
  country: Yup.string().required().label("Country"),
  phone: Yup.string().required().label("Phone"),
  mobile: Yup.string().optional().label("Mobile"),
  productName: Yup.string().optional().label("Product Name"),
  price: Yup.string().optional().label("Price"),
  size: Yup.string().optional().label("Size"),
  amount: Yup.string().optional().label("Amount"),
  quantity: Yup.string().optional().label("Quantity"),
  reference: Yup.string().optional().label("Reference"),
  note: Yup.string().optional().label("Note"),
  status: Yup.string().optional().label("Status"),

  imageSrc: Yup.mixed().nullable().label("Image"),
});
// console.log('validation Schema: ', validationSchema)
const statusOptions = [
  { label: 'Active', value: "active" },
  { label: 'Pending', value: 'pending' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Paid', value: 'paid' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'New', value: 'new' },
  { label: 'Canceled', value: 'canceled' }

]
const currencyOptions = [
  { value: "EUR", label: "Euro €" },
  { value: "USD", label: "USD $" },
  { value: "CNY", label: "CNY ¥" },
  { value: "GBP", label: "GBP £" },
  { value: "JPY", label: "JPY ¥" },
  { value: "INR", label: "INR ₹" },
  { value: "CAD", label: "CAD $" },
  { value: "AUD", label: "AUD $" },
  { value: "ZAR", label: "ZAR" },
  { value: "CHF", label: "CHF" },
  { value: "KRW", label: "KRW ₩" },
  { value: "RUB", label: "RUB руб" },
  { value: "BRL", label: "BRL R$" },
  { value: "SAR", label: "SAR ﷼" },
  { value: "MXN", label: "MXN $" },
  { value: "HKD", label: "HKD $" },
  { value: "SGD", label: "SGD $" },
  { value: "ILS", label: "ILS ₪" },
  { value: "QAR", label: "QAR ﷼" },
  { value: "TRY", label: "TRY ₺" },
  { value: "VND", label: "VND ₫" },
];

const OperationsExpense1 = ({ route, navigation }) => {
  const [selected, setSelected] = useState({});
  const [error, setError] = useState();
  const [patientOptions, setPatientOptions] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  // const { patients, loading } = useSelector((state) => state.patients);
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  
  const populateExpenses = async () => {
    try {
      const response = await getCOAs();
      if (response && response.data && Array.isArray(response.data)) {
        let Expenses = response.data.filter(coa => coa.category === "Expenses");
        setAllExpenses(
          Expenses.map((expense) => ({
            value: expense.name,
            label: expense.name,
          }))
        );
      } else {
        console.error('Unexpected COA data structure:', response);
      }
    } catch (error) {
      console.error('Error fetching COAs:', error);
    }
  };

  const populatePatients = async () => {
    try {
      const response = await getPatients(); 
      console.log('Patients response:', response);
      if (response && response.data && Array.isArray(response.data)) {
        const options = response.data.map((patient) => ({
          label: `${patient.firstName} ${patient.lastName}`,
          value: patient.id, 
        }));
        console.log('Setting patient options:', options);
        setPatientOptions(options);
      } else {
        console.error('Unexpected patient data structure:', response);
        setPatientOptions([]);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatientOptions([]);
    }
  };

  useEffect(() => {
    populatePatients();
  }, []);
  // const populatePatients = async () => {
  //   try {
  //     const response = await getPatients(); 
  //     console.log('patients response:', response)
  //     if (response && response.data && Array.isArray(response.data)) {
  //       setPatientOptions(
  //         response.data.map((patient) => ({
  //           label: `${patient.firstName} ${patient.lastName}`,
  //           value: patient.id, 
  //         }))
  //       );
  //     } else {
  //       console.log('Unexpected patient data structure:', response);
  //     }
  //   } catch (error) {
  //     console.log('Error fetching patients:', error);
  //   }
  // };

  useEffect(() => {
    fetchPatientOptions().then(options => {
      setPatientOptions(options);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await populateExpenses();
        // await populatePatients();
      } catch (error) {
        setError("An error occurred while loading data.");
        console.log('Error in useEffect:', error);
      }
    };
  
    fetchData();
    setSelected({});  
  }, []);


  const {
    _id = '',
    prefix = '',
    firstName = '',
    lastName = '',
    dateBirth = null,
    gender = '',
    mobile = '',
    imageSrc = null,
    productName = '',
    quantity = '',
    price = '',
    amount = '',
    currency = '',
    reference = '',
    note = '',
    status = ''
  } = selected || {};

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('Form Submitted Values:', values);
    try {
      await savePatient(values);
      goBack();
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  // useEffect(() => {
  //   console.log('Initial form values2:', {
  //     firstName: '',
  //     lastName:  '',
  //     dateBirth: null,
  //     imageSrc: null,
  //     gender:'',
  //     prefix: '',
  //     mobile: '',
  //     productName:  '',
  //     quantity: '',
  //     price: '',
  //     amount: '',
  //     currency:'',
  //     reference:  '',
  //     note: ''
  //   });
  // }, [selected]); 

  // const handleSubmit = (values) => {
    // try {
    //   console.log('_id', _id)
    //   if (selected && selected._id) {
    //     submitData["_id"] = selected._id;
    //   }
    //   console.log('before result')
    //   const result = await savePatient(submitData);
    //   console.log("result: ", result.ok);
    //   console.log("result: ", result.data);
    //   if (!result.ok) {
    //     if (result.data) setError(result.data.error);
    //     else {
    //       setError("An unexpected error occurred! ");
    //       console.log(result);
    //     }
    //     return;
    //   }
    //   //if registration is success
    //   goBack();
      
    // } catch (error) {
    //   console.log("submit data error exception:  ", error);
    // }
  // };



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
          {/* <ActivityIndicator
            visible={expenseApi.loading || getCountriesApi.loading}
          /> */}

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
                  patient:'',
                  prefix:  '',
                  firstName:  '',
                  lastName:  '',
                  dateBirth: null,
                  imageSrc:  null,
                  gender:  '',
                  mobile: '',
                  productName:  '',
                  price:  '',
                  quantity: '',
                  amount:  '',
                  currency:  '',
                  reference: '',
                  note: '',
                  status: '',
                  
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
                  <FormPicker
                    //label="Simple dropdown with avatar"
                    textInputPlaceholder="Select Paid To"
                    data={patientOptions}
                    mode="flat"
                    name="patient"
                  />
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

                    <FormField
                      Header={"First Name"}
                      img={require("../assets/icons/user.png")}
                      placeholder="First Name"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="firstName"
                    />

                    <FormField
                      Header={"Last Name"}
                      img={require("../assets/icons/user.png")}
                      placeholder="Last Name"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="lastName"
                    />
                    <FormField
                      Header={"Mobile"}
                      img={require("../assets/icons/phone.png")}
                      placeholder="Mobile Phone"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="mobile"
                    />
                    <FormField
                      Header={"Gender"}
                      img={require("../assets/icons/gender.png")}
                      placeholder="gender"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="gender"
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
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
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
                    {/* img={require("../assets/icons/bank2.png")}				  
                  //  <Icon name="lock" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Add Product
                    </Title>
                  </View>
                  <View style={{ width: '75%', marginTop: 20 }}>
                    <Text style={styles.heading}>Select Product</Text>

                    <FormPicker
                      textInputPlaceholder="Select Product"
                      data={allExpenses}
                      mode="flat"
                      name="productName"


                    />
                  </View>
                  <FormField
                    Header={"Product Name"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Product Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="productName"
                  />
                  <FormField
                    Header={"Price"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Price"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="price"
                  />
                  <FormField
                    Header={"Quantity"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Quantity"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="quantity"
                  />
                  <FormField
                    Header={"Amount"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Amount"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="amount"
                  />

                  <View style={{ width: '75%', marginTop: 20 }}>
                    <Text style={styles.heading}>Currency</Text>
                    <FormPicker
                      // label="Currency"
                      textInputPlaceholder="Select Currency"
                      data={currencyOptions}
                      mode="flat"
                      name="currency"
                    />
                  </View>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
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
                    {/* <Icon name="fingerprint" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Reference
                    </Title>
                  </View>

                  <FormField
                    Header={"Reference"}
                    img={require("../assets/icons/fingerprint.png")}
                    placeholder="Enter Reference"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="reference"
                  />

                </View>

                <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                    marginTop: 16,
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
                    {/* <Icon name="membership" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Note
                    </Title>
                  </View>
                  <FormField
                    Header={"Enter Note"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="Enter Note"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="note"
                  />

                </View>
                <View
                  style={{
                    // alignItems: "center",
                    margin: 8,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                    marginTop: 16,
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
                    {/* <Icon name="license1" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Status
                    </Title>
                  </View>

                  <FormPicker
                    //label="Simple dropdown with avatar"
                    textInputPlaceholder="Select Status"
                    data={statusOptions}
                    mode="flat"
                    name="status"
                    style={{ width: '80%', alignSelf: "center", marginVertical: 15 }}
                    
                  />
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
              </Formik>
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
  // container: {
  //   paddingTop: 30,
  //   marginLeft: 20,
  //   marginRight: 20,
  //   flex: 1,
  // },
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

export default OperationsExpense1;