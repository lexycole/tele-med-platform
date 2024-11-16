import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useSnapshot } from 'valtio';
import { state } from '../../../_layout';
import AppTextInput from '../../../components/forms/AppTextInput';
import colors from '../../../config/colors';
import { AppSingleDropdown } from './InterviewTab';
import IntegerInput from './IntegerInput';
import { Dropdown } from "sharingan-rn-modal-dropdown";

const AcuComibination = ({ setFieldlValue, values, dataStimulationMethod, dataNeedleManipulation, dataAcuPoints, dataMoxibustion, isEdit }) => {
    const { isTablet } = useSnapshot(state);

    const addHandler = () => {
        setFieldlValue("acuCombination", [
            ...values["acuCombination"],
            { acuPoints: '', stimulationDuration: 0, moxibustion: '', stimulationMethod: '', needleManipulation: '' },
        ]);
    }

    const handleAcuChange = (name, value, key) => {
        setFieldlValue(
            "acuCombination",
            values["acuCombination"].map((aC, index) => {
                if (index === key) {
                    return {
                        ...aC,
                        [name]: value,
                    };
                } else {
                    return aC;
                }
            })
        );
    }
    const deleteHandler = (key) => {
        setFieldlValue(
            "acuCombination",
            values["acuCombination"].filter(
                (aC, index) => index !== key
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
                <Text style={styles.buttonTitle}>Add Acu-point</Text>
            </TouchableOpacity>
            <View style={styles.inputsContainer}>
                {values["acuCombination"]?.map((input, key) => isTablet ? (
                    <View style={styles.inputContainer}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            <View
                                style={{
                                    marginBottom: 16,
                                    width: key != 0 ? "25%" : "30%",
                                    flexDirection: "column",
                                    alignItems: null,
                                }}
                            >
                                <Text
                                    style={{
                                        marginBottom: 5,
                                    }}
                                >
                                    {"Acu-point:"}
                                </Text>
                                <View
                                    style={{
                                        width: "100%",
                                        marginLeft: 0,
                                    }}
                                >
                                    <Dropdown
                                        textInputPlaceholder={"Select Acu-point"}
                                        data={dataAcuPoints}
                                        value={input["acuPoints"]}
                                        onChange={value => handleAcuChange("acuPoints", value, key)}
                                        mode="flat"
                                        disabled={isEdit ? false : true}
                                    />
                                </View>
                            </View>
                            <View style={{
                                width: "25%",
                            }}>
                                <View
                                    style={{
                                        marginBottom: 16,
                                        width: "100%",
                                        flexDirection: "column",
                                        alignItems: null,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginBottom: 5,
                                        }}
                                    >
                                        {"Needle Manipulation:"}
                                    </Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            marginLeft: 0,
                                        }}
                                    >
                                        <Dropdown
                                            textInputPlaceholder={"Select Manipulation"}
                                            data={dataNeedleManipulation}
                                            value={input["needleManipulation"]}
                                            onChange={value => handleAcuChange("needleManipulation", value, key)}
                                            mode="flat"
                                            disabled={isEdit ? false : true}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                width: "12%",
                            }}>
                                <View
                                    style={{
                                        marginBottom: 16,
                                        width: "100%",
                                        flexDirection: "column",
                                        alignItems: null,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginBottom: 5,
                                        }}
                                    >
                                        {"Moxibustion:"}
                                    </Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            marginLeft: 0,
                                        }}
                                    >
                                        <Dropdown
                                            textInputPlaceholder="Y/N"
                                            data={dataMoxibustion}
                                            value={input["moxibustion"]}
                                            onChange={value => handleAcuChange("moxibustion", value, key)}
                                            mode="flat"
                                            disabled={isEdit ? false : true}
                                        />
                                    </View>
                                </View>
                            </View>


                            <View style={{
                                width: "15%",
                                // marginHorizontal: 10,
                                marginBottom: 0,
                            }}>
                                <View
                                    style={{
                                        marginBottom: 16,
                                        width: "100%",
                                        flexDirection: "column",
                                        alignItems: null,
                                        marginTop: -15
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginBottom: 5,
                                        }}
                                    >
                                        {"Stimulation Method:"}
                                    </Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            marginLeft: 0,
                                        }}
                                    >
                                        <Dropdown
                                            textInputPlaceholder="Method ?"
                                            data={dataStimulationMethod}
                                            value={input["stimulationMethod"]}
                                            onChange={value => handleAcuChange("stimulationMethod", value, key)}
                                            mode="flat"
                                            disabled={isEdit ? false : true}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                width: "13%",
                                // marginHorizontal: 10,
                                marginBottom: 0,
                            }}>
                                <IntegerInput label="Stimulation Time :"
                                    value={input["stimulationDuration"]} setValue={value => handleAcuChange("stimulationDuration", value, key)} isEdit={isEdit} />
                            </View>
                            {/* <AppTextInput
                                label="Stimulation Duration :"
                                placeholder=""
                                keyboardType={"number-pad"}
                                // options={dataPrincipleTreatment}
                                value={input["stimulationDuration"]}
                                onChangeText={value => updateStimulationDuration(value, key)}
                            /> */}
                            {isEdit && key != 0 &&
                                // <TouchableOpacity>
                                //     <View style={styles.removeButton}>
                                //         <Text>Remove</Text>
                                //         <Image
                                //             source={require("../../../assets/dele.png")}
                                //             style={{ height: 20, width: 20, marginLeft: 10 }}
                                //         />
                                //     </View>
                                // </TouchableOpacity>
                                <View style={{ width: "5%", alignItems: "center", justifyContent: "center" }}>
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
                ) : (
                    <View style={styles.inputContainer}>
                        <View style={{ flex: 1, flexDirection: "column", justifyContent: null }}>
                            <View
                                style={{
                                    marginBottom: 16,
                                    width: "100%",
                                    flexDirection: "column",
                                    alignItems: null,
                                }}
                            >
                                <Text
                                    style={{
                                        marginBottom: 5,
                                    }}
                                >
                                    {"Acu-point:"}
                                </Text>
                                <View
                                    style={{
                                        width: "100%",
                                        marginLeft: 0,
                                    }}
                                >
                                    <Dropdown
                                        textInputPlaceholder={"Select Acu-point"}
                                        data={dataAcuPoints}
                                        value={input["acuPoints"]}
                                        onChange={value => handleAcuChange("acuPoints", value, key)}
                                        mode="flat"
                                        disabled={isEdit ? false : true}
                                    />
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }} >
                                <View style={{
                                    width: "45%",
                                }}>
                                    <View
                                        style={{
                                            marginBottom: 16,
                                            width: "100%",
                                            flexDirection: "column",
                                            alignItems: null,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginBottom: 5,
                                            }}
                                        >
                                            {"Needle Manipulation:"}
                                        </Text>
                                        <View
                                            style={{
                                                width: "100%",
                                                marginLeft: 0,
                                            }}
                                        >
                                            <Dropdown
                                                textInputPlaceholder={"Select Needle Manipulation"}
                                                data={dataNeedleManipulation}
                                                value={input["needleManipulation"]}
                                                onChange={value => handleAcuChange("needleManipulation", value, key)}
                                                mode="flat"
                                                disabled={isEdit ? false : true}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    width: "45%",
                                }}>
                                    <View
                                        style={{
                                            marginBottom: 16,
                                            width: "100%",
                                            flexDirection: "column",
                                            alignItems: null,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginBottom: 5,
                                            }}
                                        >
                                            {"Moxibustion:"}
                                        </Text>
                                        <View
                                            style={{
                                                width: "100%",
                                                marginLeft: 0,
                                            }}
                                        >
                                            <Dropdown
                                                textInputPlaceholder="Yes/No"
                                                data={dataMoxibustion}
                                                value={input["moxibustion"]}
                                                onChange={value => handleAcuChange("moxibustion", value, key)}
                                                mode="flat"
                                                disabled={isEdit ? false : true}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                marginBottom: key != 0 ? 0 : 16,
                            }} >
                                <View style={{
                                    width: "45%",
                                    // marginHorizontal: 10,
                                    marginBottom: 0,
                                }}>
                                    <View
                                        style={{
                                            marginBottom: 16,
                                            width: "100%",
                                            flexDirection: "column",
                                            alignItems: null,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginBottom: 5,
                                            }}
                                        >
                                            {"Stimulation Method:"}
                                        </Text>
                                        <View
                                            style={{
                                                width: "100%",
                                                marginLeft: 0,
                                            }}
                                        >
                                            <Dropdown
                                                textInputPlaceholder="Select Method"
                                                data={dataStimulationMethod}
                                                value={input["stimulationMethod"]}
                                                onChange={value => handleAcuChange("stimulationMethod", value, key)}
                                                mode="flat"
                                                disabled={isEdit ? false : true}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    width: "45%",
                                    // marginHorizontal: 10,
                                    marginBottom: 0,
                                }}>
                                    <IntegerInput label="Stimulation Time :"
                                        value={input["stimulationDuration"]} setValue={value => handleAcuChange("stimulationDuration", value, key)} isEdit={isEdit} />
                                </View>
                                {/* <AppTextInput
                                label="Stimulation Duration :"
                                placeholder=""
                                keyboardType={"number-pad"}
                                // options={dataPrincipleTreatment}
                                value={input["stimulationDuration"]}
                                onChangeText={value => updateStimulationDuration(value, key)}
                            /> */}
                            </View>
                            {isEdit && key != 0 &&
                                // <TouchableOpacity>
                                //     <View style={styles.removeButton}>
                                //         <Text>Remove</Text>
                                //         <Image
                                //             source={require("../../../assets/dele.png")}
                                //             style={{ height: 20, width: 20, marginLeft: 10 }}
                                //         />
                                //     </View>
                                // </TouchableOpacity>
                                <View style={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
                                    <IconButton
                                        icon="delete"
                                        style={{ marginLeft: 8, backgroundColor: "#fa5a5a", }}
                                        color="white"
                                        onPress={() => deleteHandler(key)}
                                    />
                                </View>
                            }
                        </View>


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
    removeButton: {
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ddd",
        // width: "30%",
        padding: 10,
        borderRadius: 10,
        alignSelf: "flex-end",
    },
})

export default AcuComibination