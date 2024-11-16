import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useSnapshot } from 'valtio';
import { state } from '../../../../App';
import colors from '../../../config/colors';
//import { AppSingleDropdown } from '../../homeo/components/InterviewTab';
import AppSingleDropdown from '../../../components/forms/AppSingleDropdown';
import AppTextInput from '../../../components/forms/AppTextInput';
import { Dropdown } from "sharingan-rn-modal-dropdown";

const DynamicFields = ({ remedyInputs, dataRemedy, dataUnit, values, updateArray }) => {
  const [inputs, setInputs] = useState(remedyInputs)
  const { isTablet } = useSnapshot(state);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ materiaMedica: "", dosage: 0, unit: "" });
    setInputs(_inputs);
  }

  const updateRemedy = (value, key) => {
    const _remedy = [...inputs]
    console.log(value)
    _remedy[key].materiaMedica = value
    setInputs(_remedy)

    updateArray(_remedy)
  }
  const updateDosage = (value, key) => {
    let trimmedValue = value.trim();
    if (isNaN(Number(trimmedValue))) {
      // do nothing when a non digit is pressed
      return;
    }
    const _remedy = [...inputs]
    //_remedy[key].dosage = Number(trimmedValue).toString()
    _remedy[key].dosage = Number(trimmedValue)
    setInputs(_remedy)
    updateArray(_remedy)
  }
  const updateUnit = (value, key) => {
    const _remedy = [...inputs]
    _remedy[key].unit = value
    setInputs(_remedy)
    updateArray(_remedy)
  }
  const deleteHandler = (index) => {
    const _remedy = [...inputs]
    console.log(index, '======')
    _remedy.splice(index, 1)
    setInputs(_remedy)
    // updateArray(_remedy)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { width: isTablet ? 300 : "100%" }]}
        activeOpacity={0.7}
        onPress={addHandler}
      >
        <Text style={styles.buttonTitle}>Add Remedy to Prescription</Text>
      </TouchableOpacity>
      <View style={styles.inputsContainer}>
        {inputs.map((input, key) => (
          isTablet ? (<View style={styles.inputContainer}>
            <View
              style={{
                marginBottom: 16,
                width: "40%",
                flexDirection: "column",
                alignItems: null,
              }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  minWidth: null,
                }}
              >
                Remedy:
              </Text>
              <View
                style={{
                  width: "100%",
                  marginLeft: 0,

                }}
              >
                <Dropdown
                  textInputPlaceholder="Select Remedy"
                  data={dataRemedy}
                  value={input['materiaMedica']}
                  onChange={(value) => updateRemedy(value, key)}
                  mode="flat"
                />
              </View>
            </View>
            <View
              style={
                { marginBottom: 16, width: "25%" }
              }
            >
              <Text style={{ marginBottom: 5 }}>Dosage :</Text>
              <View
                style={[
                  {
                    height: 58,
                    minHeight: 48,
                    borderRadius: 8,
                    borderColor: "#223e4b",
                    borderWidth: StyleSheet.hairlineWidth,
                    padding: 8,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="rgba(34, 62, 75, 0.7)"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    autoCapitalize="none"
                    style={{
                      fontSize: 12,
                      height: "100%",
                      width: "100%",
                    }}
                    value={input["dosage"]}
                    onChangeText={value => updateDosage(value, key)}
                    placeholder="Select Dosage"
                    keyboardType='decimal-pad'
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                marginBottom: 16,
                width: "25%",
                flexDirection: "column",
                alignItems: null,
              }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  minWidth: null,
                }}
              >
                Unit:
              </Text>
              <View
                style={{
                  width: "100%",
                  marginLeft: 0,

                }}
              >
                <Dropdown
                  textInputPlaceholder="Select Unit"
                  data={dataUnit}
                  value={input["unit"]}
                  onChange={value => updateUnit(value, key)}
                  mode="flat"
                />
              </View>
            </View>
            {key != 0 &&
              <View style={{ width: "10%" }}>
                <IconButton
                  icon="delete"
                  style={{ marginLeft: 8, backgroundColor: "#fa5a5a", }}
                  color="white"
                  onPress={() => deleteHandler(key)}
                />
              </View>
            }
          </View>

          ) : (<View style={styles.inputContainer}>
            <View style={{ flex: 1 }}>
              <AppSingleDropdown
                title="Remedy:"
                placeholder="Select Remedy"
                options={dataRemedy}
                value={input['materiaMedica']}
                onChange={(value) => updateRemedy(value, key)}
                isTablet={isTablet}
                custom={true}
              />
              <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', }}>
                {/* <IntegerInput
                              label="Dosage :"
                              value={input["dosage"]}
                              setValue={value => updateDosage(value, key)}
                          /> */}
                <View style={{ width: key != 0 ? '40%' : "49%" }}>
                  <AppTextInput

                    label="Dosage :"
                    placeholder="Select Dosage"
                    // options={dataPrincipleTreatment}
                    value={input["dosage"]}
                    onChangeText={value => updateDosage(value, key)}
                    keyboardType={"decimal-pad"}
                  />
                </View>
                <View style={{ width: key != 0 ? '45%' : "49%", }}>
                  <AppSingleDropdown
                    title="Unit:"
                    placeholder="Select Unit"
                    options={dataUnit}
                    value={input["unit"]}
                    onChange={value => updateUnit(value, key)}
                    isTablet={isTablet}
                    custom={true}
                  />
                </View>
              {key != 0 &&
                <View style={{ width: "10%",alignItems: "center" }}>
                  <IconButton
                    icon="delete"
                    style={{  backgroundColor: "#fa5a5a", }}
                    color="white"
                    onPress={() => deleteHandler(key)}
                  />
                </View>
              }
              </View>
            </View>


          </View>)
        ))}
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    // backgroundColor: 'white'
  },
  inputsContainer: {
    // flex: 1,
    marginBottom: 20
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  },
  input: {
    // flex:0.5,
    color: colors.black,
    fontSize: 16,
    // backgroundColor:"red",
    // fontFamily: fonts.interMedium,
    marginRight: 6
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

})

export default DynamicFields