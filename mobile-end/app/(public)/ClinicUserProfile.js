import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
// import countries from "../api/countries";
// import clinicsApi, { getClinicUser } from "../api/clinics";
import { Navbar } from "../components";
// import ActivityIndicator from "../components/ActivityIndicator";
import { ErrorMessage, Form, FormDatePicker, FormField, FormPicker, FormSingleImagePicker, SubmitButton, } from "../components/forms";
// import useApi from "../hooks/useApi";
// import authStorage from "../auth/storage";
// import { getUser } from "../api/users";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  prefix: Yup.string().optional().label("prefix"),
  firstName: Yup.string().required().label("First Name"),
  initials: Yup.string().optional().label("initials"),
  lastName: Yup.string().required().label("Last Name"),
  username: Yup.string().required().min(3).label("username"),
  password: Yup.string().matches(new RegExp("^[a-zA-Z0-9]{3,30}$")).required("Required"),
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
  skype: Yup.string().optional().label("Skype"),

  businessName: Yup.string().optional().label("Business Name"),
  taxPayerNo: Yup.string().optional().label("Tax-payer Nr"),
  chamberCommerceNo: Yup.string().optional().label("chamberCommerceNo"),
  industry: Yup.string().required().label("Industry"),
  size: Yup.string().required().label("Size"),
  website: Yup.string().optional().label("Website"),

  primInsurance: Yup.string().required().label("Prim. Insurance"),
  primInsuranceNo: Yup.string().required().label("Prim. Insurance-No"),
  primInsuranceValidTill: Yup.date().optional().label("Prim.Insurance Valid Till").nullable(),
  secInsurance: Yup.string().optional().label("Sec. Insurance"),
  secInsuranceNo: Yup.string().optional().label("Sec. Insurance-No"),
  secInsuranceValidTill: Yup.date().optional().label("Sec. Insurance Valid Till").nullable(),
  idPaper: Yup.string().optional().label("ID Paper"),
  idPaperValidTill: Yup.date().optional().label("ID Paper Valid Till").nullable(),
  IBAN: Yup.string().required().label("IBAN"),
  bank: Yup.string().required().label("Bank"),
  branchOfBank: Yup.string().optional().label("Branch of Bank"),
  organizationAName: Yup.string().optional().label("OrganizationA Name"),
  organizationAMemberNo: Yup.string().optional().label("OrganizationAMemberNo"),
  organizationBName: Yup.string().optional().label("OrganizationB Name"),
  organizationBMemberNo: Yup.string().optional().label("OrganizationBMemberNo"),
  healthcareProviderIdentifierOrganisation: Yup.string().optional().label("HPIO"),
  healthcareProviderIdentifierIndividual: Yup.string().optional().label("HPII"),
  treatments: Yup.string().optional().label("treatments"),
  licenseNo: Yup.string().optional().label("License-No"),
  licenseValidTill: Yup.date().optional().label("License Valid Till").nullable(),

});

const width = Dimensions.get("window").width

