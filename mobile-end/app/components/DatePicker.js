import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Platform,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const DatePicker = ({
  textStyle = {},
  defaultDate = moment(),
  onDateChange = () => {},
  maxYears = 20,
  minYears = 20,
  placeholder,
  left,
  disabled = false,
  ...otherProps
}) => {
  const [date, setDate] = useState(new Date(defaultDate));
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDate(new Date(defaultDate));
  }, [defaultDate]);

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === "android") {
      setShow(false);
      onDateChange(currentDate);
    }
  };

  const onPressOk = () => {
    onDateChange(date);
    setShow(false);
  };

  const onPressCancel = () => {
    setShow(false);
  };

  const renderDatePicker = () => (
    <DateTimePicker
      timeZoneName={Intl.DateTimeFormat().resolvedOptions().timeZone} 
      value={date}
      mode="date"
      minimumDate={new Date(moment().subtract(minYears, "years"))}
      maximumDate={new Date(moment().add(maxYears, "years"))}
      onChange={onChange}
      display={Platform.OS === "ios" ? "spinner" : "default"}
      {...otherProps}
    />
  );

  return (
    <TouchableOpacity disabled={disabled} onPress={() => setShow(true)}>
      <View>
        <View style={[styles.dateDisplay, textStyle]}>
          {left}
          <Text>{moment(date).format("YYYY-MM-DD")}</Text>
        </View>
        {Platform.OS === "android" && show && renderDatePicker()}
        {Platform.OS === "ios" && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            supportedOrientations={["portrait"]}
            onRequestClose={() => setShow(false)}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalBackground}
                activeOpacity={1}
                onPress={() => setShow(false)}
              >
                <View style={styles.pickerContainer}>
                  <View style={styles.pickerHeader}>
                    <TouchableOpacity onPress={onPressCancel} style={styles.btnCancel}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressOk} style={styles.btnOk}>
                      <Text>Ok</Text>
                    </TouchableOpacity>
                  </View>
                  {renderDatePicker()}
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dateDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 256,
    overflow: "hidden",
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E9E9E9",
  },
  btnCancel: {
    padding: 10,
  },
  btnOk: {
    padding: 10,
  },
});

export default DatePicker;