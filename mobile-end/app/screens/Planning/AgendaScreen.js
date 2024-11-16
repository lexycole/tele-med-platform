import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, ActivityIndicator
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Avatar, Card, IconButton, Title } from "react-native-paper";
// import { state } from "../../../App";
// import { getAppointments } from "../../api/appointments";
// import ActivityIndicator from "../../index";
import Header from "../../components/Header";
import colors from "./colors";
import OperationsAppointment from "./OperationsAppointment";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";
dayjs.extend(isBetween);

export default function AgendaScreen({ navigation,route }) {
  const updated=route?.params?.updated
  const [selectedViewMode, setSelectedViewMode] = useState("day");
  const [isTablet, setIsTablet] = useState(state?.isTablet);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState({});
  const isFocused                 = useIsFocused();
  const [showEmptyEvents, setShowEmptyEvents] = useState(true);

  const [dateDP, setDateDP] = useState(new Date());
  const [modeDP, setModeDP] = useState("date");
  const [showDP, setShowDP] = useState(false);
  const onChangeDP = (event, selectedDate) => {
    const currentDate = selectedDate || dateDP;
    setShowDP(Platform.OS === "ios");
    setDateDP(currentDate);
    onUpdateSelectedDate(currentDate.toISOString().slice(0, 10));
  };

  const showModeDP = (currentMode) => {
    setShowDP(true);
    setModeDP(currentMode);
  };

  const showDatepicker = () => {
    showModeDP("date");
  };

  const onUpdateSelectedDate = (date) => {
    setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Agenda",
      headerShown: true,
      headerStyle: { backgroundColor: "#00B7DD" },
      headerTintColor: "white",
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {!isTablet && (
              <IconButton onPress={showDatepicker} size={26} icon="calendar" />
            )}
            {/* click button to switch to Fullcalendar */}
            {!isTablet && (
              <IconButton
                onPress={() => setAppointmentModal(true)}
                size={26}
                icon="plus-circle"
              />
            )}
            <TouchableOpacity>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginHorizontal: 10,
                  marginBottom: isTablet ? 10 : 0,
                  resizeMode: "contain",
                }}
                source={require("../../assets/icons/search.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginHorizontal: 10,
                  marginBottom: isTablet ? 10 : 0,
                  resizeMode: "contain",
                }}
                source={require("../../assets/icons/dailyplanner.png")}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  // const getFilterAppointments = async () => {
  //   setLoading(true);
  //   const { ok, data: appointments } = await getAppointments();
  //   console.log('Okay');
  //   console.log(ok);
  //   if (!ok) return null;
  //   const agendaItems = {};
  //   let tempAppointementObj = {};
  //   let date;
  //   appointments.forEach((singleAppointment) => {
  //     tempAppointementObj = {
  //       name: `${singleAppointment.patientNo.user.contactName.first} ${singleAppointment.patientNo.user.contactName.last}`,
  //       dateBirth: singleAppointment.patientNo.user.dateBirth,
  //       image: singleAppointment.patientNo.user.imageSrc,
  //       gender: singleAppointment.patientNo.user.gender,
  //       title: singleAppointment.title,
  //       start: singleAppointment.startTime,
  //       end: singleAppointment.endTime,
  //       _id: singleAppointment._id,
  //       date: singleAppointment.startTime.split("T")[0],
  //       color: singleAppointment.color,
  //       sessionType: singleAppointment.sessionType,
  //       appointmentType: singleAppointment.appointmentType,
  //       status:singleAppointment.patientNo.status,
  //       complaint:singleAppointment.title,
  //       clinicNo: singleAppointment.clinicNo,
  //       patientNo: singleAppointment.patientNo,
  //       //clinicUser: singleAppointment.clinicUser,
  //       doctorNo: singleAppointment.doctorNo,
  //     };
  //     date = singleAppointment.startTime.split("T")[0]
  //     if (agendaItems[date]) {
  //       agendaItems[date].push(tempAppointementObj);
  //     } else {
  //       agendaItems[date] = [];
  //       agendaItems[date].push(tempAppointementObj);
  //     }
  //   });
  //   setItems(agendaItems);
  //   setLoading(false);
  // };

  const checkForAppointmentsExistence = () => {
    for (const item of Object.keys(items)) {
      if (
        (selectedViewMode === "day" &&
          dayjs(selectedDate).isSame(item, "day")) ||
        (selectedViewMode === "week" &&
          dayjs(selectedDate).isSame(item, "week")) ||
        (selectedViewMode === "month" &&
          dayjs(selectedDate).isSame(item, "month"))
      ) {
        setShowEmptyEvents(false);
      }
    }
  };

  useEffect(() => {
    setShowEmptyEvents(true);
    checkForAppointmentsExistence();
  }, [selectedDate]);
  useEffect(() => {
    if(updated){
      // getFilterAppointments();
    }
  }, [updated]);

  useEffect(() => {
    // getFilterAppointments();
    setIsTablet(state?.isTablet);
    onUpdateSelectedDate(dayjs());
    checkForAppointmentsExistence();
   
  }, []);

  if (appointmentModal) {
    return (
      <OperationsAppointment
        visible={appointmentModal}
        setVisible={setAppointmentModal}
        selectedDate={selectedDate}
        // updateAppointments={getFilterAppointments}
      />
    );
  }

  const renderItem = ({ item }) => {
   
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("AppointmentInfo", { item: item })}
        activeOpacity={0.8}
        style={{
          
          marginRight: 10,
          marginTop: 10,
        }}
      >
        <Card style={{ backgroundColor: item.color ? item.color : "white" }}>
          <Card.Content>
            {isTablet ? (
              <View
                style={{
                  flexDirection: "column",
                  // alignItems: "center",
                  // flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: item.color ? "white" : "#ddd",
                    fontSize: 14,
                    marginRight: 10,
                  }}
                >
                  {dayjs(item.start).format("hh:mm A")} -
                  {dayjs(item.end).add(2, "hour").format("hh:mm A")}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Avatar.Image source={{ uri: item.image }} size={26} />
                  <Text  style={{ color: "#fff", marginHorizontal: 10 }}>
                    {item.name}
                  </Text>
                </View>
                {/* <Text style={{ textAlign: "center", marginHorizontal: 10 }}>
                  {item.dirthDate}
                </Text> */}
                <Text
                  style={{
                    color: item.color ? "white" : "#ddd",
                    paddingRight: 10,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            ) : (
              <>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: item.color ? "white" : "#ddd",
                      fontSize: 14,
                      marginBottom: 10,
                    }}
                  >
                    {dayjs(item.start).format("hh:mm A")} -
                    {dayjs(item.end).add(2, "hour").format("hh:mm A")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Avatar.Image
                    source={
                      `${item.image}`.length <= 0
                        ? require("../../assets/user.png")
                        : { uri: item.image }
                    }
                    size={26}
                  />
                  <Text style={{ textAlign: "center", marginHorizontal: 10 }}>
                    {item.name}
                  </Text>
                  <Text style={{ textAlign: "center", marginHorizontal: 10 }}>
                   {item.title}
                  </Text>
                </View>
              </>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />

      <AgendaHeader
        selectedViewMode={selectedViewMode}
        setSelectedViewMode={setSelectedViewMode}
        selectedDate={selectedDate}
        onUpdate={onUpdateSelectedDate}
        isTablet={isTablet}
        setAppointmentModal={setAppointmentModal}
      />
      <View
        style={{
          ...styles.calWrapper,
          flexDirection: isTablet ? "row" : "column",
        }}
      >
        {isTablet && (
          <MiniCalendar
            selectedDate={selectedDate}
            onUpdate={onUpdateSelectedDate}
          />
        )}
        {showDP && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateDP}
            mode={modeDP}
            is24Hour={true}
            display="default"
            onChange={onChangeDP}
          />
        )}
        <View
          style={{
            flex: 1,
          }}
        >
          {items &&
            <FlatList
            contentContainerStyle={{flex:1}}
              data={Object.keys(items)}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => {
                if (
                  (selectedViewMode === "day" &&
                    dayjs(selectedDate).isSame(item, "day")) ||
                  (selectedViewMode === "week" &&
                    dayjs(selectedDate).isSame(item, "week")) ||
                  (selectedViewMode === "month" &&
                    dayjs(selectedDate).isSame(item, "month"))
                ) {
                  return (
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <FlatList data={items[item]} renderItem={renderItem} />
                      </View>
                    </View>
                  );
                }

                return null;
              }}
              ListEmptyComponent={
                showEmptyEvents && (
                  <View
                    style={{
                      height: 200,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#aaa",
                    }}
                  >
                    <Text>No Events To Display</Text>
                  </View>
                )
              }
            />
          }
        </View>
      </View>
    </View>
  );
}

