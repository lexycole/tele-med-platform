import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useSnapshot } from 'valtio';
import { state } from '../../../_layout';
import colors from '../../../config/colors';
//import { AppSingleDropdown } from '../../homeo/components/InterviewTab';
import AppSingleDropdown from '../../../components/forms/AppSingleDropdown';
import AppTextInput from '../../../components/forms/AppTextInput';
import { Dropdown } from "sharingan-rn-modal-dropdown";

const RemedyFields = ({ dataRemedy, dataUnit, values, name, setFieldlValue, isEdit }) => {
  const { isTablet } = useSnapshot(state);

  const addHandler = () => {
    setFieldlValue(name, [
      ...values[name],
      { materiaMedica: '', dosage: "", unit: "" },
    ]);
  }

  const updateRemedy = (value, key) => {
    setFieldlValue(
      name,
      values[name].map((r, index) => {
        if (index === key) {
          return {
            ...r,
            ["materiaMedica"]: value,
          };
        } else {
          return r;
        }
      })
    );
  }
  const updateDosage = (value, key) => {
    setFieldlValue(
      name,
      values[name].map((r, index) => {
        if (index === key) {
          return {
            ...r,
            ["dosage"]: value.replace(/[^0-9]/g, ''),
          };
        } else {
          return r;
        }
      })
    );
  }
  const updateUnit = (value, key) => {
    setFieldlValue(
      name,
      values[name].map((r, index) => {
        if (index === key) {
          return {
            ...r,
            ["unit"]: value,
          };
        } else {
          return r;
        }
      })
    );
  }
  const deleteHandler = (key) => {
    setFieldlValue(
      name,
      values[name].filter(
        (member,index) => index !== key
      )
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { width: isTablet ? 300 : "100%" }]}
        activeOpacity={0.7}
        onPress={addHandler}
        disabled={isEdit ? false : true}
      >
        <Text style={styles.buttonTitle}>Add Remedy to Prescription</Text>
      </TouchableOpacity>
      <View style={styles.inputsContainer}>
        {values[name].map((input, key) => (
          <View style={{
            flex: 1,
            flexDirection: isTablet ? "row" : 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            // borderBottomWidth: 1,
            borderBottomColor: "lightgray"
          }}>
            <View
              style={{
                marginBottom: 16,
                width: isTablet ? "65%" : "100%",
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
                  disabled={isEdit ? false : true}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", width: isTablet ? "33%" : "100%", justifyContent: "space-between", alignItems: "center" }}>
              <View
                style={
                  { marginBottom: 16, width: key != 0 ? "30%" : "35%" }
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
                      placeholder="Dosage"
                      keyboardType='decimal-pad'
                      editable={isEdit ? true : false}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginBottom: 16,
                  width: key != 0 ? "50%" : "55%",
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
                    disabled={isEdit ? false : true}
                  />
                </View>
              </View>
              {isEdit && key != 0 &&
                <View style={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
                  <IconButton
                    icon="delete"
                    style={{ backgroundColor: "#fa5a5a", }}
                    color="white"
                    onPress={() => deleteHandler(key)}
                  />
                </View>
              }
            </View>
          </View>


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
    flexDirection: 'column',
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

export default RemedyFields