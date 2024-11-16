import "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import {Image, SafeAreaView, StatusBar, StyleSheet, Text, View, Button, TextInput} from "react-native";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import { Navbar } from "../components";
import { ErrorMessage, Form, FormDatePicker, FormField, FormPicker, FormSingleImagePicker, SubmitButton } from "../components/forms";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import ActivityIndicator from "../components/ActivityIndicator";
import { useRouter } from 'expo-router';
import { useAuthContext } from '../lib/authContext';
import { getPatients, savePatient, getCOAs, tokenCache } from '../lib/api';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';



const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required').label("First Name"),
  lastName: Yup.string().required('Last Name is required').label("Last Name"),
  birthDate: Yup.date().required('Birth Date is required').nullable().label("Birth Date"),
  imageSrc: Yup.mixed().required('Image is required').nullable().label("Image"),
  gender: Yup.string().required('Gender is required').label("Gender"),
  prefix: Yup.string().required('Prefix is required').label("Prefix"),
  mobile: Yup.string().required('Mobile is required').label("Mobile"),
  productName: Yup.string().required('Product Name is required').label("Product Name"),
  quantity: Yup.string().required('Quantity is required').label("quantity"),
  price: Yup.number().required('Price is required').label("Price"),
  amount: Yup.number().required('Amount is required').label("Amount"),
  currency: Yup.string().required('Currency is required').label("Currency"),
  reference: Yup.string().required('Reference is required').label("Reference"),
  status: Yup.string().required('Status is required').label("Status"),
  note: Yup.string().required('Note is required').label("Note"),
  patient: Yup.string().required().label("Patient"),
});


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

