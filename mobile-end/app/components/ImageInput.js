import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import colors from "./../config/colors";

function ImageInput({ imageUri, onChangeImage }) {
 
    useEffect(() => {
         requestPermission();
      }, []);

    const requestPermission = async ()=>{
         const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
         if(!granted) 
           alert("you need to enable permission to access the library");
       }

      const handlePress = () => {
        if (!imageUri) selectImage();
        else
          Alert.alert("Delete", "Are you sure you want to delete this image?", [
            { text: "Yes", onPress: () => onChangeImage(null) },
            { text: "No" },
          ]);
      };

      const selectImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [4, 3],
          });
          console.log("ImagePicker result:", result);
      
          if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            const fileInfo = await FileSystem.getInfoAsync(uri);
            console.log("Image size (bytes):", fileInfo.size);
            console.log("Image size (MB):", (fileInfo.size / (1024 * 1024)).toFixed(2));
            onChangeImage(uri);
          }
        } catch (error) {
          console.log("Error during reading Image Library", error);
        }
      };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.GREY.Trolley_Grey}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.GREY.whiteish,
    borderRadius: 15,
    height: 100,
    width: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;