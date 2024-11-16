import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Card, Avatar, Title } from "react-native-paper";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from '@clerk/clerk-expo';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function Calender({back}) {
  const [isAgendaView, setIsAgendaView] = React.useState(false);
  const [items, setItems] = React.useState({});
  const [currentMonth, setCurrentMonth] = React.useState(null);
  const [agendaDateStr, setAgendaDateStr] = React.useState(null);

  // check if tablet or not
  const [isTablet, setIsTablet] = React.useState(false);
  const { height, width } = useWindowDimensions();
  function isTabletBasedOnRatio(ratio) {
    if (ratio > 1.6) {
      return false;
    } else {
      return true;
    }
  }

  // for day-week-month buttons
  const [selectedViewMode, setSelectedViewMode] = React.useState("week");

  const handleSelectedViewMode = (mode) => {
    if (mode === "day") {
      setSelectedViewMode("day");
    } else if (mode === "week") {
      setSelectedViewMode("week");
    } else if (mode === "month") {
      setSelectedViewMode("month");
    }
  };

  // for datepicker
  const [dateDP, setDateDP] = React.useState(new Date());
  const [modeDP, setModeDP] = React.useState("date");
  const [showDP, setShowDP] = React.useState(false);
  const onChangeDP = (event, selectedDate) => {
    const currentDate = selectedDate || dateDP;
    setShowDP(Platform.OS === "ios");
    setDateDP(currentDate);
    onUpdateSelectedDate(currentDate.toISOString().slice(0, 10));
    setAgendaDateStr(currentDate.toISOString().slice(0, 10));
  };

  const showModeDP = (currentMode) => {
    setShowDP(true);
    setModeDP(currentMode);
  };

  const showDatepicker = () => {
    showModeDP("date");
  };

  const showTimepicker = () => {
    showModeDP("time");
  };

  // month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  // a function to generate randomly items for the agenda (remove this function and pass items data to show on agenda)
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          marginRight: 10,
          marginTop: 17,
        }}
      >
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{ fontWeight: "bold", color: "gray", fontSize: 14 }}
                >
                  10:30AM - 11:30AM
                </Text>
                <Text>Name</Text>
                <Text style={{ color: "gray" }}>Title</Text>
              </View>
              <Avatar.Text label="T" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const Arrow = (props) => {
    const { direction } = props;
    return (
      <Text style={{ color: "#03b1fc", fontWeight: "bold", fontSize: 22 }}>
        {direction === "left" ? "<" : ">"}
      </Text>
    );
  };

  const onUpdateSelectedDate = (dateString) => {
    const dateStr = dateString.replace("-", "").replace("-", "");
    setCurrentMonth(`${moment(dateStr).format("MMMM YYYY")}`);
  };

  const handleAgendaView = () => {
    setIsAgendaView(!isAgendaView);
  };

  React.useEffect(() => {
    setIsTablet(() => {
      return isTabletBasedOnRatio(height / width);
    });
    const tdate = new Date();
    const dateStr = `${tdate.getFullYear()}-${
      tdate.getMonth() + 1 > 9
        ? tdate.getMonth() + 1
        : "0" + (tdate.getMonth() + 1)
    }-${tdate.getDate()}`;
    onUpdateSelectedDate(dateStr);
  }, []);

  const { goBack } = useNavigation();
  React.useEffect(() => console.log(back), [])
  
  return (
    <View
      style={{
        ...styles.calWrapper,
        flexDirection: isTablet ? "row" : "column",
      }}
    >
      {!isTablet ? (
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
            <TouchableOpacity onPress={goBack} style={styles.leftIcon} >
              <MaterialIcons
                style={{
                  padding: 5,
                  width: "100%",
                }}
                name="arrow-back-ios"
                color="#00B7DD"
                size={20}
              />
            </TouchableOpacity>
          
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setAgendaDateStr(null);
              handleAgendaView();
            }}
          >
            <Text style={{ color: "#03b1fc" }}>
              Switch to {isAgendaView ? "Calendar" : "Agenda"}
            </Text>
          </TouchableOpacity>
          {isAgendaView ? (
            <Ionicons
              name="calendar-sharp"
              size={26}
              color="black"
              onPress={showDatepicker}
            />
          ) : null}
        </View>
      ) : null}
      {isTablet ? (
        <View
          style={{
            width: isTablet ? "40%" : "100%",
            alignSelf: isTablet ? "flex-start" : "center",
          }}
        >
          <Calendar
            // Initially visible month. Default = Date()
            // current={}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {
              handleAgendaView();
              setAgendaDateStr(day.dateString);
              onUpdateSelectedDate(day.dateString);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {
              console.log("selected day", day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"yyyy MM"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => <Arrow direction={direction} />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={(addMonth) => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={false}
            // Replace default month and year title with custom one. the function receive a date as parameter
            renderHeader={(date) => {
              return (
                <Title
                  style={{
                    alignSelf: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {`${monthNames[date.getMonth()]} ${date.getFullYear()}`}
                </Title>
              );
            }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            theme={{
              "stylesheet.calendar.header": {
                dayTextAtIndex6: {
                  color: "red",
                },
              },
            }}
          />
        </View>
      ) : null}
      {isAgendaView || isTablet ? (
        <View
          style={{
            flex: 1,
            width: isTablet ? "60%" : "100%",
            alignSelf: isTablet ? "flex-end" : "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSelectedViewMode("day");
              }}
            >
              <Text
                style={{
                  color: selectedViewMode === "day" ? "#03b1fc" : "#999",
                  marginRight: 20,
                  borderBottomColor: "#03b1fc",
                  borderBottomWidth: selectedViewMode === "day" ? 2 : 0,
                }}
              >
                Day
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSelectedViewMode("week");
              }}
            >
              <Text
                style={{
                  color: selectedViewMode === "week" ? "#03b1fc" : "#999",
                  marginRight: 20,
                  borderBottomColor:
                    selectedViewMode === "week" ? "#03b1fc" : null,
                  borderBottomWidth: selectedViewMode === "week" ? 2 : null,
                }}
              >
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSelectedViewMode("month");
              }}
            >
              <Text
                style={{
                  color: selectedViewMode === "month" ? "#03b1fc" : "#999",
                  marginRight: 20,
                  borderBottomColor: "#03b1fc",
                  borderBottomWidth: selectedViewMode === "month" ? 2 : 0,
                }}
              >
                Month
              </Text>
            </TouchableOpacity>
          </View>
          <Title
            style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold" }}
          >
            {currentMonth}
          </Title>
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
          <Agenda
            items={items}
            loadItemsForMonth={loadItems}
            selected={
              agendaDateStr ? agendaDateStr : moment().format("YYYY[-]MM[-]DD")
            }
            renderItem={renderItem}
            disabledByDefault={false}
            hideKnob={true}
            showClosingKnob={false}
            onDayChange={(day) => {
              onUpdateSelectedDate(day.dateString);
            }}
            onDayPress={(day) => {
              onUpdateSelectedDate(day.dateString);
            }}
          />
        </View>
      ) : (
        <Calendar
          // Initially visible month. Default = Date()
          // current={}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            handleAgendaView();
            setAgendaDateStr(day.dateString);
            onUpdateSelectedDate(day.dateString);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MM"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => <Arrow direction={direction} />}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={false}
          // Replace default month and year title with custom one. the function receive a date as parameter
          renderHeader={(date) => {
            return (
              <Title
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {`${monthNames[date.getMonth()]} ${date.getFullYear()}`}
              </Title>
            );
          }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          theme={{
            "stylesheet.calendar.header": {
              dayTextAtIndex6: {
                color: "red",
              },
            },
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  calWrapper: {
    flex: 1,
    width: "100%",
  },
  left: {
    flex: 2,
    justifyContent: "center",
  },
});