const MiniCalendar = ({ selectedDate, onUpdate }) => {

  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = ['S','M','T','W','T','F','S'];

  const Arrow = (props) => {
    const { direction } = props;
    return (
      <Text style={{ color: "#03b1fc", fontSize: 22 }}>
        {direction === "left" ? (
          <TouchableOpacity
            onPress={() => onUpdate(dayjs(selectedDate).add(-1, "month"))}
          >
            <MaterialIcons name="arrow-left" size={25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onUpdate(dayjs(selectedDate).add(1, "month"))}
          >
            <MaterialIcons name="arrow-right" size={25} />
          </TouchableOpacity>
        )}
      </Text>
    );
  };
  return (
    <View
      style={{
        marginBottom: "8%",
        minWidth: "30%",
      }}
    >
      <Calendar
        current={selectedDate}
        onDayPress={(day) => {
          onUpdate(day.dateString);
        }}
        onMonthChange={(month) => {
          onUpdate(month.dateString);
        }}
        renderArrow={(direction) => <Arrow direction={direction} />}
        hideExtraDays={true}
        showWeekNumbers={true}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "lightblue",
            selectedTextColor: "darkblue",
          },
        }}
        renderHeader={(date) => {
          return (
            <Title
              style={{
                alignSelf: "center",
                fontSize: 16,
                marginHorizontal: 20,
              }}
            >
              {dayjs(date).format("MMMM YYYY")}
            </Title>
          );
        }}
        theme={{
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
};

const AgendaHeader = ({
  selectedViewMode,
  setSelectedViewMode,
  selectedDate,
  onUpdate,
  isTablet,
  setAppointmentModal,
}) => {
  const ViewModeButton = ({ title, select = "day" }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          setSelectedViewMode(select);
        }}
        style={[
          styles.viewModeItem,
          {
            backgroundColor: selectedViewMode === select && "white",
          },
        ]}
      >
        <Text style={{ color: "#555" }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.headerContainer}>
      {isTablet && (
        <IconButton
          style={{ backgroundColor: "#00B7DD", borderRadius: 10 }}
          onPress={() => setAppointmentModal(true)}
          size={26}
          icon="plus-circle"
          color="white"
        />
      )}
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() =>
            onUpdate(dayjs(selectedDate).add(-1, selectedViewMode))
          }
        >
          <MaterialIcons
            style={{
              padding: 5,
              width: "100%",
            }}
            name="arrow-back-ios"
            color={colors.transparentBlack}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dateShow}
          onPress={() => onUpdate(dayjs())}
        >
          <Text>
            {selectedViewMode === "day" &&
              `${dayjs(selectedDate).format("DD MMM YYYY")}`}
            {selectedViewMode === "week" &&
              `${dayjs(selectedDate)
                .startOf("week")
                .format("DD MMM")} - ${dayjs(selectedDate)
                .endOf("week")
                .format("DD MMM")} ${
                isTablet ? dayjs(selectedDate).format("YYYY") : ""
              }`}
            {selectedViewMode === "month" &&
              `${dayjs(selectedDate).format("MMMM YYYY")}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => onUpdate(dayjs(selectedDate).add(1, selectedViewMode))}
        >
          <MaterialIcons
            style={{
              padding: 5,
              width: "100%",
            }}
            name="arrow-forward-ios"
            color={colors.transparentBlack}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewMode}>
        <ViewModeButton title="Day" select="day" />
        <ViewModeButton title="Week" select="week" />
        <ViewModeButton title="Month" select="month" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calWrapper: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  dateShow: {
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 5,
    borderRadius: 5,
  },

  viewMode: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  viewModeItem: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
});
