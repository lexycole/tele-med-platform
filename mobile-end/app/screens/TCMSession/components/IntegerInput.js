import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

export default function IntegerInput({ value, setValue, label, isEdit }) {
    return (
        <View style={{ marginTop: -15 }} >
            <Text style={{ color: '#444', fontSize: 14, fontWeight: '500' }}>{label}</Text>

            <View style={styles.container}>
                <Text style={{ color: '#777', fontSize: 16, fontWeight: '500' }}>{value}</Text>
                <View>
                    {/* <TouchableOpacity style={styles.button} onPress={() => setValue(value - 1)} >
                        <Icon name='ios-caret-up' size={20} color={'#aaa'} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.button} onPress={() => setValue(value + 1)} disabled={isEdit ? false : true}>
                        <Icon name='ios-caret-down' size={20} color={'#aaa'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#aaa',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 4,
        // marginBottom: 7,
        marginTop: 5
    },
    button: {
        marginRight: 10
    }
})