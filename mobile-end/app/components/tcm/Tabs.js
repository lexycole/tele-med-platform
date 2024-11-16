import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TabBar from "./TabBar";
import Input from "./Input";
import { colors } from "./colors";
import MultiInput from "./MultiInput";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";
import Icon from "react-native-vector-icons/AntDesign";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";

import PreviousSession from "../../screens/homeo/components/PreviousSessionTab";

const width = Dimensions.get("window").width;
const currentTreatmentOptions = [
  { value: "ayurveda", label: "ayurveda" },
  { value: "homeopathy", label: "homeopathy" },
  {
    value: "TCM-herbsccu",
    label: "Traditional Chinese Medicine (herbs and acu)",
  },
  { value: "acupuncture", label: "Acupuncture" },
  { value: "chineseherbs", label: "Chinese Herbs" },
  { value: "regularconventional", label: "regular/conventional" },
  { value: "naturopratic", label: "naturopratic" },
  { value: "tuina", label: "tuina" },
  { value: "reiki", label: "reiki" },
  { value: "bach-flowers", label: "bach flowers" },
  { value: "osteopathic", label: "osteopathic" },
  { value: "shiatsu", label: "shiatsu" },
  { value: "other", label: "other" },
];

const familyRoleOptions = [
  { value: "father", label: "father" },
  { value: "mother", label: "mother" },
  { value: "brother", label: "brother" },
  { value: "sister", label: "sister" },
  { value: "twin-brother", label: "twin-brother" },
  { value: "twin-sister", label: "twin-sister" },
  { value: "grandpa-father-side", label: "Grandpa at Father's side" },
  { value: "gradma-father-side", label: "Grandma at Father's side" },
  { value: "grandpa-mother-side", label: "Grandpa at Mother's side" },
  { value: "grandma-mother-side", label: "Grandma at Mother's side" },
  { value: "uncle-father-side", label: "Grandpa at Father's side" },
  { value: "aunt-father-side", label: "Grandma at Father's side" },
  { value: "uncle-mother-side", label: "Grandpa at Mother's side" },
  { value: "aunt-mother-side", label: "Grandma at Mother's side" },
  { value: "cousin-father-side", label: "Cousin at Father's side" },
  { value: "cousin-mother-side", label: "Cousin at Mother's side" },
  { value: "nephew", label: "Nephew" },
  { value: "niece", label: "Niece" },
  { value: "granduncle-father-side", label: "Granduncle at Father's side" },
  { value: "gradaunt-father-side", label: "Grandaunt at Father's side" },
  { value: "granduncle-mother-side", label: "Granduncle at Mother's side" },
  { value: "grandaunt-mother-side", label: "Grandaunt at Mother's side" },
];

const familyDiseaseStatusOptions = [
  { value: "cured", label: "cured" },
  { value: "in treatment", label: "in teratment" },
  { value: "died", label: "died" },
  { value: "other", label: "other" },
];

var max = new Date().getFullYear();
var min = max - 120;
var years = [];
for (var i = max; i >= min; i--) {
  var valueToPush = {};
  valueToPush["value"] = i;
  valueToPush["label"] = i.toString();
  years.push(valueToPush);
}

