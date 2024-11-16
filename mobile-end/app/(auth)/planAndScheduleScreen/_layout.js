import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Header from "../../components/Header";
import { deviceHeight, deviceWidth } from "../../config/CommonStyles";

import { useRouter } from 'expo-router';
const Layout = ({ navigation }) => {
  const router = useRouter();
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Header back title={"Plan & Schedule it"} rightComponent /> */}

        {/* cards row */}
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', width: deviceWidth * 0.95, alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, marginTop: 8 }}>
            <Card

              title="Scheduler"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/scheduler.png")}
                />
              )}
              imageUri={require("../../assets/icons/scheduler.png")}
              onPress={() => router.push('/Schedulerf')}

            />
            <Card
              imageUri
              title="Calendar"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/dailyplanner.png")}
                />
              )}

              onPress={() => router.push("Calender")}
            />

          </View>

          <View style={{ flexDirection: 'row', width: deviceWidth * 0.95, alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>


            <Card

              title="Agenda"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/agenda.png")}
                />
              )}
              imageUri={require("../../assets/icons/agenda.png")}
              onPress={() => router.push("Agenda")}
            />
            <Card

              title="Timeline"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/stopwatch.png")}
                />
              )}
              imageUri={require("../../assets/icons/stopwatch.png")}
              onPress={() => router.push("TimelineAppointments")}
            />
          </View>
          <View style={{ flexDirection: 'row', width: deviceWidth * 0.95, alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, }}>

            <Card

              title="Appointments"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/scheduler.png")}
                />
              )}
              imageUri={require("../../assets/icons/appointment1.png")}
              onPress={() => router.push("Appointments")}
            />

            <Card

              title="Shifts"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/shift.png")}
                />
              )}
              imageUri={require("../../assets/icons/shift.png")}
              onPress={() => router.push("Shifts")}
            />
          </View>
          <View style={{ flexDirection: 'row', width: deviceWidth * 0.95, alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, }}>
            <Card
              title="Skills"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/skills.png")}
                />
              )}
              imageUri={require("../../assets/icons/skills.png")}
              onPress={() => router.push("Skills")}
            />
            <Card
              imageUri
              style={{
                marginRight: deviceWidth * 0.025,
                backgroundColor: 'red',

              }}
              title="Leaves"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/leave.png")}
                />
              )}
              onPress={() => router.push("Leaves")}
            />

          </View>
          <View style={{ width: deviceWidth * 0.95, alignItems: 'center', marginBottom: 5, }}>

            <Card1
              title="Requests for Appointment"
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/requestforappt.png")}
                />
              )}
              imageUri={require("../../assets/icons/requestforappt.png")}
              onPress={() => router.push("Leaves")}
              style={{ backgroundColor: 'red' }}
            />
          </View>


        </View>
        {/* cards row end */}
      </View>
    </ScrollView>
  );
};

export default Layout;

export const Card = ({ title, icon, imageUri, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchableRipple onPress={onPress}>
        <View
          style={{
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: 10,
            justifyContent: "space-evenly",
          }}
        >
          {icon &&
            <MaterialCommunityIcons name={icon} size={40} color="darkblue" />
          }
          {imageUri &&
            <Image
              style={styles.iconImages}
              source={imageUri}
            />
          }
          <Text>{title}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

const Card1 = ({ title, icon, imageUri, onPress }) => {
  return (
    <View style={styles.card1}>
      <TouchableRipple onPress={onPress}>
        <View
          style={{
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: 10,
            justifyContent: "space-evenly",
          }}
        >
          {icon &&
            <MaterialCommunityIcons name={icon} size={40} color="darkblue" />
          }
          {imageUri &&
            <Image
              style={styles.iconImages}
              source={imageUri}
            />
          }
          <Text>{title}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#00B7DD",
  },
  row: {
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,

  },
  card: {
    backgroundColor: "lightblue",
    height: deviceHeight * 0.188,
    width: '49%',
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
  },
  card1: {
    backgroundColor: "lightblue",
    height: deviceHeight * 0.188,
    width: '99%',
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
  },
  cardRight: {
    backgroundColor: "lightblue",
    height: deviceHeight * 0.22,
    width: deviceWidth * 0.45,
    marginLeft: deviceWidth * 0.025,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
  },
  cardLeft: {
    backgroundColor: "lightblue",
    height: deviceHeight * 0.22,
    width: deviceWidth * 0.45,
    marginRight: deviceWidth * 0.025,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
  },
  iconImages: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,

  }
});
