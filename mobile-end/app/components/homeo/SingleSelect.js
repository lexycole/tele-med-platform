import * as React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { colors } from "./colors";
import Icon from "react-native-vector-icons/AntDesign";

const SingleSelect = ({ onPress, value, state, data, onPressItem }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.input}>
        <Text
          style={{
            color: colors.inputTitleColor,
            fontSize: 16,
          }}
        >
          {value}
        </Text>
        <Icon
          name={!state ? "caretdown" : "caretup"}
          color={colors.inputTitleColor}
          size={16}
        />
      </TouchableOpacity>
      {state ? (
        <View
          style={{
            width: "90%",
            maxHeight: 150,
            alignSelf: "center",
            backgroundColor: colors.pickerBackColor,
            zIndex: 999,
            position: "absolute",
            top: 50,
            borderRadius: 5,
          }}
        >
          <FlatList
            data={data}
            nestedScrollEnabled
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  onPress={() => onPressItem(item)}
                  style={styles.pickerButton}
                >
                  <Text style={styles.pickerText}>{item.label}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.value}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SingleSelect;

const styles = StyleSheet.create({
  containerStyle: {
    width: "90%",
    alignSelf: "center",
  },
  textStyle: {
    color: colors.inputTitleColor,
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    height: 42,
    width: "90%",
    backgroundColor: colors.pickerBackColor,
    borderRadius: 6,
    marginTop: 8,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 16,
    color: colors.inputTextColor,
    borderColor: colors.inputPlaceHolder,
    borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerButton: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerText: {
    color: colors.inputTextColor,
    fontSize: 16,
  },
});
