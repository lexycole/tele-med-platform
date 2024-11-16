import { View, Text, Platform, TouchableOpacity, StyleSheet, } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import Modal from 'react-native-modal'
import { useSnapshot } from 'valtio'
import { state } from '../../../../App'
export default function BottomModal({ onValueChange, selectedValue, children, placeholder,style }) {
    const [open, setOpen] = useState(false)
    const { isTablet } = useSnapshot(state);

    return (
        <View style={Platform.OS == 'android' && style}>
            {Platform.OS == 'ios' && !isTablet ?
                <>
                    <TouchableOpacity style={styles.container} onPress={() => setOpen(true)}>
                        <Text >{selectedValue ? selectedValue : placeholder}</Text>
                    </TouchableOpacity>

                    <Modal onBackdropPress={() => setOpen(false)} style={styles.modal} backdropOpacity={0.1} isVisible={open} >
                        <View style={{ height: '100%', width: '100%', bottom: 0, position: "absolute", backgroundColor: 'white' }}
                        >

                            <Picker
                                mode="dropdown"
                                onValueChange={(value) => { onValueChange(value); setOpen(false) }}
                                selectedValue={selectedValue}
                            >
                                {children}

                            </Picker>
                        </View>
                    </Modal>

                </>
                :
                <View
                    style={{
                        height: 58,
                        width: isTablet ? 100 : "100%",
                        borderWidth: 1,
                        borderColor: "#aaa",
                        borderRadius: 8,
                        marginTop: 24,
                    }}
                >
                    <Picker
                        mode="dropdown"
                        onValueChange={onValueChange}
                        selectedValue={selectedValue}
                    >
                        {children}
                    </Picker>
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0e0e0',
        width: 150, height: 60,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18
    },
    modal: { height: 200, width: '100%', bottom: 0, position: "absolute", backgroundColor: 'white', marginLeft: 0, marginRight: 0, marginBottom: 0 }
})