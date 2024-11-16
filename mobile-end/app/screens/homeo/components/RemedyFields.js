import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useSnapshot } from 'valtio';
import { state } from '../../../_layout';
import colors from '../../../config/colors';
//import { AppSingleDropdown } from '../../homeo/components/InterviewTab';
// import AppSingleDropdown from '../../../../src/components/forms/AppSingleDropdown';
import { Dropdown } from "sharingan-rn-modal-dropdown";

const RemedyFields = ({ remedyInputs, dataRemedy, dataPotency, values, updateArray, isEdit }) => {
  const [inputs, setInputs] = useState(remedyInputs)
  //const [inputs, setInputs] = useState(values.remedy)
  const { isTablet } = useSnapshot(state);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ materiaMedica: '', potency: '' });
    setInputs(_inputs);
  }

  const updateRemedy = (value, key) => {
    const _remedy = [...inputs]
    console.log(value)
    _remedy[key].materiaMedica = value
    setInputs(_remedy)

    updateArray(_remedy)
  }

  const updatePotency = (value, key) => {
    const _remedy = [...inputs]
    _remedy[key].potency = value
    setInputs(_remedy)
    updateArray(_remedy)
  }
  const deleteHandler = (index) => {
    const _remedy = [...inputs]
    //console.log(index,'======')
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
        disabled={isEdit ? false : true}
      >
        <Text style={styles.buttonTitle}>Add Remedy to Prescription</Text>
      </TouchableOpacity>
      <View style={styles.inputsContainer}>
        {inputs.map((input, key) => (

          <View style={styles.inputContainer}>
              <View style={{ marginBottom: 15, width: isEdit && key != 0 ? "50%" : "56%" }}>
                <Dropdown
                  textInputPlaceholder="Select Remedy"
                  data={dataRemedy}
                  value={input['materiaMedica']}
                  onChange={(value) => updateRemedy(value, key)}
                  mode="flat"
                  disabled={isEdit ? false : true}
                />
              </View>
              <View style={{ width: isEdit && key != 0 ? "36%" : "40%" }}>
                <Dropdown
                  title="Potency:"
                  textInputPlaceholder="Select Potency"
                  data={dataPotency}
                  value={input["potency"]}
                  onChange={(value) => updatePotency(value, key)}
                  mode="flat"
                  disabled={isEdit ? false : true}
                />
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
        ))}
      </View>

    </View>
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
    borderBottomColor: "lightgray",
    marginBottom: 20
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