function MedicalHistory({ index, setIndex }) {
  const [familyData, setFamilyData] = useState(familyRoleOptions);
  const [showFamily, setShowFamily] = useState(false);
  const [familyValue, setFamilyValue] = useState("Select Family Member");
  const [yearsData, setYearsData] = useState(years);
  const [showYears, setShowYears] = useState(false);
  const [yearValue, setYearValue] = useState("Select Year");
  const [statusData, setstatusData] = useState(familyDiseaseStatusOptions);
  const [showStatus, setShowStatus] = useState(false);
  const [statusValue, setstatusValue] = useState("Select Status");

  const [treatmentData, settreatmentData] = useState(currentTreatmentOptions);
  const [showTreatment, setShowTreatment] = useState(false);
  const [treatmentPlaceHolder, setTreatmentPlaceholder] = useState(
    "Select Current Treatment"
  );
  const [treatmentValue, setTreatmentValue] = useState([]);

  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [westernDisease, setWesternDisease] = useState("");
  const [illness, setIllness] = useState("");
  const [surgries, setSurgries] = useState("");
  const [medicaments, setMedicaments] = useState("");
  const [allergies, setAllergies] = useState("");
  const [pragnancies, setPragnancies] = useState("");
  const [disease, setDisease] = useState("");
  const [medicalHistoryNote, setMedicalHistoryNote] = useState("");
  const [arrayValue, setArrayValue] = useState([
    {
      dataStatus: [
        { value: "cured", label: "cured" },
        { value: "in treatment", label: "in teratment" },
        { value: "died", label: "died" },
        { value: "other", label: "other" },
      ],
      dataYear: years,
      dataFamilyMember: [
        { value: "father", label: "father" },
        { value: "mother", label: "mother" },
        { value: "brother", label: "brother" },
        { value: "sister", label: "sister" },
        { value: "twin-brother", label: "twin-brother" },
        { value: "twin-sister", label: "twin-sister" },
        { value: "grandpa-father-side", label: "Grandpa at Father's side" },
        { value: "gradma-father-side", label: "Grandma at Father's side" },
        { value: "grandpa-mother-side", label: "Grandpa at Mother's side" },
        { value: "grandma-mother-side", label: "Grandma at Mother's side" },
        { value: "uncle-father-side", label: "Grandpa at Father's side" },
        { value: "aunt-father-side", label: "Grandma at Father's side" },
        { value: "uncle-mother-side", label: "Grandpa at Mother's side" },
        { value: "aunt-mother-side", label: "Grandma at Mother's side" },
        { value: "cousin-father-side", label: "Cousin at Father's side" },
        { value: "cousin-mother-side", label: "Cousin at Mother's side" },
        { value: "nephew", label: "Nephew" },
        { value: "niece", label: "Niece" },
        {
          value: "granduncle-father-side",
          label: "Granduncle at Father's side",
        },
        { value: "gradaunt-father-side", label: "Grandaunt at Father's side" },
        {
          value: "granduncle-mother-side",
          label: "Granduncle at Mother's side",
        },
        { value: "grandaunt-mother-side", label: "Grandaunt at Mother's side" },
      ],
      statusValue: "Select Status",
      yearValue: "Select Year",
      memberValue: "Select Family Member",
      diseaseValue: "",
      showOptionsFamily: false,
      showOptionsYear: false,
      showOptionsStatus: false,
    },
  ]);
  const [textValue, setTextValue] = useState("");
  const refInputs = useRef([textValue]);

  function treatmentsValue(item) {
    treatmentValue.push(item.label);
    console.log(item);
    setTreatmentValue((prev) => [...treatmentValue]);
  }

  function removeValue(index) {
    treatmentValue.splice(index, 1);
    setTreatmentValue((prev) => [...treatmentValue]);
  }

  const pushObject = () => {
    var valueToPush = {};
    valueToPush["dataStatus"] = statusData;
    valueToPush["dataYear"] = years;
    valueToPush["dataFamilyMember"] = familyRoleOptions;
    valueToPush["statusValue"] = "Select Status";
    valueToPush["memberValue"] = "Select Family Member";
    valueToPush["yearValue"] = "Select Year";
    valueToPush["diseaseValue"] = "";
    valueToPush["showOptionsFamily"] = false;
    valueToPush["showOptionsYear"] = false;
    valueToPush["showOptionsStatus"] = false;
    arrayValue.push(valueToPush);
    setArrayValue([...arrayValue]);
  };

  const removeObject = (index) => {
    console.log(index);
    arrayValue.splice(index, 1);
    setArrayValue([...arrayValue]);
  };

  const addInputValue = (text, index) => {
    arrayValue[index].diseaseValue = text;
    setArrayValue([...arrayValue]);
  };

  const showPickerFamily = (index) => {
    arrayValue[index].showOptionsFamily = !arrayValue[index].showOptionsFamily;
    setArrayValue([...arrayValue]);
  };

  const showPickerStatus = (index) => {
    arrayValue[index].showOptionsStatus = !arrayValue[index].showOptionsStatus;
    setArrayValue([...arrayValue]);
  };

  const showPickerYear = (index) => {
    arrayValue[index].showOptionsYear = !arrayValue[index].showOptionsYear;
    setArrayValue([...arrayValue]);
  };

  const setFamilyMember = (item, index) => {
    arrayValue[index].memberValue = item;
    arrayValue[index].showOptionsFamily = false;
    setArrayValue([...arrayValue]);
  };

  const setFamilyMember1 = (item, index) => {
    arrayValue[index].memberValue = item.value;
    arrayValue[index].showOptionsFamily = false;
    setArrayValue([...arrayValue]);
  };

  const setYearsValue = (item, index) => {
    arrayValue[index].yearValue = item;
    arrayValue[index].showOptionsYear = false;
    setArrayValue([...arrayValue]);
  };

  const setYearsValue1 = (item, index) => {
    arrayValue[index].yearValue = item.value;
    arrayValue[index].showOptionsYear = false;
    setArrayValue([...arrayValue]);
  };

  const setStatusValue = (item, index) => {
    arrayValue[index].statusValue = item;
    arrayValue[index].showOptionsStatus = false;
    setArrayValue([...arrayValue]);
  };

  const setStatusValue1 = (item, index) => {
    arrayValue[index].statusValue = item.value;
    arrayValue[index].showOptionsStatus = false;
    setArrayValue([...arrayValue]);
  };

  return (
    <View
      onStartShouldSetResponder={() => {
        setShowTreatment(false),
          setShowYears(false),
          setShowStatus(false),
          setShowFamily(false);
      }}
      style={styles.scene}
    >
      <Text style={styles.headingText}>Medical History</Text>
      <Text style={styles.historyInnerTitle}>Personal Medical History</Text>
      <View style={styles.separator} />
      <View style={{ marginHorizontal: "4%" }}>
        <MultiInput
          title="Chief Complaint :*"
          placeholder="Your chief complaint..."
          value={chiefComplaint}
          onChangeText={(text) => setChiefComplaint(text)}
        />
        <MultiInput
          title="Symptoms :"
          placeholder="The symptoms..."
          value={symptoms}
          onChangeText={(text) => setSymptoms(text)}
        />
        <Input
          title="Western Disease/syndrome :"
          placeholder="The Western Disease/syndrome..."
          value={westernDisease}
          onChangeText={(text) => setWesternDisease(text)}
        />
        <Text style={styles.pickerTitleText}>Current Treatment :</Text>
        {treatmentValue.length != 0 ? (
          <View style={styles.listView}>
            {treatmentValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeValue(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={treatmentValue}
          data={treatmentData}
          state={showTreatment}
          placeholder={treatmentPlaceHolder}
          onPress={() => setShowTreatment(!showTreatment)}
          onPressItem={(item) => treatmentsValue(item)}
        />

        <Input
          title="Diseases & Illnesses :"
          placeholder="Type in Westren Disease Name in the past..."
          value={illness}
          onChangeText={(text) => setIllness(text)}
        />
        <Input
          title="Surgeries"
          placeholder="Surgeries in the past..."
          value={surgries}
          onChangeText={(text) => setSurgries(text)}
        />
        <Input
          title="Medicaments & Supplements in use :"
          placeholder="Medicaments & Supplements in use or in the past..."
          value={medicaments}
          onChangeText={(text) => setMedicaments(text)}
        />
        <MultiInput
          title="Allergies :"
          placeholder="Type in allergies..."
          value={allergies}
          onChangeText={(text) => setAllergies(text)}
        />
        <Input
          title="Pregnancies :"
          placeholder="Pregnancies, year of pragnancies in the past..."
          value={pragnancies}
          onChangeText={(text) => setPragnancies(text)}
        />
      </View>

      <Text style={styles.historyInnerTitle}>Family Medical History</Text>
      <View style={styles.separator} />
      <View style={{ marginHorizontal: "4%" }}>
        <TouchableOpacity
          onPress={() => pushObject()}
          style={styles.addFamilyRoleButton}
        >
          <Text style={styles.addFamilyRoleText}>
            Add Family Role With Medical History
          </Text>
        </TouchableOpacity>
      </View>

      {width < 450
        ? arrayValue.map((element, index) => (
            <View style={{ marginHorizontal: "4%" }}>
              <Text style={styles.pickerTitleText}>Family Member</Text>
              <SingleSelect
                value={element.memberValue}
                data={element.dataFamilyMember}
                state={element.showOptionsFamily}
                onPress={() => showPickerFamily(index)}
                onPressItem={(item) => setFamilyMember1(item, index)}
              />
              <MultiInput
                title="Disease"
                placeholder="Type in Westren Disease Name of The Family Member"
                value={element.diseaseValue}
                onChangeText={(text) => addInputValue(text, index)}
              />
              <Text style={styles.pickerTitleText}>Year</Text>
              <SingleSelect
                value={element.yearValue}
                data={element.dataYear}
                state={element.showOptionsYear}
                onPress={() => showPickerYear(index)}
                onPressItem={(item) => setYearsValue1(item, index)}
              />
              <Text style={styles.pickerTitleText}>State</Text>
              <SingleSelect
                value={element.statusValue}
                data={element.dataStatus}
                state={element.showOptionsStatus}
                onPress={() => showPickerStatus(index)}
                onPressItem={(item) => setStatusValue1(item, index)}
              />
              {index != 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "auto",
                    marginTop: 5,
                    marginRight: "4%",
                  }}
                >
                  <Text style={styles.pickerTitleText}>Remove</Text>
                  <TouchableOpacity onPress={() => removeObject(index)}>
                    <Icon1
                      name="delete-circle"
                      color="red"
                      style={{ marginTop: 0 }}
                      size={40}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          ))
        : arrayValue.map((element, index) => (
            <View
              style={{
                alignSelf: "center",
                width: "84%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "23%" }}>
                <Text style={styles.pickerTitleText}>Family Member</Text>
                <View
                  style={{
                    width: "100%",
                    height: 42,
                    marginTop: 8,
                    marginLeft: "3%",
                    borderColor: colors.inputPlaceHolder,
                    borderWidth: 1,
                    borderRadius: 6,
                  }}
                >
                  <Picker
                    selectedValue={element.memberValue}
                    style={{ height: 42 }}
                    onValueChange={(itemValue, itemIndex) =>
                      setFamilyMember(itemValue, index)
                    }
                  >
                    {element.dataFamilyMember.map((element1) => (
                      <Picker.Item
                        label={element1.label}
                        value={element1.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={{ width: "23%" }}>
                <Input
                  title="Disease"
                  placeholder="Type in Westren Disease Name of The Family Member"
                  value={element.diseaseValue}
                  onChangeText={(text) => addInputValue(text, index)}
                />
              </View>
              <View style={{ width: "23%" }}>
                <Text style={styles.pickerTitleText}>Year</Text>
                <View
                  style={{
                    width: "100%",
                    height: 42,
                    marginTop: 8,
                    borderColor: colors.inputPlaceHolder,
                    borderWidth: 1,
                    borderRadius: 6,
                  }}
                >
                  <Picker
                    selectedValue={element.yearValue}
                    style={{ height: 42 }}
                    onValueChange={(itemValue, itemIndex) =>
                      setYearsValue(itemValue, index)
                    }
                  >
                    {element.dataYear.map((element1) => (
                      <Picker.Item
                        label={element1.label}
                        value={element1.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={{ width: "23%" }}>
                <Text style={styles.pickerTitleText}>State</Text>
                <View
                  style={{
                    width: "100%",
                    height: 42,
                    marginTop: 8,
                    marginRight: "3%",
                    borderColor: colors.inputPlaceHolder,
                    borderWidth: 1,
                    borderRadius: 6,
                  }}
                >
                  <Picker
                    selectedValue={element.statusValue}
                    style={{ height: 42 }}
                    onValueChange={(itemValue, itemIndex) =>
                      setStatusValue(itemValue, index)
                    }
                  >
                    {element.dataStatus.map((element1) => (
                      <Picker.Item
                        label={element1.label}
                        value={element1.value}
                      />
                    ))}
                  </Picker>
                </View>
                {index != 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "auto",
                      marginTop: 5,
                    }}
                  >
                    <Text style={styles.pickerTitleText}>Remove</Text>
                    <TouchableOpacity onPress={() => removeObject(index)}>
                      <Icon1
                        name="delete-circle"
                        color="red"
                        style={{ marginTop: 0 }}
                        size={40}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          ))}

      <View style={{ marginHorizontal: "4%" }}>
        <MultiInput
          title="Note for Medical History :"
          placeholder="Type additional information of medical history"
          value={medicalHistoryNote}
          onChangeText={(text) => setMedicalHistoryNote(text)}
        />
        <View style={[styles.bottomButtonsView, { marginLeft: "auto" }]}>
          <TouchableOpacity
            onPress={() => setIndex(index + 1)}
            style={styles.nextButton}
          >
            <Text style={[styles.addFamilyRoleText, { marginHorizontal: 15 }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const socialRelationshipOptions = [
  { value: "single", label: "single" },
  { value: "divorced", label: "divorced" },
  { value: "widowed", label: "widowed" },
  { value: "separated", label: "separated" },
  { value: "married", label: "married" },
  { value: "relationship", label: "in relationship" },
];

const habitsOptions = [
  { value: "smoking", label: "smoking" },
  { value: "alcohol", label: "alcohol" },
  { value: "coffee", label: "coffee" },
  { value: "tea", label: "tea" },
  { value: "heroin", label: "heroin" },
  { value: "sugar", label: "sugar" },
  { value: "cocaine", label: "cocaine" },
  { value: "marihuana", label: "marihuana" },
];

const employmentStatusOptions = [
  { value: "fulltime", label: "fulltime" },
  { value: "parttime", label: "parttime" },
  { value: "freelance", label: "freelance" },
  { value: "retired", label: "retired" },
  { value: "unemployed", label: "unemployed" },
];

const sportFrequency = [
  { value: "never", label: "never" },
  { value: "rare", label: "rare" },
  { value: "sometimes", label: "sometimes" },
  { value: "regular", label: "regular" },
  { value: "very regular", label: "very regular" },
];

const thermalFeelingOptions = [
  { value: "normal", label: "normal" },
  { value: "chilly", label: "chilly" },
  { value: "hotflush", label: "hot flush" },
  { value: "feverish", label: "feverish" },
  { value: "nightsweating", label: "night sweating" },
];

const perspirationOptions = [
  { value: "normal", label: "normal" },
  { value: "frequent", label: "frequent" },
  { value: "absent", label: "absent" },
  { value: "profuse", label: "profuse" },
  { value: "nightsweating", label: "night sweating" },
];

const appetiteOptions = [
  { value: "normal", label: "normal" },
  { value: "excess", label: "excess" },
  { value: "poor", label: "poor" },
  { value: "craving", label: "craving" },
];

const vomittingOptions = [
  { value: "no", label: "no" },
  { value: "yes", label: "yes" },
  { value: "yeswithblood", label: "yes with blood" },
];

const dietOptions = [
  { value: "normal", label: "normal" },
  { value: "meat", label: "meat" },
  { value: "vegetarian", label: "vegetarian" },
  { value: "diversity", label: "diversity" },
  { value: "processedfood", label: "processed food" },
  { value: "seafood", label: "seafood" },
  { value: "glutenfree", label: "gluten-free" },
  { value: "balanced", label: "balanced" },
  { value: "bionic", label: "bionic" },
];

const tasteOptions = [
  { value: "normal", label: "normal" },
  { value: "bitter", label: "bitter" },
  { value: "sweet", label: "sweet" },
  { value: "greasy", label: "greasy" },
  { value: "bland", label: "bland" },
  { value: "acridpungent", label: "acrid/pungent" },
];

const thirstOptions = [
  { value: "normal", label: "normal" },
  { value: "excess", label: "excess" },
  { value: "little", label: "little" },
  { value: "cold", label: "cold" },
  { value: "hot", label: "hot" },
];

const defecationOptions = [
  { value: "normal", label: "normal" },
  { value: "diarrhea", label: "diarrhea" },
  { value: "constipated", label: "constipated" },
  { value: "loose", label: "loose" },
  { value: "dry", label: "dry" },
];

const urinationOptions = [
  { value: "normal", label: "normal" },
  { value: "scanty", label: "scanty" },
  { value: "difficult", label: "difficult" },
  { value: "painful", label: "painful" },
  { value: "frequent", label: "frequent" },
  { value: "frequentinnight", label: "frequent in the night" },
];

const urinationColorOptions = [
  { value: "normal", label: "normal" },
  { value: "yellow", label: "yellow" },
  { value: "darkyellow", label: "darkyellow" },
  { value: "bloody", label: "bloody" },
  { value: "white", label: "white" },
];

const sleepOptions = [
  { value: "normal", label: "normal" },
  { value: "heavy", label: "heavy" },
  { value: "poor", label: "poor" },
  { value: "restlesness", label: "restlesness" },
  { value: "dreamed", label: "dreamed" },
];

const headOptions = [
  { value: "normal", label: "normal" },
  { value: "dizzy", label: "dizzy" },
  { value: "drowsy", label: "drowsy" },
  { value: "headache", label: "headache" },
];

const eyesOptions = [
  { value: "normal", label: "normal" },
  { value: "blurry", label: "Blurry vision" },
  { value: "dry", label: "dry" },
  { value: "tearing", label: "tearing" },
  { value: "continent", label: "Continent" },
  { value: "red", label: "Red" },
  { value: "yellow", label: "Yellow" },
  { value: "lazy", label: "Lazy" },
  { value: "colorblindness", label: "Colorblindness" },
  { value: "lightsensitivity", label: "Lightsensitivity" },
  { value: "floaters", label: "Floaters" },
  { value: "discharge", label: "discharge" },
  { value: "pink", label: "Pink" },
  { value: "watery", label: "Watery" },
];

const earsOptions = [
  { value: "normal", label: "normal" },
  { value: "earringing", label: "ear ringing" },
  { value: "poorhearing", label: "poor hearing" },
  { value: "pain", label: "pain" },
  { value: "discharge", label: "discharge" },
];

const noseOptions = [
  { value: "normal", label: "normal" },
  { value: "dry", label: "dry" },
  { value: "runnynose", label: "runny nose" },
  { value: "blockedsensation", label: "blocked sensation" },
  { value: "discharge", label: "discharge" },
  { value: "nasalstuffiness", label: "nasal stuffiness" },
  { value: "nasalcongestion", label: "nasal congestion" },
  { value: "reduced sense of smell", label: "reduced sense of smell" },
  { value: "loose of smell", label: "loose of smell" },
  { value: "snorring", label: "snorring" },
  { value: "bleeding", label: "bleeding" },
  { value: "postnasaldrip", label: "postnasal drip" },
  { value: "breathingthroughyourmouth", label: "breathing through your mouth" },
  {
    value: "feelingofpressureforeheadorface",
    label: "a feeling of pressure in your forehead or face",
  },
];

const throatOptions = [
  { value: "normal", label: "normal" },
  { value: "dry", label: "dry" },
  { value: "soar", label: "soar" },
  { value: "difficultyswallow", label: "difficulty swallow" },
  { value: "obstructivefeeling", label: "obstructive feeling" },
  { value: "swollen", label: "swollen" },
];

const menstruationOptions = [
  { value: "normal", label: "normal" },
  { value: "absent", label: "absent" },
  { value: "irregular", label: "irregular" },
  { value: "usingpill", label: "using birth-control-pill" },
];

const leukorrheaOptions = [
  { value: "normal", label: "normal" },
  { value: "thick", label: "thick" },
  { value: "watery", label: "watery" },
  { value: "profuse", label: "profuse" },
  { value: "yellowish", label: "yellowish" },
  { value: "clear", label: "clear" },
  { value: "odor", label: "odor" },
];

const naturePainOptions = [
  { value: "distending", label: "distending" },
  {
    value: "sharp/pricking like needles",
    label: "sharp/pricking like needles",
  },
  { value: "dull", label: "dull" },
  { value: "hollow", label: "hollow" },
  { value: "fixed", label: "fixed" },
  { value: "movable", label: "movable" },
  { value: "lumb/numbness", label: "lumb/numbness" },
  { value: "distending", label: "distending" },
  {
    value: "sharp/pricking like needles",
    label: "sharp/pricking like needles",
  },
  { value: "nodule", label: "nodule" },
  { value: "dislike pressure", label: "dislike pressure" },
  { value: "prefer cold", label: "prefer cold" },
  { value: "prefer hot", label: "prefer hot" },
  { value: "radiating", label: "radiating" },
  { value: "weighty", label: "weighty" },
  { value: "colickly", label: "colickly" },
  { value: "burning", label: "burning" },
  { value: "normal", label: "normal" },
];

const emotionalStatusOptions = [
  { value: "normal", label: "normal" },
  { value: "unhappy/sad", label: "unhappy/sad" },
  { value: "happy", label: "happy" },
  { value: "stressed", label: "stressed" },
  { value: "depressed", label: "depressed" },
  { value: "lonely", label: "lonely" },
  { value: "melancholy", label: "melancholy" },
  { value: "angry", label: "angry" },
];

const heightOptions = [
  { value: "cm", label: "cm" },
  { value: "inch", label: "inch" },
  { value: "cm", label: "cm" },
  { value: "inch", label: "inch" },
];

const weightOptions = [
  { value: "kg", label: "kg" },
  { value: "lbs", label: "lbs" },
];

const tempratureOptions = [
  { value: "cm", label: "cm" },
  { value: "inch", label: "inch" },
];

function Interview({ index, setIndex }) {
  const [socialData, setSocialData] = useState(socialRelationshipOptions);
  const [showSocial, setShowSocial] = useState(false);
  const [socialRelation, setSocialRelation] = useState(
    "Select Social Relationship"
  );
  const [habitsData, setHabitsData] = useState(habitsOptions);
  const [showHabits, setShowHabits] = useState(false);
  const [habitsPlaceHolder, setHabitsPlaceholder] = useState("Select Habits");
  const [habitsValue, sethabitsValue] = useState([]);
  const [profession, setProfession] = useState("");
  const [employmentData, setEmploymentData] = useState(employmentStatusOptions);
  const [showEmployment, setShowEmployment] = useState(false);
  const [employmentPlaceHolder, setEmploymentPlaceholder] = useState(
    "Select Employment Status"
  );
  const [employmentValue, setEmploymentValue] = useState([]);
  const [sport, setSport] = useState("");
  const [sportData, setSportData] = useState(sportFrequency);
  const [showSport, setShowSport] = useState(false);
  const [sportPlaceHolder, setSportPlaceholder] = useState(
    "Select Sport Frequency"
  );
  const [sportsValue, setSportsValue] = useState([]);
  const [hobby, setHobby] = useState("");
  const [height, setHeight] = useState("");
  const [heightCm, setHeightCm] = useState(true);
  const [heightInch, setHeightInch] = useState(false);
  const [weight, setWeight] = useState("");
  const [weightKg, setWeightKg] = useState(true);
  const [weightLbs, setWeightLbs] = useState(false);
  const [bmi, setBmi] = useState("displayed BMI-value here");
  const [temperature, setTemperature] = useState("");
  const [tempC, setTempC] = useState(true);
  const [tempF, setTempF] = useState(false);
  const [feelingsData, setFeelingsData] = useState(thermalFeelingOptions);
  const [showFeeling, setShowFeeling] = useState(false);
  const [feelingPlaceHolder, setFeelingPlaceholder] = useState(
    "Select Thermal Feeling"
  );
  const [feelingsValue, setfeelingsValue] = useState([]);
  const [perspirationData, setPerspirationData] = useState(perspirationOptions);
  const [showPerspiration, setShowPerspiration] = useState(false);
  const [perspirationPlaceHolder, setPerspirationPlaceholder] = useState(
    "Select Perspiration"
  );
  const [perspirationValue, setPerspirationValue] = useState([]);
  const [appetiteData, setAppetiteData] = useState(appetiteOptions);
  const [showAppetite, setShowAppetite] = useState(false);
  const [appetitePlaceHolder, setAppetitePlaceholder] =
    useState("Select Appetite");
  const [appetiteValue, setAppetiteValue] = useState([]);
  const [appetiteNote, setAppetiteNote] = useState("");
  const [vommitingData, setVommitingData] = useState(vomittingOptions);
  const [showVomiting, setShowVomiting] = useState(false);
  const [vomitingPlaceHolder, setVomitingPlaceholder] =
    useState("Select Vomiting");
  const [vomitingValue, setVomitingValue] = useState([]);
  const [vomitingNote, setVomitingNote] = useState("");
  const [dietData, setDietData] = useState(dietOptions);
  const [showDiet, setShowDiet] = useState(false);
  const [dietPlaceHolder, setDietPlaceholder] = useState("Select Diet");
  const [dietValue, setDietValue] = useState([]);
  const [dietNote, setDietNote] = useState("");
  const [tastData, setTastData] = useState(tasteOptions);
  const [showTaste, setShowTaste] = useState(false);
  const [tastePlaceHolder, setTastePlaceholder] = useState("Select Taste");
  const [tasteValue, setTasteValue] = useState([]);
  const [thirstData, setThirstData] = useState(thirstOptions);
  const [showThirst, setShowThirst] = useState(false);
  const [thirstPlaceHolder, setThirstPlaceholder] = useState("Select Thirst");
  const [thirstValue, setThirstValue] = useState([]);
  const [stoolData, setStoolData] = useState(defecationOptions);
  const [showStool, setShowStool] = useState(false);
  const [stoolPlaceHolder, setStoolPlaceholder] = useState(
    "Select Defecation/Stool"
  );
  const [stoolValue, setStoolValue] = useState([]);
  const [urinationData, setUrinationData] = useState(urinationOptions);
  const [showUrination, setShowUrination] = useState(false);
  const [urinationPlaceHolder, setUrinationPlaceholder] =
    useState("Select Urination");
  const [urinationValue, setUrinationValue] = useState([]);
  const [urinationColorData, setUrinationColorData] = useState(
    urinationColorOptions
  );
  const [showUrinationColor, setShowUrinationColor] = useState(false);
  const [urinationColorPlaceHolder, setUrinationColorPlaceholder] = useState(
    "Select Urination Color"
  );
  const [urinationColorValue, setUrinationColorValue] = useState([]);
  const [sleepData, setSleepData] = useState(sleepOptions);
  const [showSleep, setShowSleep] = useState(false);
  const [sleepPlaceHolder, setSleepPlaceholder] = useState("Select Sleep");
  const [sleepValue, setSleepValue] = useState([]);
  const [headData, setHeadData] = useState(headOptions);
  const [showHead, setShowHead] = useState(false);
  const [headPlaceHolder, setHeadPlaceholder] = useState("Select Head");
  const [headValue, setHeadValue] = useState([]);
  const [eyesData, setEyesData] = useState(eyesOptions);
  const [showEyes, setShowEyes] = useState(false);
  const [eyesPlaceHolder, setEyesPlaceholder] = useState("Select Eyes");
  const [eyesValue, setEyesValue] = useState([]);
  const [earData, setEarData] = useState(earsOptions);
  const [showEar, setShowEar] = useState(false);
  const [earPlaceHolder, setEarPlaceholder] = useState("Select Ear");
  const [earValue, setEarValue] = useState([]);
  const [noseData, setNoseData] = useState(noseOptions);
  const [showNose, setShowNose] = useState(false);
  const [nosePlaceHolder, setNosePlaceholder] = useState("Select Nose");
  const [noseValue, setNoseValue] = useState([]);
  const [throatData, setThroatData] = useState(throatOptions);
  const [showThroat, setShowThroat] = useState(false);
  const [throatPlaceHolder, setThroatPlaceholder] = useState("Select Throat");
  const [throatValue, setThroatValue] = useState([]);
  const [menstruationData, setMenstruationData] = useState(menstruationOptions);
  const [showMenstruation, setShowMenstruation] = useState(false);
  const [menstruationPlaceHolder, setMenstruationPlaceholder] = useState(
    "Select Menstruation"
  );
  const [menstruationValue, setMenstruationValue] = useState([]);
  const [leukorreaData, setLeukorreaData] = useState(leukorrheaOptions);
  const [showLeukorrea, setShowLeukorrea] = useState(false);
  const [leukorreaPlaceHolder, setLeukorreaPlaceholder] =
    useState("Select Leukorrea");
  const [leukorreaValue, setLeukorreaValue] = useState([]);
  const [painLocality, setPainLocality] = useState("");
  const [painNatureData, setPainNatureData] = useState(naturePainOptions);
  const [showPainNature, setShowPainNature] = useState(false);
  const [painNaturePlaceHolder, setPainNaturePlaceholder] = useState(
    "Select Nature of Pain"
  );
  const [painNatureValue, setPainNatureValue] = useState([]);
  const [emotionalStatusData, setEmotionalStatusData] = useState(
    emotionalStatusOptions
  );
  const [showEmotionalStatus, setShowEmotionalStatus] = useState(false);
  const [emotionalStatusPlaceHolder, setEmotionalStatusPlaceholder] = useState(
    "Select Emotional Status"
  );
  const [emotionalStatusValue, setEmotionalStatusValue] = useState([]);
  const [emotionNote, setEmotionNote] = useState("");
  const [mind, setMind] = useState("");
  const [interviewNote, setInterviewNote] = useState("");
  const [heightValue, setHeightValue] = useState("cm");
  const [weightValue, setWeightValue] = useState("kg");
  const [tempValue, setTempValue] = useState("Celcius (°C)");
  const [classification, setClassification] = useState("");

  function habitValue(item) {
    habitsValue.push(item.label);
    console.log(item);
    sethabitsValue((prev) => [...habitsValue]);
  }

  function removeHabit(index) {
    habitsValue.splice(index, 1);
    sethabitsValue((prev) => [...habitsValue]);
  }

  function employValue(item) {
    employmentValue.push(item.label);
    setEmploymentValue((prev) => [...employmentValue]);
  }

  function removeEmploy(index) {
    employmentValue.splice(index, 1);
    setEmploymentValue((prev) => [...employmentValue]);
  }

  function sportValue(item) {
    sportsValue.push(item.label);
    setSportsValue((prev) => [...sportsValue]);
  }

  function removeSport(index) {
    sportsValue.splice(index, 1);
    setSportsValue((prev) => [...sportsValue]);
  }

  function feelingValue(item) {
    feelingsValue.push(item.label);
    setfeelingsValue((prev) => [...feelingsValue]);
  }

  function removeFeeling(index) {
    feelingsValue.splice(index, 1);
    setfeelingsValue((prev) => [...feelingsValue]);
  }

  function perspirationsValue(item) {
    perspirationValue.push(item.label);
    setPerspirationValue((prev) => [...perspirationValue]);
  }

  function removePerspiration(index) {
    perspirationValue.splice(index, 1);
    setPerspirationValue((prev) => [...perspirationValue]);
  }

  function appetitesValue(item) {
    appetiteValue.push(item.label);
    setAppetiteValue((prev) => [...appetiteValue]);
  }

  function removeAppetite(index) {
    appetiteValue.splice(index, 1);
    setAppetiteValue((prev) => [...appetiteValue]);
  }

  function vomitingsValue(item) {
    vomitingValue.push(item.label);
    setVomitingValue((prev) => [...vomitingValue]);
  }

  function removeVomiting(index) {
    vomitingValue.splice(index, 1);
    setVomitingValue((prev) => [...vomitingValue]);
  }

  function dietsValue(item) {
    dietValue.push(item.label);
    setDietValue((prev) => [...dietValue]);
  }

  function removeDiet(index) {
    dietValue.splice(index, 1);
    setDietValue((prev) => [...dietValue]);
  }

  function tastesValue(item) {
    tasteValue.push(item.label);
    setTasteValue((prev) => [...tasteValue]);
  }

  function removeTaste(index) {
    tasteValue.splice(index, 1);
    setTasteValue((prev) => [...tasteValue]);
  }

  function thirstsValue(item) {
    thirstValue.push(item.label);
    setThirstValue((prev) => [...thirstValue]);
  }

  function removeThirst(index) {
    thirstValue.splice(index, 1);
    setThirstValue((prev) => [...thirstValue]);
  }

  function stoolsValue(item) {
    stoolValue.push(item.label);
    setStoolValue((prev) => [...stoolValue]);
  }

  function removeStool(index) {
    stoolValue.splice(index, 1);
    setStoolValue((prev) => [...stoolValue]);
  }

  function urinationsValue(item) {
    urinationValue.push(item.label);
    setUrinationValue((prev) => [...urinationValue]);
  }

  function removeUrination(index) {
    urinationValue.splice(index, 1);
    setUrinationValue((prev) => [...urinationValue]);
  }

  function urinationColorsValue(item) {
    urinationColorValue.push(item.label);
    setUrinationColorValue((prev) => [...urinationColorValue]);
  }

  function removeUrinationColor(index) {
    urinationColorValue.splice(index, 1);
    setUrinationColorValue((prev) => [...urinationColorValue]);
  }

  function sleepsValue(item) {
    sleepValue.push(item.label);
    setSleepValue((prev) => [...sleepValue]);
  }

  function removeSleep(index) {
    sleepValue.splice(index, 1);
    setSleepValue((prev) => [...sleepValue]);
  }

  function headsValue(item) {
    headValue.push(item.label);
    setHeadValue((prev) => [...headValue]);
  }

  function removeHead(index) {
    headValue.splice(index, 1);
    setHeadValue((prev) => [...headValue]);
  }

  function eyessValue(item) {
    eyesValue.push(item.label);
    setEyesValue((prev) => [...eyesValue]);
  }

  function removeEyes(index) {
    eyesValue.splice(index, 1);
    setEyesValue((prev) => [...eyesValue]);
  }

  function earsValue(item) {
    earValue.push(item.label);
    setEarValue((prev) => [...earValue]);
  }

  function removeEar(index) {
    earValue.splice(index, 1);
    setEarValue((prev) => [...earValue]);
  }

  function nosesValue(item) {
    noseValue.push(item.label);
    setNoseValue((prev) => [...noseValue]);
  }

  function removeNose(index) {
    noseValue.splice(index, 1);
    setNoseValue((prev) => [...noseValue]);
  }

  function throatsValue(item) {
    throatValue.push(item.label);
    setThroatValue((prev) => [...throatValue]);
  }

  function removeThroat(index) {
    throatValue.splice(index, 1);
    setThroatValue((prev) => [...throatValue]);
  }

  function menstruationsValue(item) {
    menstruationValue.push(item.label);
    setMenstruationValue((prev) => [...menstruationValue]);
  }

  function removeMenstruation(index) {
    menstruationValue.splice(index, 1);
    setMenstruationValue((prev) => [...menstruationValue]);
  }

  function leukorreasValue(item) {
    leukorreaValue.push(item.label);
    setLeukorreaValue((prev) => [...leukorreaValue]);
  }

  function removeLeukorrea(index) {
    leukorreaValue.splice(index, 1);
    setLeukorreaValue((prev) => [...leukorreaValue]);
  }

  function painNaturesValue(item) {
    painNatureValue.push(item.label);
    setPainNatureValue((prev) => [...painNatureValue]);
  }

  function removePainNature(index) {
    painNatureValue.splice(index, 1);
    setPainNatureValue((prev) => [...painNatureValue]);
  }

  function emotionalStatusValues(item) {
    emotionalStatusValue.push(item.label);
    setEmotionalStatusValue((prev) => [...emotionalStatusValue]);
  }

  function removeEmotionalStatus(index) {
    emotionalStatusValue.splice(index, 1);
    setEmotionalStatusValue((prev) => [...emotionalStatusValue]);
  }
  return (
    <View style={styles.scene}>
      <Text style={styles.headingText}>Interview</Text>
      <Text style={styles.historyInnerTitle}>Lifestyle</Text>
      <View style={styles.separator} />
      <View style={{ marginHorizontal: "4%" }}>
        <Text style={styles.pickerTitleText}>Social Relationship :</Text>
        <SingleSelect
          value={socialRelation}
          data={socialData}
          state={showSocial}
          onPress={() => setShowSocial(!showSocial)}
          onPressItem={(item) => {
            setSocialRelation(item.label), setShowSocial(false);
          }}
        />
        <Text style={styles.pickerTitleText}>Habits :</Text>
        {habitsValue.length != 0 ? (
          <View style={styles.listView}>
            {habitsValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeHabit(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={habitsValue}
          data={habitsData}
          state={showHabits}
          placeholder={habitsPlaceHolder}
          onPress={() => setShowHabits(!showHabits)}
          onPressItem={(item) => habitValue(item)}
        />
        <Input
          title="Profession :"
          placeholder="Your profession"
          value={profession}
          onChangeText={(text) => setProfession(text)}
        />
        <Text style={styles.pickerTitleText}>Employment Status :</Text>
        {employmentValue.length != 0 ? (
          <View style={styles.listView}>
            {employmentValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeEmploy(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={employmentValue}
          data={employmentData}
          state={showEmployment}
          placeholder={employmentPlaceHolder}
          onPress={() => setShowEmployment(!showEmployment)}
          onPressItem={(item) => employValue(item)}
        />
        <Input
          title="Sport :"
          placeholder="Sport of patient"
          value={sport}
          onChangeText={(text) => setSport(text)}
        />
        <Text style={styles.pickerTitleText}>Sport Frequency :</Text>
        {sportsValue.length != 0 ? (
          <View style={styles.listView}>
            {sportsValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeSport(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={sportsValue}
          data={sportData}
          state={showSport}
          placeholder={sportPlaceHolder}
          onPress={() => setShowSport(!showSport)}
          onPressItem={(item) => sportValue(item)}
        />
        <MultiInput
          title="Hobby :"
          placeholder="Your hobbies..."
          value={hobby}
          onChangeText={(text) => setHobby(text)}
        />
      </View>
      <Text style={styles.historyInnerTitle}>
        Inquiring for physical constitution
      </Text>
      <View style={styles.separator} />
      <View style={{ marginHorizontal: "4%" }}>
        <View
          style={{
            flexDirection: "row",
            width: "92%",
            justifyContent: "space-between",
            marginLeft: "2.5%",
          }}
        >
          <View style={{ width: "60%" }}>
            <Input
              title="Height :"
              placeholder="height"
              value={height}
              onChangeText={(text) => setHeight(text)}
            />
          </View>
          <View
            style={{
              width: "35%",
              height: 42,
              marginTop: 37,
              borderColor: colors.inputPlaceHolder,
              borderWidth: 1,
              borderRadius: 6,
            }}
          >
            <Picker
              selectedValue={heightValue}
              style={{ height: 42 }}
              onValueChange={(itemValue, itemIndex) =>
                setHeightValue(itemValue)
              }
            >
              <Picker.Item label="cm" value="cm" />
              <Picker.Item label="inch" value="inch" />
            </Picker>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "92%",
            justifyContent: "space-between",
            marginLeft: "2.5%",
          }}
        >
          <View style={{ width: "60%" }}>
            <Input
              title="Weight :"
              placeholder="weight"
              value={weight}
              onChangeText={(text) => setWeight(text)}
            />
          </View>
          <View
            style={{
              width: "35%",
              height: 42,
              marginTop: 37,
              borderColor: colors.inputPlaceHolder,
              borderWidth: 1,
              borderRadius: 6,
            }}
          >
            <Picker
              selectedValue={weightValue}
              style={{ height: 42 }}
              onValueChange={(itemValue, itemIndex) =>
                setWeightValue(itemValue)
              }
            >
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="lbs" value="lbs" />
            </Picker>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "92%",
            justifyContent: "space-between",
            marginLeft: "2.5%",
          }}
        >
          <View style={{ width: "60%" }}>
            <Input
              title="Temperature :"
              placeholder="0"
              value={temperature}
              onChangeText={(text) => setTemperature(text)}
            />
          </View>
          <View
            style={{
              width: "35%",
              height: 42,
              marginTop: 37,
              borderColor: colors.inputPlaceHolder,
              borderWidth: 1,
              borderRadius: 6,
            }}
          >
            <Picker
              selectedValue={tempValue}
              style={{ height: 42 }}
              onValueChange={(itemValue, itemIndex) =>
                setHeightValue(itemValue)
              }
            >
              <Picker.Item label="Celcius (°C)" value="Celcius (°C)" />
              <Picker.Item label="Fahrenheit (°F)" value="Fahrenheit (°F)" />
            </Picker>
          </View>
        </View>

        <Input title="BMI :" placeholder={bmi} value={bmi} editable="false" />

        <Input
          title="Classification :"
          placeholder={"BMI classification..."}
          value={classification}
          onChangeText={(text) => setClassification(text)}
        />

        <Text style={styles.pickerTitleText}>1. Thermal Feeling :</Text>
        {feelingsValue.length != 0 ? (
          <View style={styles.listView}>
            {feelingsValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeFeeling(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={feelingsValue}
          data={feelingsData}
          state={showFeeling}
          placeholder={feelingPlaceHolder}
          onPress={() => setShowFeeling(!showFeeling)}
          onPressItem={(item) => feelingValue(item)}
        />
        <Text style={styles.pickerTitleText}>2. Perspiration :</Text>
        {perspirationValue.length != 0 ? (
          <View style={styles.listView}>
            {perspirationValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removePerspiration(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={perspirationValue}
          data={perspirationData}
          state={showPerspiration}
          placeholder={perspirationPlaceHolder}
          onPress={() => setShowPerspiration(!showPerspiration)}
          onPressItem={(item) => perspirationsValue(item)}
        />
        {width < 450 ? (
          <View>
            <Text style={styles.pickerTitleText}>3. Appetite :</Text>
            {appetiteValue.length != 0 ? (
              <View style={styles.listView}>
                {appetiteValue.map((element, index) => (
                  <View
                    style={{
                      minHeight: 35,
                      backgroundColor: colors.pickerBackColor,
                      justifyContent: "space-between",
                      borderRadius: 5,
                      flexDirection: "row",
                      marginTop: 4,
                      marginRight: 4,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 14, color: colors.inputTitleColor }}
                    >
                      {element}
                    </Text>
                    <TouchableOpacity onPress={() => removeAppetite(index)}>
                      <Icon
                        name="closecircle"
                        style={{ marginLeft: 20 }}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : null}
            <MultiSelect
              value={appetiteValue}
              data={appetiteData}
              state={showAppetite}
              placeholder={appetitePlaceHolder}
              onPress={() => setShowAppetite(!showAppetite)}
              onPressItem={(item) => appetitesValue(item)}
            />

            <MultiInput
              title="Note for appetite :"
              placeholder="Your additional information for appetite..."
              value={appetiteNote}
              onChangeText={(text) => setAppetiteNote(text)}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              width: "92%",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <View style={{ width: "40%" }}>
              <Text style={styles.pickerTitleText}>3. Appetite :</Text>
              {appetiteValue.length != 0 ? (
                <View style={styles.listView}>
                  {appetiteValue.map((element, index) => (
                    <View
                      style={{
                        minHeight: 35,
                        backgroundColor: colors.pickerBackColor,
                        justifyContent: "space-between",
                        borderRadius: 5,
                        flexDirection: "row",
                        marginTop: 4,
                        marginRight: 4,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontSize: 14, color: colors.inputTitleColor }}
                      >
                        {element}
                      </Text>
                      <TouchableOpacity onPress={() => removeAppetite(index)}>
                        <Icon
                          name="closecircle"
                          style={{ marginLeft: 20 }}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : null}
              <View style={{ height: showAppetite ? 200 : undefined }}>
                <MultiSelect
                  value={appetiteValue}
                  data={appetiteData}
                  state={showAppetite}
                  placeholder={appetitePlaceHolder}
                  onPress={() => setShowAppetite(!showAppetite)}
                  onPressItem={(item) => appetitesValue(item)}
                />
              </View>
            </View>
            <View style={{ width: "50%" }}>
              <MultiInput
                title="Note for appetite :"
                placeholder="Your additional information for appetite..."
                value={appetiteNote}
                onChangeText={(text) => setAppetiteNote(text)}
              />
            </View>
          </View>
        )}
        {width < 450 ? (
          <View>
            <Text style={styles.pickerTitleText}>4. Vomiting :</Text>
            {vomitingValue.length != 0 ? (
              <View style={styles.listView}>
                {vomitingValue.map((element, index) => (
                  <View
                    style={{
                      minHeight: 35,
                      backgroundColor: colors.pickerBackColor,
                      justifyContent: "space-between",
                      borderRadius: 5,
                      flexDirection: "row",
                      marginTop: 4,
                      marginRight: 4,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 14, color: colors.inputTitleColor }}
                    >
                      {element}
                    </Text>
                    <TouchableOpacity onPress={() => removeVomiting(index)}>
                      <Icon
                        name="closecircle"
                        style={{ marginLeft: 20 }}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : null}
            <MultiSelect
              value={vomitingValue}
              data={vommitingData}
              state={showVomiting}
              placeholder={vomitingPlaceHolder}
              onPress={() => setShowVomiting(!showVomiting)}
              onPressItem={(item) => vomitingsValue(item)}
            />
            <MultiInput
              title="Note for vomiting :"
              placeholder="Your additional information for vomiting..."
              value={vomitingNote}
              onChangeText={(text) => setVomitingNote(text)}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              width: "92%",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <View style={{ width: "40%" }}>
              <Text style={styles.pickerTitleText}>4. Vomiting :</Text>
              {vomitingValue.length != 0 ? (
                <View style={styles.listView}>
                  {vomitingValue.map((element, index) => (
                    <View
                      style={{
                        minHeight: 35,
                        backgroundColor: colors.pickerBackColor,
                        justifyContent: "space-between",
                        borderRadius: 5,
                        flexDirection: "row",
                        marginTop: 4,
                        marginRight: 4,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontSize: 14, color: colors.inputTitleColor }}
                      >
                        {element}
                      </Text>
                      <TouchableOpacity onPress={() => removeVomiting(index)}>
                        <Icon
                          name="closecircle"
                          style={{ marginLeft: 20 }}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : null}
              <View style={{ height: showVomiting ? 200 : undefined }}>
                <MultiSelect
                  value={vomitingValue}
                  data={vommitingData}
                  state={showVomiting}
                  placeholder={vomitingPlaceHolder}
                  onPress={() => setShowVomiting(!showVomiting)}
                  onPressItem={(item) => vomitingsValue(item)}
                />
              </View>
            </View>
            <View style={{ width: "50%" }}>
              <MultiInput
                title="Note for vomiting :"
                placeholder="Your additional information for vomiting..."
                value={vomitingNote}
                onChangeText={(text) => setVomitingNote(text)}
              />
            </View>
          </View>
        )}
        <Text style={styles.pickerTitleText}>5. Diet :</Text>
        {dietValue.length != 0 ? (
          <View style={styles.listView}>
            {dietValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeDiet(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={dietValue}
          data={dietData}
          state={showDiet}
          placeholder={dietPlaceHolder}
          onPress={() => setShowDiet(!showDiet)}
          onPressItem={(item) => dietsValue(item)}
        />
        <MultiInput
          title="Note for diet :"
          placeholder="Your additional information for diet..."
          value={dietNote}
          onChangeText={(text) => setDietNote(text)}
        />
        <Text style={styles.pickerTitleText}>6. Taste :</Text>
        {tasteValue.length != 0 ? (
          <View style={styles.listView}>
            {tasteValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeTaste(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={tasteValue}
          data={tastData}
          state={showTaste}
          placeholder={tastePlaceHolder}
          onPress={() => setShowTaste(!showTaste)}
          onPressItem={(item) => tastesValue(item)}
        />
        <Text style={styles.pickerTitleText}>7. Thirst :</Text>
        {thirstValue.length != 0 ? (
          <View style={styles.listView}>
            {thirstValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeThirst(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={thirstValue}
          data={thirstData}
          state={showThirst}
          placeholder={thirstPlaceHolder}
          onPress={() => setShowThirst(!showThirst)}
          onPressItem={(item) => thirstsValue(item)}
        />
        <Text style={styles.pickerTitleText}>8. Defecation/Stool :</Text>
        {stoolValue.length != 0 ? (
          <View style={styles.listView}>
            {stoolValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeStool(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={stoolValue}
          data={stoolData}
          state={showStool}
          placeholder={stoolPlaceHolder}
          onPress={() => setShowStool(!showStool)}
          onPressItem={(item) => stoolsValue(item)}
        />
        <Text style={styles.pickerTitleText}>9. Urination :</Text>
        {urinationValue.length != 0 ? (
          <View style={styles.listView}>
            {urinationValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeUrination(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={urinationValue}
          data={urinationData}
          state={showUrination}
          placeholder={urinationPlaceHolder}
          onPress={() => setShowUrination(!showUrination)}
          onPressItem={(item) => urinationsValue(item)}
        />

        <Text style={styles.pickerTitleText}>10. Urination-color :</Text>
        {urinationColorValue.length != 0 ? (
          <View style={styles.listView}>
            {urinationColorValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeUrinationColor(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={urinationColorValue}
          data={urinationColorData}
          state={showUrinationColor}
          placeholder={urinationColorPlaceHolder}
          onPress={() => setShowUrinationColor(!showUrinationColor)}
          onPressItem={(item) => urinationColorsValue(item)}
        />
        <Text style={styles.pickerTitleText}>11. Sleep :</Text>
        {sleepValue.length != 0 ? (
          <View style={styles.listView}>
            {sleepValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeSleep(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={sleepValue}
          data={sleepData}
          state={showSleep}
          placeholder={sleepPlaceHolder}
          onPress={() => setShowSleep(!showSleep)}
          onPressItem={(item) => sleepsValue(item)}
        />
        <Text style={styles.pickerTitleText}>12. Head :</Text>
        {headValue.length != 0 ? (
          <View style={styles.listView}>
            {headValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeHead(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={headValue}
          data={headData}
          state={showHead}
          placeholder={headPlaceHolder}
          onPress={() => setShowHead(!showHead)}
          onPressItem={(item) => headsValue(item)}
        />
        <Text style={styles.pickerTitleText}>13. Eyes :</Text>
        {eyesValue.length != 0 ? (
          <View style={styles.listView}>
            {eyesValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeEyes(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={eyesValue}
          data={eyesData}
          state={showEyes}
          placeholder={eyesPlaceHolder}
          onPress={() => setShowEyes(!showEyes)}
          onPressItem={(item) => eyessValue(item)}
        />
        <Text style={styles.pickerTitleText}>14. Ear :</Text>
        {earValue.length != 0 ? (
          <View style={styles.listView}>
            {earValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeEar(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={earValue}
          data={earData}
          state={showEar}
          placeholder={earPlaceHolder}
          onPress={() => setShowEar(!showEar)}
          onPressItem={(item) => earsValue(item)}
        />
        <Text style={styles.pickerTitleText}>15. Nose :</Text>
        {noseValue.length != 0 ? (
          <View style={styles.listView}>
            {noseValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeNose(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={noseValue}
          data={noseData}
          state={showNose}
          placeholder={nosePlaceHolder}
          onPress={() => setShowNose(!showNose)}
          onPressItem={(item) => nosesValue(item)}
        />
        <Text style={styles.pickerTitleText}>16. Throat :</Text>
        {throatValue.length != 0 ? (
          <View style={styles.listView}>
            {throatValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeThroat(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={throatValue}
          data={throatData}
          state={showThroat}
          placeholder={throatPlaceHolder}
          onPress={() => setShowThroat(!showThroat)}
          onPressItem={(item) => throatsValue(item)}
        />
        <Text style={styles.pickerTitleText}>17. Menstruation :</Text>
        {menstruationValue.length != 0 ? (
          <View style={styles.listView}>
            {menstruationValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeMenstruation(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={menstruationValue}
          data={menstruationData}
          state={showMenstruation}
          placeholder={menstruationPlaceHolder}
          onPress={() => setShowMenstruation(!showMenstruation)}
          onPressItem={(item) => menstruationsValue(item)}
        />
        <Text style={styles.pickerTitleText}>18. Leukorrea :</Text>
        {leukorreaValue.length != 0 ? (
          <View style={styles.listView}>
            {leukorreaValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeLeukorrea(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={leukorreaValue}
          data={leukorreaData}
          state={showLeukorrea}
          placeholder={leukorreaPlaceHolder}
          onPress={() => setShowLeukorrea(!showLeukorrea)}
          onPressItem={(item) => leukorreasValue(item)}
        />
        <Input
          title="19. Locality of Pain :"
          placeholder="Type in location of your pain..."
          value={painLocality}
          onChangeText={(text) => setPainLocality(text)}
        />
        <Text style={styles.pickerTitleText}>20. Nature of Pain :</Text>
        {painNatureValue.length != 0 ? (
          <View style={styles.listView}>
            {painNatureValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removePainNature(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={painNatureValue}
          data={painNatureData}
          state={showPainNature}
          placeholder={painNaturePlaceHolder}
          onPress={() => setShowPainNature(!showPainNature)}
          onPressItem={(item) => painNaturesValue(item)}
        />
        <Text style={styles.pickerTitleText}>21. Emotional Status :</Text>
        {emotionalStatusValue.length != 0 ? (
          <View style={styles.listView}>
            {emotionalStatusValue.map((element, index) => (
              <View
                style={{
                  minHeight: 35,
                  backgroundColor: colors.pickerBackColor,
                  justifyContent: "space-between",
                  borderRadius: 5,
                  flexDirection: "row",
                  marginTop: 4,
                  marginRight: 4,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.inputTitleColor }}>
                  {element}
                </Text>
                <TouchableOpacity onPress={() => removeEmotionalStatus(index)}>
                  <Icon
                    name="closecircle"
                    style={{ marginLeft: 20 }}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        <MultiSelect
          value={emotionalStatusValue}
          data={emotionalStatusData}
          state={showEmotionalStatus}
          placeholder={emotionalStatusPlaceHolder}
          onPress={() => setShowEmotionalStatus(!showEmotionalStatus)}
          onPressItem={(item) => emotionalStatusValues(item)}
        />
        <MultiInput
          title="Note for Emotion :"
          placeholder="Type in additional information for emotions..."
          value={emotionNote}
          onChangeText={(text) => setEmotionNote(text)}
        />
        <MultiInput
          title="22. Mind :"
          placeholder="State of mind of patient..."
          value={mind}
          onChangeText={(text) => setMind(text)}
        />
        <MultiInput
          title="Note for Interview :"
          placeholder="Type additional information of interview..."
          value={interviewNote}
          onChangeText={(text) => setInterviewNote(text)}
        />
        <View style={[styles.bottomButtonsView, { marginLeft: "auto" }]}>
          <TouchableOpacity
            onPress={() => setIndex(index - 1)}
            style={[styles.nextButton, { marginRight: 20 }]}
          >
            <Text style={[styles.addFamilyRoleText, { marginHorizontal: 15 }]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIndex(index + 1)}
            style={styles.nextButton}
          >
            <Text style={[styles.addFamilyRoleText, { marginHorizontal: 15 }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function InspectionAndExamination({ index, setIndex }) {
  const [notesAppearance, setNotesAppearance] = useState("");
  const [notesPhysicalExamination, setNotesPhysicalExamination] = useState("");
  const [notesPalpationOfTheEpigastrium, setNotesPalpationOfTheEpigastrium] =
    useState("");
  const [arrayValue, setArrayValue] = useState({
    dataRespiration: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "lower",
        label: "lower",
      },
      {
        value: "heavy feeble",
        label: "heavy feeble",
      },
    ],
    dataSpeech: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "shallow",
        label: "shallow",
      },
      {
        value: "louder",
        label: "louder",
      },
      {
        value: "feeble",
        label: "feeble",
      },
    ],
    dataCough: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "coarse",
        label: "coarse",
      },
      {
        value: "feeble",
        label: "feeble",
      },
      {
        value: "spurum",
        label: "spurum",
      },
      {
        value: "dry",
        label: "dry",
      },
    ],
    dataOdor: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "stinky",
        label: "stinky",
      },
      {
        value: "foul",
        label: "foul",
      },
      {
        value: "sour",
        label: "sour",
      },
    ],
    dataVitality: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "dispirited",
        label: "dispirited",
      },
      {
        value: "hyperactive depressed",
        label: "hyperactive depressed",
      },
      {
        value: "anxious",
        label: "anxious",
      },
      {
        value: "stressed",
        label: "stressed",
      },
    ],
    dataAppearance: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "heavy",
        label: "heavy",
      },
      {
        value: "fat",
        label: "fat",
      },
      {
        value: "medium",
        label: "medium",
      },
      {
        value: "slim",
        label: "slim",
      },
      {
        value: "strong",
        label: "strong",
      },
      {
        value: "weak",
        label: "weak",
      },
    ],
    dataColorAndLustreOfFace: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "pale",
        label: "pale",
      },
      {
        value: "yellow",
        label: "yellow",
      },
      {
        value: "red",
        label: "red",
      },
      {
        value: "blue",
        label: "blue",
      },
      {
        value: "dark-gray",
        label: "dark-gray",
      },
    ],
    dataPhysicalAppearance: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "discoloration",
        label: "discoloration",
      },
      {
        value: "swelling",
        label: "swelling",
      },
      {
        value: "edema",
        label: "edema",
      },
      {
        value: "atrophy",
        label: "atrophy",
      },
    ],
    dataPalpationOfTheEpigastrium: [
      {
        value: "normal",
        label: "normal",
      },
      {
        value: "hard",
        label: "hard",
      },
      {
        value: "soft",
        label: "soft",
      },
    ],
    dataRangeOfMotion: [
      {
        value: "cervical",
        label: "cervical",
      },
      {
        value: "lumbar",
        label: "lumbar",
      },
      {
        value: "shoulder",
        label: "shoulder",
      },
      {
        value: "elbow",
        label: "elbow",
      },
      {
        value: "hip",
        label: "hip",
      },
    ],
    dataPainGradations: [
      {
        value: "1",
        label: "1",
      },
      {
        value: "2",
        label: "2",
      },
      {
        value: "3",
        label: "3",
      },
      {
        value: "4",
        label: "4",
      },
      {
        value: "5",
        label: "5",
      },
      {
        value: "6",
        label: "6",
      },
      {
        value: "7",
        label: "7",
      },
      {
        value: "8",
        label: "8",
      },
      {
        value: "9",
        label: "9",
      },
      {
        value: "10",
        label: "10",
      },
    ],
    respirationValue: "Select respiration...",
    speechValue: "Select speech...",
    coughValue: "Select cough...",
    odorValue: "Select odor...",
    vitalityValue: "Select vitality...",
    appearanceValue: "Select appearance...",
    colorAndLustreOfFaceValue: "Select color and lustre of face...",
    physicalAppearanceValue: "Select emotional status...",
    palpationOfTheEpigastriumValue: "Select emotional status...",
    rangeOfMotionValue: "Select range of motion...",
    painGradationsValue: "Select pain gradations...",
    showOptionsRespiration: false,
    showOptionsSpeech: false,
    showOptionsCough: false,
    showOptionsOdor: false,
    showOptionsVitality: false,
    showOptionsAppearance: false,
    showOptionsColorAndLustreOfFace: false,
    showOptionsPhysicalAppearance: false,
    showOptionsPalpationOfTheEpigastrium: false,
    showOptionsRangeOfMotion: false,
    showOptionsPainGradations: false,
  });
  const showPickerRespiration = () => {
    arrayValue.showOptionsRespiration = !arrayValue.showOptionsRespiration;
    setArrayValue({ ...arrayValue });
  };
  const showPickerSpeech = () => {
    arrayValue.showOptionsSpeech = !arrayValue.showOptionsSpeech;
    setArrayValue({ ...arrayValue });
  };
  const showPickerCough = () => {
    arrayValue.showOptionsCough = !arrayValue.showOptionsCough;
    setArrayValue({ ...arrayValue });
  };
  const showPickerOdor = () => {
    arrayValue.showOptionsOdor = !arrayValue.showOptionsOdor;
    setArrayValue({ ...arrayValue });
  };
  const showPickerVitality = () => {
    arrayValue.showOptionsVitality = !arrayValue.showOptionsVitality;
    setArrayValue({ ...arrayValue });
  };
  const showPickerAppearance = () => {
    arrayValue.showOptionsAppearance = !arrayValue.showOptionsAppearance;
    setArrayValue({ ...arrayValue });
  };
  const showPickerColorAndLustreOfFace = () => {
    arrayValue.showOptionsColorAndLustreOfFace =
      !arrayValue.showOptionsColorAndLustreOfFace;
    setArrayValue({ ...arrayValue });
  };
  const showPickerPhysicalAppearance = () => {
    arrayValue.showOptionsPhysicalAppearance =
      !arrayValue.showOptionsPhysicalAppearance;
    setArrayValue({ ...arrayValue });
  };
  const showPickerPalpationOfTheEpigastrium = () => {
    arrayValue.showOptionsPalpationOfTheEpigastrium =
      !arrayValue.showOptionsPalpationOfTheEpigastrium;
    setArrayValue({ ...arrayValue });
  };
  const showPickerRangeOfMotion = () => {
    arrayValue.showOptionsRangeOfMotion = !arrayValue.showOptionsRangeOfMotion;
    setArrayValue({ ...arrayValue });
  };
  const showPickerPainGradations = () => {
    arrayValue.showOptionsPainGradations =
      !arrayValue.showOptionsPainGradations;
    setArrayValue({ ...arrayValue });
  };
  const setRespirationOption = (item) => {
    arrayValue.respirationValue = item.value;
    arrayValue.showOptionsRespiration = false;
    setArrayValue({ ...arrayValue });
  };
  const setSpeechOption = (item) => {
    arrayValue.speechValue = item.value;
    arrayValue.showOptionsSpeech = false;
    setArrayValue({ ...arrayValue });
  };
  const setCoughOption = (item) => {
    arrayValue.coughValue = item.value;
    arrayValue.showOptionsCough = false;
    setArrayValue({ ...arrayValue });
  };
  const setOdorOption = (item) => {
    arrayValue.odorValue = item.value;
    arrayValue.showOptionsOdor = false;
    setArrayValue({ ...arrayValue });
  };
  const setVitalityOption = (item) => {
    arrayValue.vitalityValue = item.value;
    arrayValue.showOptionsVitality = false;
    setArrayValue({ ...arrayValue });
  };
  const setAppearanceOption = (item) => {
    arrayValue.appearanceValue = item.value;
    arrayValue.showOptionsAppearance = false;
    setArrayValue({ ...arrayValue });
  };
  const setColorAndLustreOfFaceOption = (item) => {
    arrayValue.colorAndLustreOfFaceValue = item.value;
    arrayValue.showOptionsColorAndLustreOfFace = false;
    setArrayValue({ ...arrayValue });
  };
  const setPhysicalAppearanceOption = (item) => {
    arrayValue.physicalAppearanceValue = item.value;
    arrayValue.showOptionsPhysicalAppearance = false;
    setArrayValue({ ...arrayValue });
  };
  const setPalpationOfTheEpigastriumOption = (item) => {
    arrayValue.palpationOfTheEpigastriumValue = item.value;
    arrayValue.showOptionsPalpationOfTheEpigastrium = false;
    setArrayValue({ ...arrayValue });
  };
  const setRangeOfMotionOption = (item) => {
    arrayValue.rangeOfMotionValue = item.value;
    arrayValue.showOptionsRangeOfMotion = false;
    setArrayValue({ ...arrayValue });
  };
  const setPainGradationsOption = (item) => {
    arrayValue.painGradationsValue = item.value;
    arrayValue.showOptionsPainGradations = false;
    setArrayValue({ ...arrayValue });
  };

  return (
    <View style={styles.scene}>
      <Text style={styles.headingText}>Inspection & Examination</Text>
      <Text style={styles.historyInnerTitle}>Listening And Smelling</Text>
      <View style={styles.separator} />
      <View
        style={{
          marginHorizontal: "4%",
        }}
      >
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Respiration :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.respirationValue}
              data={arrayValue.dataRespiration}
              state={arrayValue.showOptionsRespiration}
              onPress={() => showPickerRespiration()}
              onPressItem={(item) => setRespirationOption(item)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Speech :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.speechValue}
              data={arrayValue.dataSpeech}
              state={arrayValue.showOptionsSpeech}
              onPress={() => showPickerSpeech()}
              onPressItem={(item) => setSpeechOption(item)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Cough :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.coughValue}
              data={arrayValue.dataCough}
              state={arrayValue.showOptionsCough}
              onPress={() => showPickerCough()}
              onPressItem={(item) => setCoughOption(item)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Odor :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.odorValue}
              data={arrayValue.dataOdor}
              state={arrayValue.showOptionsOdor}
              onPress={() => showPickerOdor()}
              onPressItem={(item) => setOdorOption(item)}
            />
          </View>
        </View>
      </View>
      <Text style={styles.historyInnerTitle}>Observation</Text>
      <View style={styles.separator} />
      <View
        style={{
          marginHorizontal: "4%",
        }}
      >
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Vitality :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.vitalityValue}
              data={arrayValue.dataVitality}
              state={arrayValue.showOptionsVitality}
              onPress={() => showPickerVitality()}
              onPressItem={(item) => setVitalityOption(item)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Appearance :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.appearanceValue}
              data={arrayValue.dataAppearance}
              state={arrayValue.showOptionsAppearance}
              onPress={() => showPickerAppearance()}
              onPressItem={(item) => setAppearanceOption(item)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Color and Lustre of Face :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.colorAndLustreOfFaceValue}
              data={arrayValue.dataColorAndLustreOfFace}
              state={arrayValue.showOptionsColorAndLustreOfFace}
              onPress={() => showPickerColorAndLustreOfFace()}
              onPressItem={(item) => setColorAndLustreOfFaceOption(item)}
            />
          </View>
        </View>
      </View>
      <Text style={styles.historyInnerTitle}>Physical Examination</Text>
      <View style={styles.separator} />
      <View
        style={{
          marginHorizontal: "4%",
        }}
      >
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Physical Appearance :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.physicalAppearanceValue}
              data={arrayValue.dataPhysicalAppearance}
              state={arrayValue.showOptionsPhysicalAppearance}
              onPress={() => showPickerPhysicalAppearance()}
              onPressItem={(item) => setPhysicalAppearanceOption(item)}
            />
          </View>
        </View>
        <MultiInput
          title="Note of Appearance :"
          placeholder="Type additional information for Appearance..."
          value={notesAppearance}
          onChangeText={(text) => setNotesAppearance(text)}
        />
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>
            Palpation of the Epigastrium :
          </Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.palpationOfTheEpigastriumValue}
              data={arrayValue.dataPalpationOfTheEpigastrium}
              state={arrayValue.showOptionsPalpationOfTheEpigastrium}
              onPress={() => showPickerPalpationOfTheEpigastrium()}
              onPressItem={(item) => setPalpationOfTheEpigastriumOption(item)}
            />
          </View>
        </View>
        <MultiInput
          title="Note of Palpation of the Epigastrium :"
          placeholder="Type additional information for Palpation of the Epigastrium..."
          value={notesPalpationOfTheEpigastrium}
          onChangeText={(text) => setNotesPalpationOfTheEpigastrium(text)}
        />
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Range of motion :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.rangeOfMotionValue}
              data={arrayValue.dataRangeOfMotion}
              state={arrayValue.showOptionsRangeOfMotion}
              onPress={() => showPickerRangeOfMotion()}
              onPressItem={(item) => setRangeOfMotionOption(item)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.pickerTitleText}>Pain gradations :</Text>
          <View
            style={{
              marginRight: width < 450 ? "5%" : "20%",
              width: width < 450 ? "100%" : "40%",
            }}
          >
            <SingleSelect
              value={arrayValue.painGradationsValue}
              data={arrayValue.dataPainGradations}
              state={arrayValue.showOptionsPainGradations}
              onPress={() => showPickerPainGradations()}
              onPressItem={(item) => setPainGradationsOption(item)}
            />
          </View>
        </View>
        <MultiInput
          title="Note for Physical Examination :"
          placeholder="Type in additional information for Physical Examination..."
          value={notesPhysicalExamination}
          onChangeText={(text) => setNotesPhysicalExamination(text)}
        />
      </View>
      <View
        style={{
          ...styles.bottomButtonsView,
          marginLeft: "auto",
          marginRight: "9%",
        }}
      >
        <TouchableOpacity
          onPress={() => setIndex(index - 1)}
          style={[styles.nextButton, { marginRight: 20 }]}
        >
          <Text style={[styles.addFamilyRoleText, { marginHorizontal: 15 }]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIndex(index + 1)}
          style={styles.nextButton}
        >
          <Text style={[styles.addFamilyRoleText, { marginHorizontal: 15 }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeoTreatment({ index, setIndex }) {
  const [homeoDiagnosis, setHomeoDiagnosis] = useState("");
  const [principleTreatment, setPrincipleTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [dietTherapy, setDietTherapy] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [arrayValue, setArrayValue] = useState({
    dataRemedy: [
      {
        value: "Abies Canadensis",
        label: "Abies Canadensis",
      },
      {
        value: "Abies Nigra",
        label: "Abies Nigra",
      },
      {
        value: "Acalypha Indica",
        label: "Acalypha Indica",
      },
      {
        value: "Acetic Acid",
        label: "Acetic Acid",
      },
      {
        value: "Aconitum Napellus",
        label: "Aconitum Napellus",
      },
    ],
    dataPotency: [
      {
        value: "none",
        label: "none",
      },
      {
        value: "1D",
        label: "1D",
      },
      {
        value: "2D-1C",
        label: "2D-1C",
      },
      {
        value: "6D-3C",
        label: "6D-3C",
      },
      {
        value: "8D-4C",
        label: "8D-4C",
      },
      {
        value: "12D-6C",
        label: "12D-6C",
      },
      {
        value: "24D-12C",
        label: "24D-12C",
      },
      {
        value: "60D-30C",
        label: "60D-30C",
      },
      {
        value: "80D-40C",
        label: "80D-40C",
      },
      {
        value: "400D-200C",
        label: "400D-200C",
      },
    ],
    remedyValue: "Select Remedy",
    potencyValue: "Select Potency",
    showOptionsRemedy: false,
    showOptionsPotency: false,
  });

  const showPickerRemedy = () => {
    arrayValue.showOptionsRemedy = !arrayValue.showOptionsRemedy;
    setArrayValue({ ...arrayValue });
  };
  const showPickerPotency = () => {
    arrayValue.showOptionsPotency = !arrayValue.showOptionsPotency;
    setArrayValue({ ...arrayValue });
  };
  const setRemedyOption = (item) => {
    arrayValue.remedyValue = item.value;
    arrayValue.showOptionsRemedy = false;
    setArrayValue({ ...arrayValue });
  };
  const setPotencyOption = (item) => {
    arrayValue.potencyValue = item.value;
    arrayValue.showOptionsPotency = false;
    setArrayValue({ ...arrayValue });
  };

  return (
    <View style={styles.scene}>
      <Text style={styles.headingText}>Homeo Treatment</Text>
      <Text style={styles.historyInnerTitle}>Differentiation</Text>
      <View style={styles.separator} />
      <View style={{ marginHorizontal: "4%" }}>
        <Input
          title="Homeo Diagnosis :"
          placeholder="Your Homeo Diagnosis for the patient..."
          value={homeoDiagnosis}
          onChangeText={(text) => setHomeoDiagnosis(text)}
        />
        <Input
          title="Principle Treatment :"
          placeholder="Your treatment for the patient..."
          value={principleTreatment}
          onChangeText={(text) => setPrincipleTreatment(text)}
        />
        <MultiInput
          title="Note :"
          placeholder="Note for acu-treatment for the patient..."
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />
      </View>
      <Text style={styles.historyInnerTitle}>Remedy Prescription</Text>
      <View style={styles.separator} />
      <View
        style={{
          marginHorizontal: "4%",
        }}
      >
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
            marginRight: "5%",
            marginLeft: width < 450 ? "0%" : "0.5%",
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              height: 35,
              alignSelf: "flex-start",
              paddingHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              backgroundColor: "#49B6D6",
              marginLeft: "4.5%",
              borderRadius: 5,
            }}
          >
            <Text style={styles.addFamilyRoleText}>
              Add Remedy of Prescription
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.addFamilyRoleButton}
          >
            <Text style={styles.addFamilyRoleText}>
              Click for suggested remedy for the Site
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: width < 450 ? "column" : "row",
            justifyContent: "space-between",
            marginHorizontal: width < 450 ? "0%" : "3%",
          }}
        >
          <View style={{ width: width < 450 ? "100%" : "40%" }}>
            <Text style={styles.pickerTitleText}>Remedy</Text>
            <SingleSelect
              value={arrayValue.remedyValue}
              data={arrayValue.dataRemedy}
              state={arrayValue.showOptionsRemedy}
              onPress={() => showPickerRemedy()}
              onPressItem={(item) => setRemedyOption(item)}
            />
          </View>
          <View style={{ width: width < 450 ? "100%" : "40%" }}>
            <Text style={styles.pickerTitleText}>Potency</Text>
            <SingleSelect
              value={arrayValue.potencyValue}
              data={arrayValue.dataPotency}
              state={arrayValue.showOptionsPotency}
              onPress={() => showPickerPotency()}
              onPressItem={(item) => setPotencyOption(item)}
            />
          </View>
        </View>
        <MultiInput
          title="Diet-therapy :"
          placeholder="Type of diet for the patient..."
          value={dietTherapy}
          onChangeText={(text) => setDietTherapy(text)}
        />
        <MultiInput
          title="Recommendation :"
          placeholder="Type in recommendation for the patient..."
          value={recommendation}
          onChangeText={(text) => setRecommendation(text)}
        />
      </View>
      <View
        style={{
          ...styles.bottomButtonsView,
          marginLeft: "auto",
          marginRight: "9%",
        }}
      >
        <TouchableOpacity
          onPress={() => setIndex(index - 1)}
          style={[styles.nextButton, { marginRight: 20 }]}
        >
          <Text style={[styles.addFamilyRoleText, { marginHorizontal: 15 }]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIndex(index + 1)}
          style={styles.nextButton}
        >
          <Text style={[styles.addFamilyRoleText, { marginHorizontal: 15 }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const FifthRoute = () => <View style={styles.scene} />;

const SixthRoute = () => <PreviousSession />;

const SeventhRoute = () => <View style={styles.scene} />;

const initialLayout = { width: Dimensions.get("window").width };

// const renderScene = SceneMap({
//   first: MedicalHistory,
//   second: Interview,
//   third: ThirdRoute,
//   four: FourthRoute
// });

// var index = 0
// const setIndex = (index1) => {
//     index = index1
//     console.log(index1)
// };

export default function MyTabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "medicalhistory", title: "Medical History" },
    { key: "second", title: "Interview" },
    { key: "third", title: "Inspection & Examination" },
    { key: "four", title: "Homeo Treatment" },
    { key: "five", title: "File Attachments" },
    { key: "six", title: "Previous Session" },
    { key: "seven", title: "Notes" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "medicalhistory":
        return <MedicalHistory index={index} setIndex={setIndex} />;
      case "second":
        return <Interview index={index} setIndex={setIndex} />;
      case "third":
        return <InspectionAndExamination index={index} setIndex={setIndex} />;
      case "four":
        return <HomeoTreatment index={index} setIndex={setIndex} />;
      case "five":
        return <FifthRoute />;
      case "six":
        return <SixthRoute />;
      case "seven":
        return <SeventhRoute />;
      default:
        return <MedicalHistory />;
    }
  };

  const renderTabBar = () => {
    return <TabBar index={index} setIndex={setIndex} />;
  };

  return (
    <TabView
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={initialLayout}
      navigationState={{ index, routes }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  pickerTitleText: {
    fontSize: 14,
    color: colors.inputTitleColor,
    marginHorizontal: "5%",
    marginTop: 10,
    fontWeight: "bold",
  },
  headingText: {
    fontSize: 22,
    color: colors.inputTitleColor,
    marginHorizontal: "5%",
    marginTop: 20,
    fontWeight: "bold",
  },
  historyInnerTitle: {
    fontSize: 22,
    color: colors.historyInnerTitleColor,
    marginHorizontal: "8%",
    marginTop: 12,
    fontWeight: "600",
  },
  separator: {
    height: 0.5,
    width: "84%",
    backgroundColor: colors.inputTextColor,
    marginTop: 5,
    alignSelf: "center",
  },
  listView: {
    marginTop: 10,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    flexWrap: "wrap",
  },
  addFamilyRoleButton: {
    height: 35,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: colors.buttonBackColor,
    // alignSelf: 'center',
    marginLeft: "4.5%",
    borderRadius: 5,
  },
  addFamilyRoleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.whiteColor,
  },
  bottomButtonsView: {
    flexDirection: "row",
    marginHorizontal: "5%",
  },
  nextButton: {
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.nextButton,
    marginVertical: 20,
  },
});
