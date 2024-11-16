import "react-native-get-random-values";
// import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown, MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
import * as Yup from "yup";
import { state } from "../../../_layout";
import Button from "../../../components/forms/AppSubmitButton";
import AppTextArea from "../../../components/forms/AppTextArea";
import AppTextInput from "../../../components/forms/AppTextInput";
import calculateBMI, { calculateBMICategory } from "../../../utils/bmi/bmiclassification";
import { interviewDropdownValues } from "../drowdownItems";
import { tcmState } from "../../../(public)/TCMSession";
import { v4 } from "uuid";

const validationSchema = Yup.object().shape({});

const InterviewTab = ({ handleSubmitToDB }) => {
  const { isTablet } = useSnapshot(state);
  const { interview, isInterview,isEdit } = useSnapshot(tcmState);
  const isUpdate = useRef(isInterview).current;
  const buttonClick = useRef();

  const {
    socialRelationshipOptions,
    hobbiesOptions,
    sportOptions,

    appetiteOptions,
    defecationOptions,
    dietOptions,
    earsOptions,
    emotionalStatusOptions,
    employmentStatusOptions,
    eyesOptions,
    habitsOptions,
    headOptions,
    leukorrheaOptions,
    menstruationOptions,
    naturePainOptions,
    noseOptions,
    perspirationOptions,
    sleepOptions,
    sportFrequencyOptions,
    tasteOptions,
    thermalFeelingOptions,
    thirstOptions,
    throatOptions,
    urinationColorOptions,
    urinationOptions,
    vomitingOptions,
  } = interviewDropdownValues;

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      socialRelationship: interview ? interview.socialRelationship : "",
      habits: interview ? interview.habits : [],
      profession: interview ? interview.profession : "",
      employmentStatus: interview ? interview.employmentStatus : [],
      sport: interview ? interview.sport : "",
      sportFrequency: interview ? interview.sportFrequency : [],
      hobby: interview ? interview.hobby : "",
      height: interview
        ? {
          value: interview.height,
          measure: interview.heightUnit,
        }
        : { value: "", measure: "cm" },
      weight: interview
        ? {
          value: interview.weight,
          measure: interview.weightUnit,
        }
        : { value: "", measure: "kg" },
      temperature: interview
        ? {
          value: interview.temperature,
          measure: interview.temperatureUnit,
        }
        : { value: "", measure: "Celcius" },
      BMI: interview ? interview.BMI : "",
      BMICategory: interview ? interview.BMICategory : "",
      thermalFeeling: interview ? interview.thermalFeeling : [],
      perspiration: interview ? interview.perspiration : [],
      appetite: interview ? interview.appetite : [],
      appetiteNote: interview ? interview.appetiteNote : "",
      vomiting: interview ? interview.vomiting : [],
      vomitingNote: interview ? interview.vomitingNote : "",
      diet: interview ? interview.diet : [],
      dietNote: interview ? interview.dietNote : "",
      taste: interview ? interview.taste : [],
      thirst: interview ? interview.thirst : [],
      defecation: interview ? interview.defecation : [],
      urination: interview ? interview.urination : [],
      urinationColor: interview ? interview.urinationColor : [],
      sleep: interview ? interview.sleep : [],
      head: interview ? interview.head : [],
      eyes: interview ? interview.eyes : [],
      ear: interview ? interview.ear : [],
      nose: interview ? interview.nose : [],
      throat: interview ? interview.throat : [],
      menstruation: interview ? interview.menstruation : [],
      leukorrhea: interview ? interview.leukorrhea : [],
      painLocation: interview ? interview.painLocation : "",
      painNature: interview ? interview.painNature : "",
      emotionalStatus: interview ? interview.emotionalStatus : [],
      emotionalNote: interview ? interview.emotionalNote : "",
      mind: interview ? interview.mind : "",
      interviewNote: interview ? interview.interviewNote : "",
    },
    onSubmit: (values) => {
      const filterd = {
        ...values,
        height: values.height.value,
        heightUnit: values.height.measure,
        weight: values.weight.value,
        weightUnit: values.weight.measure,
        temperature: values.temperature.value,
        temperatureUnit: values.temperature.measure,
      };
      tcmState.interview = filterd;
      tcmState.isInterview = true;
      if (buttonClick.current === "next")
        tcmState.tabName = "inspectionAndExamination";

      if (buttonClick.current === "save") {
        tcmState.tabName = "";
        handleSubmitToDB();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Lifestyle</Text>
      <AppSingleDropdown
        title="Social Relationship"
        placeholder="Select Social Relationship"
        options={socialRelationshipOptions}
        value={values["socialRelationship"]}
        onChange={handleChange("socialRelationship")}
        disabled={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="Habits:"
        placeholder="Habits"
        options={habitsOptions}
        value={values["habits"]}
        onChange={(value) => {
          setFieldValue("habits", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppTextInput
        label="Profession"
        placeholder="Your Profession"
        value={values["profession"]}
        onChangeText={handleChange("profession")}
        editable={isEdit ? true : false}
      />
      <AppMultiDropdown
        title="Employment Status:"
        placeholder="Employment Status"
        options={employmentStatusOptions}
        value={values["employmentStatus"]}
        onChange={(value) => {
          setFieldValue("employmentStatus", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppTextArea
        label="Sport:"
        placeholder="Your Sport"
        value={values["sport"]}
        onChangeText={handleChange("sport")}
        editable={isEdit ? true : false}
      />
      <AppMultiDropdown
        title="Sport Frequency:"
        placeholder="Sport Frequency"
        options={sportFrequencyOptions}
        value={values["sportFrequency"]}
        onChange={(value) => {
          setFieldValue("sportFrequency", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppTextArea
        label="Hobbies:"
        placeholder="Your hobbies"
        value={values["hobby"]}
        onChangeText={handleChange("hobby")}
        editable={isEdit ? true : false}
      />
      <Text style={styles.subtitle}>Inquiring for physical constitution</Text>
      <View
        horizontal
        style={{
          flexDirection: isTablet ? "row" : "column",
          alignItems: isTablet ? "center" : null,
          marginBottom: isTablet ? 16 : null,
          // width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: isTablet ? null : "space-between",
            alignItems: "center",
            width: isTablet ? "30%" : "100%",
            marginBottom: isTablet ? 0 : 16,
          }}
        >
          <AppTextInput
            label="Height"
            placeholder="Height"
            value={values["height"].value}
            keyboardType="decimal-pad"
            onChangeText={(text) => {
              setFieldValue("height", {
                ...values["height"],
                value: text,
              });
              if (
                values["weight"].value &&
                values["height"].measure &&
                values["weight"].measure
              ) {
                const bmi = calculateBMI(
                  values["weight"].value,
                  text,
                  values["height"].measure,
                  values["weight"].measure
                ).toString();
                setFieldValue("BMI", bmi);
                setFieldValue("BMICategory", calculateBMICategory(bmi));
              }
            }}
            containerStyle={{
              width: "50%",
              marginHorizontal: 10,
              marginBottom: 0,
            }}
            editable={isEdit ? true : false}
          />
          <View
            style={{
              height: 58,
              width: "40%",
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
              value={values["height"].measure}
              onChange={(value) => {
                setFieldValue("height", {
                  ...values["height"],
                  measure: value,
                });
                if (
                  (values["weight"].measure && values["weight"].value,
                    values["height"].value)
                ) {
                  const bmi = calculateBMI(
                    values["weight"].value,
                    values["height"].value,
                    value,
                    values["weight"].measure
                  ).toString();
                  setFieldValue("BMI", bmi);
                  setFieldValue("BMICategory", calculateBMICategory(bmi));
                }
              }}
              mode="outlined"
              disabled={isEdit ? false : true}
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
            width: isTablet ? "30%" : "100%",
            marginBottom: isTablet ? 0 : 16,
          }}
        >
          <AppTextInput
            label="Weight"
            placeholder="Weight"
            keyboardType="decimal-pad"
            value={values["weight"].value}
            onChangeText={(text) => {
              setFieldValue("weight", {
                ...values["weight"],
                value: text,
              });
              if (
                values["height"].value &&
                values["height"].measure &&
                values["weight"].measure
              ) {
                const bmi = calculateBMI(
                  text,
                  values["height"].value,
                  values["height"].measure,
                  values["weight"].measure
                ).toString();
                setFieldValue("BMI", bmi);
                setFieldValue("BMICategory", calculateBMICategory(bmi));
              }
            }}
            containerStyle={{
              width: "50%",
              marginHorizontal: 10,
              marginBottom: 0,
            }}
            editable={isEdit ? true : false}
          />
          <View
            style={{
              height: 58,
              width: "40%",
              marginTop: 12,
            }}
          >
            <Dropdown
              textInputPlaceholder="Select Value"
              data={[
                { id: `${v4()}`, value: "kg", label: "kg" },
                { id: `${v4()}`, value: "lbs", label: "lbs" },
              ]}
              value={values["weight"].measure}
              onChange={(value) => {
                setFieldValue("weight", {
                  ...values["weight"],
                  measure: value,
                });
                if (
                  (values["height"].measure && values["weight"].value,
                    values["height"].value)
                ) {
                  const bmi = calculateBMI(
                    values["weight"].value,
                    values["height"].value,
                    values["height"].measure,
                    value
                  ).toString();
                  setFieldValue("BMI", bmi);
                  setFieldValue("BMICategory", calculateBMICategory(bmi));
                }
              }}
              mode="outlined"
              disabled={isEdit ? false : true}
            />
          </View>
          {/* <BottomModal
           style={{width: isTablet ? 100 :'50%'}}
            onValueChange={(value) => {
              setFieldValue("weight", {
                ...values["weight"],
                measure: value,
              });
            }}
            placeholder={"Select Weight"}
            selectedValue={values["weight"].measure}>
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="lbs" value="lbs" />

          </BottomModal>*/}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: isTablet ? null : "space-between",
            alignItems: "center",
            width: isTablet ? "35%" : "100%",
            marginBottom: isTablet ? 0 : 16,
          }}
        >
          <AppTextInput
            label="Temperature"
            placeholder="Temperature"
            keyboardType="decimal-pad"
            value={values["temperature"].value}
            onChangeText={(text) =>
              setFieldValue("temperature", {
                ...values["temperature"],
                value: text,
              })
            }
            containerStyle={{
              width: "50%",
              marginHorizontal: 10,
              marginBottom: 0,
            }}
            editable={isEdit ? true : false}
          />
          <View
            style={{
              height: 58,
              width: "40%",
              marginTop: 12,
            }}
          >
            <Dropdown
              textInputPlaceholder="Select Value"
              data={[
                { id: `${v4()}`, value: "Celcius", label: " °C" },
                { id: `${v4()}`, value: "Fahrenheit", label: " °F" },
              ]}
              value={values["temperature"].measure}
              onChange={(value) => {
                setFieldValue("temperature", {
                  ...values["temperature"],
                  measure: value,
                });
              }}
              mode="outlined"
              disabled={isEdit ? false : true}
            />
          </View>
          {/*<BottomModal
           style={{width: isTablet ? 100 :'50%'}}
            onValueChange={(value) => {
              setFieldValue("temperature", {
                ...values["temperature"],
                measure: value,
              });
            }}
            placeholder={"Select Temperature"}
            selectedValue={values["temperature"].measure}
          >
            <Picker.Item label=" °C" value="Celcius (°C)" />
            <Picker.Item label=" °F" value="Fahrenheit (°F)" />
          </BottomModal>*/}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: isTablet ? null : "space-between",
          alignItems: "center",
          width: isTablet ? "35%" : "100%",
          marginBottom: isTablet ? 0 : 16,
        }}
      >
        <AppTextInput
          label="BMI "
          placeholder="BMI "
          keyboardType="decimal-pad"
          value={values["BMI"]}
          onChangeText={handleChange("BMI")}
          containerStyle={{
            width: "45%",
          }}
          editable={false}
        />
        <AppTextInput
          label="BMI Category" placeholder="BMI Category"
          value={values["BMICategory"]}
          onChangeText={handleChange("BMICategory")}
          containerStyle={{
            width: "45%",
          }}
          editable={false}
        />
      </View>

      <AppMultiDropdown
        title="1. Thermal Feeling:"
        placeholder="Thermal Feeling"
        options={thermalFeelingOptions}
        value={values["thermalFeeling"]}
        onChange={(value) => {
          setFieldValue("thermalFeeling", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="2. Perspiration:"
        placeholder="Perspiration"
        options={perspirationOptions}
        value={values["perspiration"]}
        onChange={(value) => {
          setFieldValue("perspiration", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="3. Appetite:"
        placeholder="Appetite"
        options={appetiteOptions}
        value={values["appetite"]}
        onChange={(value) => {
          setFieldValue("appetite", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppTextArea
        label="Note for appetite "
        placeholder="Your additional information for appetite..."
        value={values["appetiteNote"]}
        onChangeText={handleChange("appetiteNote")}
        editable={isEdit ? true : false}
      />
      <AppMultiDropdown
        title="4. Vomiting:"
        placeholder="Vomiting"
        options={vomitingOptions}
        value={values["vomiting"]}
        onChange={(value) => {
          setFieldValue("vomiting", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />

      <AppTextArea
        label="Note for vomiting"
        placeholder="Your additional information for vomiting..."
        value={values["vomitingNote"]}
        onChangeText={handleChange("vomitingNote")}
        editable={isEdit ? true : false}
      />
      <AppMultiDropdown
        title="5. Diet:"
        placeholder="Diet"
        options={dietOptions}
        value={values["diet"]}
        onChange={(value) => {
          setFieldValue("diet", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppTextArea
        label="Note for diet"
        placeholder="Your additional information for diet..."
        value={values["dietNote"]}
        onChangeText={handleChange("dietNote")}
        editable={isEdit ? true : false}
      />
      <AppMultiDropdown
        title="6. Taste:"
        placeholder="Taste"
        options={tasteOptions}
        value={values["taste"]}
        onChange={(value) => {
          setFieldValue("taste", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="7. Thirst:"
        placeholder="Thirst"
        options={thirstOptions}
        value={values["thirst"]}
        onChange={(value) => {
          setFieldValue("thirst", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="8. Defecation/Stool:"
        placeholder="Defecation/Stool"
        options={defecationOptions}
        value={values["defecation"]}
        onChange={(value) => {
          setFieldValue("defecation", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="9. Urination:"
        placeholder="Urination"
        options={urinationOptions}
        value={values["urination"]}
        onChange={(value) => {
          setFieldValue("urination", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="10. Urination-color:"
        placeholder="Urination-color"
        options={urinationColorOptions}
        value={values["urinationColor"]}
        onChange={(value) => {
          setFieldValue("urinationColor", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="11. Sleep:"
        placeholder="Sleep"
        options={sleepOptions}
        value={values["sleep"]}
        onChange={(value) => {
          setFieldValue("sleep", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="12. Head:"
        placeholder="Head"
        options={headOptions}
        value={values["head"]}
        onChange={(value) => {
          setFieldValue("head", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="13. Eyes:"
        placeholder="Eyes"
        options={eyesOptions}
        value={values["eyes"]}
        onChange={(value) => {
          setFieldValue("eyes", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="14. Ear:"
        placeholder="Ear"
        options={earsOptions}
        value={values["ear"]}
        onChange={(value) => {
          setFieldValue("ear", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="15. Nose:"
        placeholder="Nose"
        options={noseOptions}
        value={values["nose"]}
        onChange={(value) => {
          setFieldValue("nose", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="16. Throat:"
        placeholder="Throat"
        options={throatOptions}
        value={values["throat"]}
        onChange={(value) => {
          setFieldValue("throat", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="17. Menstruation History:"
        placeholder="Menstruation History"
        options={menstruationOptions}
        value={values["menstruation"]}
        onChange={(value) => {
          setFieldValue("menstruation", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="18. Leukorrea:"
        placeholder="Leukorrea"
        options={leukorrheaOptions}
        value={values["leukorrhea"]}
        onChange={(value) => {
          setFieldValue("leukorrhea", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />
      <AppTextInput
        label="19. Locality of Pain:"
        placeholder="Type in location of pain"
        value={values["painLocation"]}
        onChangeText={handleChange("painLocation")}
        editable={isEdit ? true : false}
      />
      <AppSingleDropdown
        title="20. Nature of Pain"
        placeholder="Select Nature of Pain"
        options={naturePainOptions}
        value={values["painNature"]}
        onChange={handleChange("painNature")}
        disabled={isEdit ? false : true}
      />
      <AppMultiDropdown
        title="21. Emotional Status:"
        placeholder="Emotional Status"
        options={emotionalStatusOptions}
        value={values["emotionalStatus"]}
        onChange={(value) => {
          setFieldValue("emotionalStatus", value);
        }}
        disabled={isEdit ? false : true}
                  hideChip={isEdit ? false : true}
      />

      <AppTextArea
        label="Note for Emotion"
        placeholder="Your additional information for emotion ..."
        value={values["emotionalNote"]}
        onChangeText={handleChange("emotionalNote")}
        editable={isEdit ? true : false}
      />
      <AppTextArea
        label="22. Mind"
        placeholder="State of Mind of patient"
        value={values["mind"]}
        onChangeText={handleChange("mind")}
        editable={isEdit ? true : false}
      />
      <AppTextArea
        label="Note for interview"
        placeholder="Your additional information for interview ..."
        value={values["interviewNote"]}
        onChangeText={handleChange("interviewNote")}
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
            tcmState.tabName = "medicalHistory";
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

export default InterviewTab;

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
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00B7DD",
    marginBottom: 16,
  },
});

export const AppSingleDropdown = ({
  title,
  placeholder,
  options,
  value,
  onChange,
  disabled
}) => {
  const { isTablet } = useSnapshot(state);

  return (
    <View
      style={{
        marginBottom: 16,
        width: "100%",
        flexDirection: isTablet ? "row" : "column",
        alignItems: isTablet ? "center" : null,
      }}
    >
      <Text
        style={{
          marginBottom: isTablet ? 0 : 5,
          minWidth: isTablet ? 200 : null,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          width: isTablet ? 350 : "100%",
          marginLeft: isTablet ? 50 : 0,
        }}
      >
        <Dropdown
          textInputPlaceholder={placeholder}
          data={options}
          value={value}
          onChange={onChange}
          mode="flat"
          disabled={disabled}
        />
      </View>
    </View>
  );
};
export const AppMultiDropdown = ({
  title,
  placeholder,
  options,
  value,
  onChange,
  ...otherProps
}) => {
  const { isTablet } = useSnapshot(state);

  return (
    <View
      style={{
        marginBottom: 16,
        width: "100%",
        flexDirection: isTablet ? "row" : "column",
        alignItems: isTablet ? "center" : null,
      }}
    >
      <Text
        style={{
          marginBottom: isTablet ? 0 : 5,
          minWidth: isTablet ? 200 : null,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          width: isTablet ? 350 : "100%",
          marginLeft: isTablet ? 50 : 0,
        }}
      >
        <MultiselectDropdown
          emptySelectionText={`Select ${placeholder}`}
          selectedItemsText={`Selected ${placeholder}`}
          data={options}
          value={value || []}
          onChange={onChange}
          {...otherProps}
        />
        {otherProps.hideChip ? (<Text style={{ marginTop: 15 }}>{value.join(' , ')}</Text>) : null}
      </View>
    </View>
  );
};
