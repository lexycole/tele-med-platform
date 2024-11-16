import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React, { useEffect, useLayoutEffect, useState,useRef } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, ActivityIndicator
} from "react-native";
import { Calendar } from "react-native-calendars";
import { IconButton, Title } from "react-native-paper";
// import { state } from "../../../App";
// import { getAppointments } from "../../api/appointments";
// import ActivityIndicator from "../../components/ActivityIndicator";
// import Header from "../../components/Header";
import EventInfo from "../../components/EventInfo";
import colors from "./colors";
import Timeline from "./Timeline";
import OperationsAppointment from "./OperationsAppointment";
dayjs.extend(isBetween);

export default function Cal({ navigation }) {
  const [cellHeight, setCellHeight] = useState(150);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isTablet, setIsTablet] = useState(state.isTablet);
  const [selectedViewMode, setSelectedViewMode] = useState("day");

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

  const getApiAppointments = async () => {
    setLoading(true);
    // const { ok, data } = await getAppointments();

    // if (!ok) return null;
    // const apts = data.map((apt) => ({
    //   id: apt._id,
    //   startTime: apt.startTime,
    //   endTime: apt.endTime,
    //   title: apt.title,
    //   name: `${apt.patientNo.user.contactName.first} ${apt.patientNo.user.contactName.last}`,
    //   image: apt.patientNo.user.imageSrc,
    //   username: `${apt.patientNo.user.contactName.first} ${apt.patientNo.user.contactName.last}`,
    //   color: apt.color,
    //   date: apt.startTime.split("T")[0],
    //   dateBirth: apt.patientNo.user.dateBirth,
    //   height: 100 ,
    //   doctorNo:apt.doctorNo,
    //   clinicNo:apt?.clinicNo,
    //   patientNo:apt?.patientNo,
    //   status:apt?.status,
    //   start: apt.startTime,
    // }));
    setAppointments(apts);
    onUpdateSelectedDate(dayjs());
    setLoading(false);
  };

  useEffect(() => {
    getApiAppointments();
    setIsTablet(state.isTablet);
    onUpdateSelectedDate(dayjs());
    getDaysOfTheWeek();
  }, []);

  const getSelectedDateAppointments = (date) => {
    const filterApts = [];
    let oldHeight = 0;
    appointments.forEach((appointment) => {
      if (dayjs(date).isSame(appointment.date, "day")) {
        const startTime = `${appointment.startTime}`.replace(
          appointment.startTime.slice(-5),
          ""
        );
        const endTime = `${appointment.endTime}`.replace(
          appointment.endTime.slice(-5),
          ""
        );
        console.log(
          (dayjs(startTime).hour() + dayjs(startTime).minute() / 60) *
            cellHeight
        );

        const start =
          (dayjs(startTime).hour() + dayjs(startTime).minute() / 60) *
          cellHeight;

        const end =
          (dayjs(endTime).hour() + dayjs(endTime).minute() / 60) * cellHeight;

        const appt = {
          from: dayjs(startTime).format("HH:mm a"),
          to: dayjs(endTime).format("HH:mm a"),
          height: end - start,
          top: start - oldHeight,
          ...appointment,
        };

        oldHeight = end;
        filterApts.push(appt);
        console.log("old height");
        console.log(oldHeight);
      }
    });

    return filterApts;
  };

  const getDaysOfTheWeek = (date) => {
    const weekDays = [];
    const startOfTheWeek = dayjs(date).startOf("week");
    for (let i = 0; i < 7; i++) {
      weekDays.push(dayjs(startOfTheWeek).add(i, "day"));
      console.log(dayjs(startOfTheWeek).add(i, "day").format("ddd"));
    }
    return weekDays;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Calendar",
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
              <IconButton onPress={showDatepicker} size={26} color="white" icon="calendar" />
            )}
            {/* click button to switch to Fullcalendar */}
            {!isTablet && (
              <IconButton
                onPress={() => setAppointmentModal(true)}
                size={26}
                color="white"
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
            <TouchableOpacity onPress={() => navigation.navigate("Agenda")}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginHorizontal: 10,
                  marginBottom: isTablet ? 10 : 0,
                  resizeMode: "contain",
                }}
                source={require("../../assets/icons/agenda.png")}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  if (appointmentModal) {
    return (
      <OperationsAppointment
        visible={appointmentModal}
        setVisible={setAppointmentModal}
        selectedDate={selectedDate}
        updateAppointments={() => {}}
      />
    );
  }