const OperationsExpense = ({ route, navigation }) => {
  // const { getToken, isSignedIn } = useAuthContext();


  const router = useRouter();
  const { goBack } = useNavigation();

  const [selected, setSelected] = useState({});
  const [error, setError] = useState();
  const [patientOptions, setPatientOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allExpenses, setAllExpenses] = useState([]);
 
  const { getToken } = useAuth();
  
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // First attempt to save patient
      console.log('Attempting to save patient');
      let response = await savePatient(values);
  
      if (!response.ok) {
        console.log('Save patient response not OK:', response.status);
        
        if (response.status === 401) {
          console.log('Token expired, attempting to refresh');
          try {
            const newToken = await getToken();  // Use getToken from context directly
            console.log('New token received:', newToken ? 'Yes' : 'No');
            
            if (newToken) {
              // Save the new token
              await tokenCache.saveToken('auth_token', newToken);
              
              // Retry the save operation with new token
              console.log('Retrying save patient with new token');
              response = await savePatient(values);
              
              if (response.ok) {
                console.log('Patient saved successfully after token refresh');
                goBack();
                return;
              } else {
                console.log('Retry save failed:', response.status);
                throw new Error('Failed to save patient after token refresh');
              }
            } else {
              console.log('Failed to get new token');
              throw new Error('Failed to get new token');
            }
          } catch (tokenError) {
            console.error('Token refresh failed:', tokenError);
            await tokenCache.deleteToken('auth_token');
            console.log('Token deleted, redirecting to login');
            // router.push('login');
            return;
          }
        }
        
        throw new Error(response.data?.message || 'Failed to save patient');
      }
  
      console.log('Patient saved successfully');
      goBack();
      
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
      console.log('Form submission completed');
    }
  };

  // const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  //   try {
  //     // if (!isSignedIn) {
  //     //   router.push('login');
  //     //   return;
  //     // }
  
  //     const response = await savePatient(values, getToken);
      
  //     if (!response.ok) {
  //       if (response.status === 401) {
  //         const newToken = await getToken();
  //         console.log('expense new token', newToken);
  //         if (newToken) {
  //           await tokenCache.saveToken('auth_token', newToken);
            
  //           // Directly get the new token from the cache
  //           const cachedToken = await tokenCache.getToken('auth_token');
  //           const retryResponse = await savePatient(values, () => cachedToken);
            
  //           if (retryResponse.ok) {
  //             goBack();
  //             return;
  //           }
  //         }
  //         // router.push('login');
  //         console.log('Saved successful to backend')
  //         return;
  //       }
  //       throw new Error(response.data?.message || 'Failed to save patient');
  //     }
      
  //     goBack();
  //   } catch (error) {
  //     console.error('Form submission error:', error);
  //     setErrors({ submit: error.message });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };



  // const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  //   console.log('handleSubmit function called with values:', values);
    
  //   try {
  //     console.log('Attempting to save patient...');
  //     const response = await savePatient(values);
  //     console.log('Save patient response:', response);

  //     if (response.status === 401) {
  //       // Handle unauthorized error
  //       console.log('Authentication error');
  //       // Redirect to login page or refresh token
  //       // For example:
  //       router.push('login');
  //       return;
  //     }
      
  //     if (response.status === 201 || response.status === 200) {
  //       console.log('Patient saved successfully');
  //       goBack();
  //     } else {
  //       console.log('Failed to save patient');
  //       setErrors({ submit: 'Failed to save patient. Please try again.' });
  //     }
  //   } catch (error) {
  //     console.error('Form submission error:', error);
  //     setErrors({ submit: error.message || 'An error occurred while saving the patient.' });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

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

  useEffect(() => {
    populatePatients();
    populateExpenses();
    setSelected({});  
  }, []);

  // const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  //   console.log('Form Submitted Values')
  //   console.log('Form Submitted Values:', values);
  //   try {
  //     const response = await savePatient(values);
  //     if (response.status === 201 || response.status === 200) {
  //       goBack();
  //     } else {
  //       setErrors({ submit: 'Failed to save patient. Please try again.' });
  //     }
  //   } catch (error) {
  //     console.error('Form submission error:', error);
  //     setErrors({ submit: error.message || 'An error occurred while saving the patient.' });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

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
                firstName: '',
                lastName:'',
                birthDate: null,
                imageSrc: null,
                gender: '',
                prefix: '',
                mobile: '',
                productName:'',
                quantity: '',
                price: '',
                amount: '',
                currency: '',
                reference: '',
                status: '',
                note: '',
                patient: ''
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              // onSubmit={handleSubmit}

              onSubmit={(values, formikBag) => {
                console.log('Formik onSubmit called with values:', values);
                handleSubmit(values, formikBag);
              }}
            >
              {({ values, setFieldValue,setFieldTouched,  errors, touched }) => (
                
                <>
                <View>
                  <ErrorMessage error={error} visible={error} />
                  <View style={{padding:20}}> 
                  <Text style={styles.heading}>Select Paid To</Text>
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
                  {errors.patient && touched.patient}
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
                      <Icon name="cash-register" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personalia
                      </Title>
                    </View>
                    <Text>Avatar:</Text>
                    <FormSingleImagePicker 
                      name="imageSrc" 
                      onChangeImage={(name, uri) => {
                        console.log(`Image changed for ${name}: ${uri}`);
                        setFieldValue(name, uri); 
                      }}
                    />
                    {errors.imageSrc && touched.imageSrc}
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
                    onBlur={() => setFieldTouched('prefix')} 
                  />
                  {errors.prefix && touched.prefix}

                   <FormField
                    Header={"First Name"}
                    img={require("../assets/icons/user.png")}
                    placeholder="First Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="firstName"
                    onChangeText={(value) => {
                      setFieldValue('firstName', value);
                      console.log('first Name: ', value)
                    }}
                    onBlur={() => setFieldTouched('firstName')} 
                  />
                  {errors.firstName && touched.firstName}

                  <FormField
                    Header={"Last Name"}
                    img={require("../assets/icons/user.png")}
                    placeholder="Last Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="lastName"
                    onChangeText={(value) => {
                      setFieldValue('lastName', value);
                      console.log('last Name: ', value)
                    }}
                    onBlur={() => setFieldTouched('lastName')} 
                  />
                  {errors.lastName && touched.lastName}


                  <FormField
                    Header={"Mobile"}
                    img={require("../assets/icons/phone.png")}
                    placeholder="Mobile Phone"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="mobile"
                    onChangeText={(value) => {
                      setFieldValue('mobile', value);
                      console.log('Mobile Phone: ', value)
                    }}
                    onBlur={() => setFieldTouched('mobile')} 
                  />
                  {errors.mobile && touched.mobile}

                  <FormField
                    Header={"Gender"}
                    img={require("../assets/icons/gender.png")}
                    placeholder="Gender"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="gender"
                    onChangeText={(value) => {
                      setFieldValue('gender', value);
                      console.log('gender: ', value)
                    }}
                    onBlur={() => setFieldTouched('gender')} 
                  />
                  {errors.gender && touched.gender}
                <View style={{marginTop: 20, marginBottom:20}}>
                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="birthDate"
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
                  {errors.birthDate && touched.birthDate}
                </View>
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
                    				
                   <Icon name="shopping-outline" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Add Product
                    </Title>
                  </View>
                  <View style={{ width: '75%', marginTop: 20 }}>
                    <Text style={styles.heading}>Select Product</Text>
                    <FormPicker
                    name="productName"
                    items={allExpenses}
                    textInputPlaceholder="Select Patient"
                    mode="flat"
                    onValueChange={(name, value) => {
                      setFieldValue(name, value);
                      console.log(`Selected productName: ${value}`);
                    }}
                  />
                  {errors.expense && touched.expense}
                </View>

                <FormField
                    Header={"Product Name"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Product Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="productName"
                    onChangeText={(value) => {
                      setFieldValue('productName', value);
                      console.log('productName: ', value)
                    }}
                    onBlur={() => setFieldTouched('productName')} 
                  />
                  {errors.productName && touched.productName}

                  <FormField
                    Header={"Price"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Price"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="price"
                    onChangeText={(value) => {
                      setFieldValue('price', value);
                      console.log('price: ', value)
                    }}
                    onBlur={() => setFieldTouched('price')} 
                  />
                  {errors.price && touched.price}

                  <FormField
                    Header={"Quantity"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Quantity"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="quantity"
                    onChangeText={(value) => {
                      setFieldValue('quantity', value);
                      console.log('quantity: ', value)
                    }}
                    onBlur={() => setFieldTouched('quantity')} 
                  />
                  {errors.quantity && touched.quantity}

                  <FormField
                    Header={"Amount"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Amount"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="amount"
                    onChangeText={(value) => {
                      setFieldValue('amount', value);
                      console.log('amount: ', value)
                    }}
                    onBlur={() => setFieldTouched('amount')} 
                  />
                  {errors.amount && touched.amount}
                  
                  <View style={{ width: '75%', marginTop: 20 }}>
                    <Text style={styles.heading}>Currency</Text>
                    <FormPicker
                    name="currency"
                    items={currencyOptions}
                    textInputPlaceholder="Select Currency"
                    mode="flat"
                    onValueChange={(name, value) => {
                      setFieldValue(name, value);
                      console.log(`Selected currency: ${value}`);
                    }}
                  />
                  {errors.currency && touched.currency}
                    
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
                    <Icon name="information-outline" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Reference
                    </Title>
                  </View>

                  <FormField
                    Header={"Reference"}
                    img={require("../assets/icons/fingerprint.png")}
                    placeholder="Reference"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="reference"
                    onChangeText={(value) => {
                      setFieldValue('reference', value);
                      console.log('reference: ', value)
                    }}
                    onBlur={() => setFieldTouched('reference')} 
                  />
                  {errors.reference && touched.reference}
                      
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
                        <Icon name="note-text" size={24} />
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
                         onChangeText={(value) => {
                          setFieldValue('note', value);
                          console.log('note: ', value)
                         }}
                         onBlur={() => setFieldTouched('note')} 
                      />
                      {errors.note && touched.note}
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
                      <Icon name="bookmark-outline" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Status
                      </Title>
                  </View>
      
              <FormPicker
                  name="status"
                  items={statusOptions}
                  textInputPlaceholder="Select Status"
                  mode="flat"
                  onValueChange={(name, value) => {
                    setFieldValue(name, value);
                    console.log(`Selected status: ${value}`);
                  }}
                />
                {errors.status && touched.status}
                </View>

                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >
                 {/* <SubmitButton  onSubmit={values => console.log(values)}/> */}
                   <SubmitButton txt="Submit" />
                  </View>
                </>
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
