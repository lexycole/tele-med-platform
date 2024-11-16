import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
// import { getFiles, uploadFile } from '../../src/api/attachement';
import { useState } from 'react';

const deviceWidth = Dimensions.get("window").width;

const AttachementPicker = ({ setDocs, ticketId }) => {

    const [ loading, setLoading ] = useState(false)

    const selectFile = async () => {

        setLoading(true);

        try{
            const item = await DocumentPicker.getDocumentAsync({
                multiple: false,
                copyToCacheDirectory: true,
                type: 'image/*'
            })

            if(!item.cancelled){
                const { ok, data } = await uploadFile(item, ticketId)
                if(ok){
                    // const file = await getFiles(data?.attachments[0]?.filePath)
                    setDocs(data?.attachments)
                }  
            }
            setLoading(false)
        }catch(ex){
            console.log(ex)
            setLoading(false)
        }
    }

    if(loading) return <Text style={{
        color: "#fff",
        textAlign: 'center',
        backgroundColor: "#00ACAC",
        padding: 5,
        borderRadius: 5,
        width: deviceWidth / 3
    }} >
        loading...
    </Text>

  return (
    <View>
        <TouchableOpacity 
            style={{ width: deviceWidth / 3 }}
            onPress={ selectFile }
        >
            <Text
                style={{
                    color: "#fff",
                    textAlign: 'center',
                    backgroundColor: "#00ACAC",
                    padding: 5,
                    borderRadius: 5,
                }}
            >
                Add Attachments
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default AttachementPicker