// for calculating line position
 var lineposition = ((new Date().getHours() * 60) + new Date().getMinutes()+24) * (cellHeight / 60);
 
 // for showing line in middle of screen
 const scrollViewRef = useRef(null);
 const [scrollViewHeight, setScrollViewHeight] = useState(0);

 // Scroll automatically so that line is middle
 const handleLayout = event => {
  const { height } = event.nativeEvent.layout;
  setScrollViewHeight(height);

  const targetY = lineposition - (scrollViewHeight / 2);
  scrollViewRef.current.scrollTo({ x: 0, y: targetY, animated: false });
};
 // end of Scroll automatically so that line is middle

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
          {/* backgroundColor: "#ffd900" */}
          <ScrollView
           ref={scrollViewRef}
           onLayout={handleLayout}
           scrollEventThrottle={16}
          >
            <View style={{ flexDirection: "row" }}>
              {/* timeline plus header */}
              <Timeline cellHeight={cellHeight} />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    height: 60,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  {selectedViewMode === "week" &&
                    getDaysOfTheWeek().map((day) => (
                      <View
                        style={{
                          width: `${100 / 7}%`,
                          borderWidth: 1,
                          borderColor: "#aaa",
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text>{dayjs(day).format("ddd")}</Text>
                        <Text style={{ color: "#777" }}>
                          {dayjs(day).format("DD MMM")}
                        </Text>
                      </View>
                    ))}
                </View>

                {/* grids  */}
                <View style={{ flexDirection: "row", flex: 1 }}>
                  {selectedViewMode === "day" &&
                    appointments &&
                    appointments.length > 0 &&
                    [1].map((item) => {
                      console.log(item);
                      const appts = getSelectedDateAppointments(selectedDate);
                      return (
                        <AppointmentColumn
                          events={appts}
                          width="100%"
                          cellHeight={200}
                        />
                      );
                    })}
                  {selectedViewMode === "week" &&
                    appointments &&
                    appointments.length > 0 &&
                    getDaysOfTheWeek(selectedDate).map((item) => {
                      console.log(item);
                      const appts = getSelectedDateAppointments(item);
                      return (
                        <AppointmentColumn
                          events={appts}
                          width={`${100 / 7}%`}
                          cellHeight={150}
                        />
                      );
                    })}
                </View>
              </View>
              <View
        style={{
          position: "absolute",
          top: lineposition,
          left: 60,
          right: 0,
          height: 2,
          backgroundColor: "red",
        }}
      />
    </View>
          </ScrollView>

        </View>
      </View>
    </View>
  );
}

const AppointmentColumn = ({ events, width, cellHeight }) => {

  return (
    <View style={{ width: width, borderWidth: 1, borderColor: "#aaa" }}>
      <FlatList
        data={events}
        style={{
          marginLeft: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        renderItem={({ item }) => {
          return (
            <>
              <EventInfo cellHeight={cellHeight} appointment={item} />
            </>
          );
        }}
      />
    </View>
  );
};

const MiniCalendar = ({ selectedDate, onUpdate }) => {
  const Arrow = (props) => {
    const { direction } = props;
    return (
      <Text style={{ color: "#03b1fc", fontWeight: "bold", fontSize: 22 }}>
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
        width: "35%",
        height: "40%",
        marginBottom: "8%",
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
                fontSize: 18,
                fontWeight: "bold",
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
    marginHorizontal: 5,
  },
  dateShow: {
    padding: 10,
    backgroundColor: "white",
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
