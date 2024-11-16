import React, { Component, useState } from 'react'
import { Text, View, TextInput, ScrollView, LogBox } from 'react-native'
// import DatePicker from 'react-native-datepicker'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
// import ModalDropdown from 'react-native-modal-dropdown';

LogBox.ignoreAllLogs();

const Membership = () => {
    const [organizationAName, setOrganizationAName] = useState('');
    const [organizationAMemberNo, setOrganizationAMemberNo] = useState('');
    const [organizationBName, setOrganizationBName] = useState('');
    const [organizationBMemberNo, setOrganizationBMemberNo] = useState('');

    return (
        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
            <View>
                <Text style={{ fontSize: 30, textAlign: "center" }}>Membership</Text>
            </View>
            <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                <TextInput
                    placeholder="organizationAName"
                    value={organizationAName}
                    onChangeText={setOrganizationAName}
                    style={{ marginStart: 10, flex: 1 }}
                />
            </View>
            <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                <TextInput
                    placeholder="OrganizationA MemberNo"
                    value={organizationAMemberNo}
                    onChangeText={setOrganizationAMemberNo}
                    style={{ marginStart: 10, flex: 1 }}
                />
            </View>
            <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                <TextInput
                    placeholder="organizationBName"
                    value={organizationBName}
                    onChangeText={setOrganizationBName}
                    style={{ marginStart: 10, flex: 1 }}
                />
            </View>
        </View>
    );
}

export default Membership;