export default function OperationsClinic({ route }) {
  const navigation = useNavigation();

  const isTablet = width >= 800

  const [currentNav , setCurrentNav] = useState("Personalia")
  const [selected, setSelected] = useState({

    _id: "",
    prefix: "",
    firstName: "",
    initials: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    dateBirth: "",
    gender: "",
    profile: "",
    address1: "",
    address2: "",
    address3: "",
    zip: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    mobile: "",
    skype: "",
    businessName: "",
    taxPayerNo: "",
    chamberCommerceNo: "",
    industry: "",
    size: "",
    imageSrc: "",
    IBAN: "",
    bank: "",
    branchOfBank: "",
    primInsuranceNo: "",
    primInsurance: "",
    primInsuranceValidTill: "",
    secInsuranceNo: "",
    secInsurance: "",
    secInsuranceValidTill: "",
    idPaper: "",
    idPaperValidTill: "",
    organizationAName: "",
    organizationAMemberNo: "",
    organizationBName: "",
    organizationBMemberNo: "",
    healthcareProviderIdentifierOrganisation: "",
    healthcareProviderIdentifierIndividual: "",
    treatments: "",
    licenseNo: "",
    licenseValidTill: "",
  });

  // const clinicApi = useApi(clinicsApi.saveClinic);
  // const getCountriesApi = useApi(countries.getCountries);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const currentUser = await authStorage.getCurrentUser()
    const user = await getUser(currentUser._id)
    if (user?.data.role.name === "Clinic" || user?.data.role.name === "Solo") {
      const { ok, data: clinic } = await getClinicUser(currentUser._id)
      console.log(clinic._id)
      setSelected(clinic)
    }

    if (route.params) {
      setSelected(route.params.selectedClinic);
    }
    // getCountriesApi.request();
    setLoading(false)
  }, []);




  // const handleSubmit = async (userInfo) => {
  //   delete userInfo.password;

  //   const submitData = { ...userInfo };
  //   try {
  //     if (selected?._id) {
  //       submitData["_id"] = selected._id;
  //     }
  //     console.log("userInfo ",submitData);

  //     // const result = await clinicApi.request(submitData);
  //     //  console.log("result: ", result.ok);
  //     //  console.log("result: ", result.data);
  //     // if (!result.ok) {
  //     //   if (result.data) {
  //     //     console.log("idk ",result.data.error)
  //     //     setError(result.data.error);}
  //     //   else {
  //     //     setError("An unexpected error occurred! ");
  //     //     // console.log(result);
  //     //   }
  //     //   return;
  //     // }
  //     //if registration is success
  //               console.log("succes")

  //     navigation.goBack();
  //   } catch (error) {
  //     console.log("error exception:   ", error);
  //   }
  // };
  return (
    <>
      <View style={styles.Container}>
        {/* <ActivityIndicator visible={true} />  */}
        <KeyboardAwareScrollView>
          <SafeAreaView />

          <StatusBar />
          <Navbar
            arrow={() => {
              navigation.goBack();
            }}
            Text={`${selected._id ? "Update" : "Add"} Clinic`}
          />

          {/* <ActivityIndicator
            visible={clinicApi.loading || getCountriesApi.loading || loading}
          /> */}

          <View style={styles.sideImge}>
            <Image
              style={styles.imgeContainer}
              source={require("../assets/icons/logo.png")}
            />
          </View>

          <View style={styles.loginScreen}>
            <Text style={styles.headingText}>{`${selected._id ? "Update" : "New"
              } Clinic`}</Text>
            <Text style={styles.headingText2}>
              {`Please fill the form to ${selected._id ? "update" : "create"
                } your account.`}
            </Text>

            {isTablet && <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }} >

              <TouchableOpacity onPress={()=>setCurrentNav("Personalia")} style={{ ...styles.headerPicker, backgroundColor: 'rgb(191, 151, 59)' }}  >
                <Text  >Personalia</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setCurrentNav("LoginData")} style={{ ...styles.headerPicker, backgroundColor: 'rgb(239, 227, 18)' }}  >
                <Text>Login data</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setCurrentNav("Insurance")} style={{ ...styles.headerPicker, backgroundColor: 'rgb(155, 202, 45)' }}  >
                <Text>Insurance</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setCurrentNav("Identification")} style={{ ...styles.headerPicker, backgroundColor: 'rgb(45, 202, 63)' }}  >
                <Text>Identification</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setCurrentNav("Membership")} style={{ ...styles.headerPicker, backgroundColor: 'rgb(45, 202, 151)' }}  >
                <Text>Membership</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setCurrentNav("Licenses")} style={{ ...styles.headerPicker, backgroundColor: 'rgb(45, 202, 141)' }}  >
                <Text>Licenses</Text>
              </TouchableOpacity>
            </View>
            }

            <View style={styles.TextinputFields}>
              {!loading && <Form
                initialValues={{
                  _id: selected._id ? selected._id : "",
                  firstName: selected.user?.contactName?.first ? selected.user?.contactName?.first : "",
                  lastName: selected.user?.contactName?.last ? selected.user?.contactName?.last : "",
                  initials: selected.user.contactName?.initials ? selected.user.contactName?.initials : "",
                  username: selected.user?.username ? selected.user?.username : "",
                  password: "",
                  email: selected.user?.email ? selected.user?.email : "",
                  dateBirth: selected.user?.dateBirth ? selected.user?.dateBirth : "",
                  imageSrc: selected.user?.imageSrc ? selected.user?.imageSrc : null,
                  gender: selected.user?.gender ? selected.user?.gender : "",
                  prefix: selected.user?.prefix ? selected.user?.prefix : "",
                  address1: selected.user.Address?.address1 ? selected.user.Address.address1 : "",
                  address2: selected.user.Address.address2 ? selected.user.Address.address2 : "",
                  address3: selected.user.Address.address3 ? selected.user.Address.address3 : "",
                  city: selected.user.Address.city ? selected.user.Address.city : "",
                  zip: selected.user.Address.zip ? selected.user.Address.zip : "",
                  state: selected.user.Address.state ? selected.user.Address.state : "",
                  country: selected.user.Address.country ? selected.user.Address.country : "",
                  phone: selected.user.phones.phone ? selected.user.phones.phone : "",
                  mobile: selected.user.phones.mobile ? selected.user.phones.mobile : "",
                  skype: selected.user.phones.skype ? selected.user.phones.skype : "",
                  businessName: selected.companyInfo.businessName ? selected.companyInfo.businessName : "",
                  taxPayerNo: selected.companyInfo.taxPayerNo ? selected.companyInfo.taxPayerNo : "",
                  chamberCommerceNo: selected.companyInfo.chamberCommerceNo ? selected.companyInfo.chamberCommerceNo : "",
                  // industry: selected.industry ? selected.industry : "",
                  size: selected.companyInfo.size ? selected.companyInfo.size : "",
                  IBAN: selected.bankInfo.IBAN ? selected.bankInfo.IBAN : "",
                  bank: selected.bankInfo.bank ? selected.bankInfo.bank : "",
                  branchOfBank: selected.bankInfo.branchOfBank ? selected.bankInfo.branchOfBank : "",
                  // idPaper: selected.idPaper ? selected.idPaper : "",				  
                  //idPaperValidTill: idPaperValidTill ? idPaperValidTill : "",
                  //primInsurance: primInsurance ? primInsurance : "",				  
                  //primInsuranceNo: primInsuranceNo ? primInsuranceNo : "",
                 // primInsuranceValidTill: primInsuranceValidTill ? primInsuranceValidTill: "",				  
                  //secInsurance: secInsurance ? secInsurance : "",				  
                  //secInsuranceNo: secInsuranceNo ? secInsuranceNo : "",
                  //secInsuranceValidTill: secInsuranceValidTill? secInsuranceValidTill: "",
                  licenseValidTill: selected.professionalInfo.licenseValidTill ? selected.professionalInfo.licenseValidTill : "",
                }}
                // onSubmit={handleSubmit}
                // validationSchema={validationSchema}
                enableReinitialize={true}
              >

                <ErrorMessage error={error} visible={error} />
      {isTablet?
      <>
                <View>
                  {currentNav==="Personalia" && (<View
                    style={{
                      alignItems: "center",
                      margin: 8,
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
                      <Icon name="clinic" size={24} />
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
                      Header={"initials"}
                      img={require("../assets/icons/user.png")}
                      placeholder="initials"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="initials"
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
                    onDateChange={(value) => console.log("Date:", value)}
                    />
                  </View>)}
                 {currentNav==="LoginData" && <View
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
                      <Icon name="lock" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Login Data
                      </Title>
                    </View>
                    <FormField
                      Header={"username"}
                      img={require("../assets/icons/username.png")}
                      placeholder="username"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="username"
                    />

                    <FormField
                      Header={"Password"}
                      img={require("../assets/icons/password.png")}
                      placeholder={"• • • • • • • •"}
                      password={true}
                      name="password"
                      secureTextEntry={false}
                      isMultiline={false}
                    />
                    <FormField
                      Header={"E-Mail"}
                      img={require("../assets/icons/email.png")}
                      placeholder={"johnsmith@gmail.com"}
                      name="email"
                      secureTextEntry={false}
                      isMultiline={false}
                      autoCapitalize="none"
                      keyboardType={"email-address"}
                    />
                  </View>}
                </View>

                {currentNav==="LoginData" && <View
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
                  <FormField
                    Header={"Address 1"}
                    img={require("../assets/icons/addressbook.png")}
                    placeholder="Address 1"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address1"
                  />
                  <FormField
                    Header={"Address 2"}
                    img={require("../assets/icons/addressbook.png")}
                    placeholder="Address 2"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address2"
                  />
                  <FormField
                    Header={"Address 3"}
                    img={require("../assets/icons/addressbook.png")}
                    placeholder="Address 3"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address3"
                  />

                  <FormField
                    Header={"City"}
                    img={require("../assets/icons/mappin.png")}
                    placeholder="city"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="city"
                  />
                  <FormField
                    Header={"Zip Code"}
                    img={require("../assets/icons/mappin.png")}
                    placeholder="Zip Code"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="zip"
                  />
                  <FormField
                    Header={"State"}
                    img={require("../assets/icons/mappin.png")}
                    placeholder="state"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="state"
                  />

                  {/* <View style={{ marginBottom: 16, flex: 1 }}> */}
                  <Text style={{ marginBottom: 5, textAlign: "center" }}>
                    Country
                  </Text>
                  <View
                    style={{
                      height: 64,
                      width: "80%",
                    }}
                  >
                    <FormPicker
                      //label="Simple dropdown with avatar"
                      textInputPlaceholder="Select Country"
                      // data={getCountriesApi.data.map((country) => ({
                      //   label: country.name,
                      //   value: country.name,
                      //   avatarSource: { uri: country.flag },
                      // }))}
                      mode="flat"
                      name="country"
                    />
                  </View>

                  <FormField
                    Header={"Phone"}
                    img={require("../assets/icons/phone.png")}
                    placeholder="phone"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="phone"
                  />
                  <FormField
                    Header={"Mobile"}
                    img={require("../assets/icons/mobile.png")}
                    placeholder="Mobile"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="mobile"
                  />
                  <FormField
                    Header={"Skype"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="skype"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="skype"
                  />
                  <FormField
                    Header={"Business Name"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="Business name"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="businessName"
                  />
                  <FormField
                    Header={"Tax payer No"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="Tax Payer No"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="taxPayerNo"
                  />

                  <FormField
                    Header={"Website"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="Website"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="website"
                  />
                  <FormField
                    Header={"Chamber CommerceNo"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="Chamber CommerceNo"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="chamberCommerceNo"
                  />
                  {/* </View> */}
                </View>
              }
                {currentNav==="Insurance" && <View
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
                   <Icon name="lock" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Bank-Account Information
                    </Title>
                  </View>
                  <FormField
                    Header={"Bank"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Bank"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="bank"
                  />
                  <FormField
                    Header={"Branch of Bank"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Branch of Bank"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="branchOfBank"
                  />
                  <FormField
                    Header={"IBAN"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="IBAN"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="IBAN"
                  />

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
                   <Icon name="lock" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Insurances
                    </Title>
                  </View>

                  <FormField
                    Header={"Prim. Insurance"}
                    img={require("../assets/icons/medicalbadge.png")}
                    placeholder="Prim. Insurance"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="primInsurance"
                  />
                  <FormField
                    Header={"Prim. Insurance-No"}
                    img={require("../assets/icons/medicalbadge.png")}
                    placeholder="Prim. Insurance-No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="primInsuranceNo"
                  />
                  <Text style={{ marginBottom: 5 }}>
                    Prim Insurance Valid Till:
                  </Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="primInsuranceValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "grey",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  onDateChange={(value) => console.log("Date:", value)}
                  />
                  <FormField
                    Header={"Sec Insurance"}
                    img={require("../assets/icons/medicalbadge.png")}
                    placeholder="secInsurance"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="secInsurance"
                  />
                  <FormField
                    Header={"Sec. Insurance-No"}
                    img={require("../assets/icons/medicalbadge.png")}
                    placeholder="Sec. Insurance-No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="secInsuranceNo"
                  />

                  <Text style={{ marginBottom: 5 }}>
                    Sec Insurance Valid Till:
                  </Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="secInsuranceValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "grey",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
                  />
                </View>}
               {currentNav==="Identification" && <View
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
                    <Icon name="fingerprint" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Identification
                    </Title>
                  </View>

                  <FormField
                    Header={"ID Paper"}
                    img={require("../assets/icons/fingerprint.png")}
                    placeholder="ID Paper"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="idPaper"
                  />
                  <Text style={{ marginBottom: 5 }}>ID PaperValidTill:</Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="idPaperValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "gray",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
                  />
                </View>
}
               {currentNav==="Membership" && <View
                  style={{
                    alignItems: "center",
                    margin: 8,
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
                    <Icon name="membership" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Membership
                    </Title>
                  </View>
                  <FormField
                    Header={"Organization A Name"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="Organization A Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationAName"
                  />
                  <FormField
                    Header={"OrganizationA MemberNo"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="OrganizationA MemberNo"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationAMemberNo"
                  />
                  <FormField
                    Header={"Organization B Name"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="Organization B Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationBName"
                  />
                  <FormField
                    Header={"OrganizationB MemberNo"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="OrganizationB MemberNo"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationBMemberNo"
                  />
                </View>}
                {currentNav==="Licenses" && <View
                  style={{
                    alignItems: "center",
                    margin: 8,
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
                    <Icon name="license1" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Licenses
                    </Title>
                  </View>
                  <FormField
                    Header={"healthcareProviderIdentifierOrganisation"}
                    img={require("../assets/icons/licensed.png")}
                    placeholder="HPIO"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="healthcareProviderIdentifierOrganisation"
                  />
                  <FormField
                    Header={"healthcareProviderIdentifierIndividual"}
                    img={require("../assets/icons/licensed.png")}
                    placeholder="HPII"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="healthcareProviderIdentifierIndividual"
                  />

                  <FormField
                    Header={"Treatments"}
                    img={require("../assets/icons/licensed.png")}
                    placeholder="Treatments"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="treatments"
                  />

                  <FormField
                    Header={"License No"}
                    img={require("../assets/icons/licensed.png")}
                    placeholder="License No"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="licenseNo"
                  />

                  <Text style={{ marginBottom: 5 }}>License Valid Till:</Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="licenseValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "gray",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
                  />
                </View>}
      </>
      : 
      <>
                      <View>
                  <View
                    style={{
                      alignItems: "center",
                      margin: 8,
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
                      <Icon name="clinic" size={24} />
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
                      Header={"initials"}
                      img={require("../assets/icons/user.png")}
                      placeholder="initials"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="initials"
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
                      <Icon name="lock" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Login Data
                      </Title>
                    </View>
                    <FormField
                      Header={"username"}
                      img={require("../assets/icons/username.png")}
                      placeholder="username"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="username"
                    />

                    <FormField
                      Header={"Password"}
                      img={require("../assets/icons/password.png")}
                      placeholder={"• • • • • • • •"}
                      password={true}
                      name="password"
                      secureTextEntry={false}
                      isMultiline={false}
                    />
                    <FormField
                      Header={"E-Mail"}
                      img={require("../assets/icons/email.png")}
                      placeholder={"johnsmith@gmail.com"}
                      name="email"
                      secureTextEntry={false}
                      isMultiline={false}
                      autoCapitalize="none"
                      keyboardType={"email-address"}
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
                  <FormField
                    Header={"Address 1"}
                    img={require("../assets/icons/addressbook.png")}
                    placeholder="Address 1"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address1"
                  />
                  <FormField
                    Header={"Address 2"}
                    img={require("../assets/icons/addressbook.png")}
                    placeholder="Address 2"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address2"
                  />
                  <FormField
                    Header={"Address 3"}
                    img={require("../assets/icons/addressbook.png")}
                    placeholder="Address 3"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address3"
                  />

                  <FormField
                    Header={"City"}
                    img={require("../assets/icons/mappin.png")}
                    placeholder="city"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="city"
                  />
                  <FormField
                    Header={"Zip Code"}
                    img={require("../assets/icons/mappin.png")}
                    placeholder="Zip Code"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="zip"
                  />
                  <FormField
                    Header={"State"}
                    img={require("../assets/icons/mappin.png")}
                    placeholder="state"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="state"
                  />

                  {/* <View style={{ marginBottom: 16, flex: 1 }}> */}
                  <Text style={{ marginBottom: 5, textAlign: "center" }}>
                    Country
                  </Text>
                  <View
                    style={{
                      height: 64,
                      width: "80%",
                    }}
                  >
                    <FormPicker
                      //label="Simple dropdown with avatar"
                      textInputPlaceholder="Select Country"
                      // data={getCountriesApi.data.map((country) => ({
                      //   label: country.name,
                      //   value: country.name,
                      //   avatarSource: { uri: country.flag },
                      // }))}
                      mode="flat"
                      name="country"
                    />
                  </View>

                  <FormField
                    Header={"Phone"}
                    img={require("../assets/icons/phone.png")}
                    placeholder="phone"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="phone"
                  />
                  <FormField
                    Header={"Mobile"}
                    img={require("../assets/icons/mobile.png")}
                    placeholder="Mobile"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="mobile"
                  />
                  <FormField
                    Header={"Skype"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="skype"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="skype"
                  />
                  <FormField
                    Header={"Business Name"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="Business name"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="businessName"
                  />
                  <FormField
                    Header={"Tax payer No"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="Tax Payer No"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="taxPayerNo"
                  />

                  <FormField
                    Header={"Website"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="Website"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="website"
                  />
                  <FormField
                    Header={"Chamber CommerceNo"}
                    img={require("../assets/icons/skype.png")}
                    placeholder="Chamber CommerceNo"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="chamberCommerceNo"
                  />
                  {/* </View> */}
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
                   <Icon name="lock" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Bank-Account Information
                    </Title>
                  </View>
                  <FormField
                    Header={"Bank"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Bank"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="bank"
                  />
                  <FormField
                    Header={"Branch of Bank"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="Branch of Bank"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="branchOfBank"
                  />
                  <FormField
                    Header={"IBAN"}
                    img={require("../assets/icons/bank2.png")}
                    placeholder="IBAN"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="IBAN"
                  />

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
                   <Icon name="lock" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Insurances
                    </Title>
                  </View>

                  <FormField
                    Header={"Prim. Insurance"}
                    img={require("../assets/icons/medicalbadge.png")}
                    placeholder="Prim. Insurance"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="primInsurance"
                  />
                  <FormField
                    Header={"Prim. Insurance-No"}
                    img={require("../assets/icons/medicalbadge.png")}
                    placeholder="Prim. Insurance-No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="primInsuranceNo"
                  />
                  <Text style={{ marginBottom: 5 }}>
                    Prim Insurance Valid Till:
                  </Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="primInsuranceValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "grey",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
                  />
                  <FormField
                    Header={"Sec Insurance"}
                    img={require("../assets/icons/medicalbadge.png")}
                    placeholder="secInsurance"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="secInsurance"
                  />
                  <FormField
                    Header={"Sec. Insurance-No"}
                    img={require("../assets/icons/medicalbadge.png")}
                    placeholder="Sec. Insurance-No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="secInsuranceNo"
                  />

                  <Text style={{ marginBottom: 5 }}>
                    Sec Insurance Valid Till:
                  </Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="secInsuranceValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "grey",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
                  />
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
                    <Icon name="fingerprint" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Identification
                    </Title>
                  </View>

                  <FormField
                    Header={"ID Paper"}
                    img={require("../assets/icons/fingerprint.png")}
                    placeholder="ID Paper"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="idPaper"
                  />
                  <Text style={{ marginBottom: 5 }}>ID PaperValidTill:</Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="idPaperValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "gray",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
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
                    <Icon name="membership" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Membership
                    </Title>
                  </View>
                  <FormField
                    Header={"Organization A Name"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="Organization A Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationAName"
                  />
                  <FormField
                    Header={"OrganizationA MemberNo"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="OrganizationA MemberNo"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationAMemberNo"
                  />
                  <FormField
                    Header={"Organization B Name"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="Organization B Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationBName"
                  />
                  <FormField
                    Header={"OrganizationB MemberNo"}
                    img={require("../assets/icons/membership.png")}
                    placeholder="OrganizationB MemberNo"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationBMemberNo"
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
                    <Icon name="license1" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Licenses
                    </Title>
                  </View>
                  <FormField
                    Header={"healthcareProviderIdentifierOrganisation"}
                    img={require("../assets/icons/licensed.png")}
                    placeholder="HPIO"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="healthcareProviderIdentifierOrganisation"
                  />
                  <FormField
                    Header={"healthcareProviderIdentifierIndividual"}
                    img={require("../assets/icons/licensed.png")}
                    placeholder="HPII"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="healthcareProviderIdentifierIndividual"
                  />

                  <FormField
                    Header={"Treatments"}
                    img={require("../assets/icons/licensed.png")}
                    placeholder="Treatments"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="treatments"
                  />

                  <FormField
                    Header={"License No"}
                    img={require("../assets/icons/licensed.png")}
                    placeholder="License No"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="licenseNo"
                  />

                  <Text style={{ marginBottom: 5 }}>License Valid Till:</Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="licenseValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "gray",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
                  />
                </View>

      </> }

                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >
                  {/* <FormDatePicker
        onPick={(date) => onDataChange({ ...data, dateOfBirth: date })}
      /> */}

                  {/* <AppText
                  Header={"CONFIRM PASSWORD"}
                  img={require("../assets/lock.png")}
                  placeholder={"• • • • • • • •"}
                  password={true}
                  name="password"
                /> */}

                  {/* <DatePickerFuture />
                  <DatePickerPast />
                  <DatePickerCurrent /> */}

                  {/* <ImageInput 
             imageUri={imageUri}
             onChangeImage={(uri) => setImageUri(uri)} 
             /> */}

                  <SubmitButton txt={selected._id ? "Update" : "Register"} />
                </View>
              </Form>}
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
  headerPicker: {
    padding: 10,
    width: "10%",
    height: 40,
    borderRadius: 5,
  },
});