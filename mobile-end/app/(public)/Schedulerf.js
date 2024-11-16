import React, { useEffect, useState } from "react";
  import { View, SafeAreaView, StyleSheet, StatusBar,  ActivityIndicator} from "react-native";
//import Scheduler from "rnscheduler";
import Scheduler from "rnscheduler3";
import { Navbar } from "../components/NavbarScheduler";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



export default function Schedulerf({ children, back, title, rightComponent, navigation }) {

  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState(true);
  const [events, setEvents] = useState(true);
  const [singleAptsData, setSingleAptsData] = useState([]);

  // useEffect(() => {
  //   getResources()
  //   .then(() => getEvents())
  //   .then(() => setLoading(false))
  //   .catch(ex => console.log(ex))
  // }, []);
 
//   const getResources = async () => {
//     const { data } = await getAppointments();

//     const filteredResources = data.map(resource => ({
//       id: resource?.doctorNo?._id,
//       name: resource?.doctorNo?.user?.contactName?.last,
//       avatar: resource?.doctorNo?.user?.imageSrc
//     }));

//     const resultResources = filteredResources.reduce((acc, item) => {
//       if (!acc.find((o) => o.id === item.id) && item.id && item.name) {
//         acc.push(item);
//       }
//       return acc;
//     }, []);

//     setSingleAptsData(filteredResources);
//     setResources(resultResources);
//   };

//   const getEvents = async () => {
//     const { data: Events } = await getAppointments();
//     const filteredEvents = Events.map((event) => ({
//       id: event?._id,
//       title: event?.title,
//       startTime: event?.startTime,
//       endTime: event?.endTime,
//       resourceId: event?.doctorNo?._id,
//       doctorNo : event?.doctorNo,
//       patientNo : event?.patientNo,
//       doctorNo : event?.doctorNo,
//       status: event?.status,
//       appointmentType: event?.appointmentType,
//       sessionType: event?.sessionType,
//       color: event?.color,
//       name: event?.patientNo?.user?.contactName?.first + " " + event?.patientNo?.user?.contactName?.last,
//       avatar: event?.patientNo.user.imageSrc
//     }));
//     setEvents(filteredEvents);
//   };

  const eventPressHandler = (event) => {
    // let appointmentInfoData = [];
    // let tempSingleAppointment = {};

    // singleAptsData.map((singleAppointment) => {
    //   tempSingleAppointment = {
    //     _id: singleAppointment?._id,
    //     name:
    //       singleAppointment?.patientNo.user.contactName.first +
    //       " " +
    //       singleAppointment?.patientNo?.user.contactName.last,
    //     status: singleAppointment?.status,
    //     clinicNo: {
    //       companyInfo: {
    //         businessName: singleAppointment?.clinicNo.companyInfo.businessName,
    //       },
    //       user: {
    //         imageSrc: singleAppointment?.clinicNo.user?.imageSrc,
    //       },
    //     },
    //     doctorNo: {
    //       user: {
    //         contactName: {
    //           first: singleAppointment?.doctorNo.user.contactName.first,
    //           last: singleAppointment?.doctorNo.user.contactName.last,
    //         },
    //         imageSrc: singleAppointment?.doctorNo.user?.imageSrc,
    //       },
    //     },
    //     start: singleAppointment?.startTime,
    //     end: singleAppointment?.endTime,
    //     appointmentType: singleAppointment?.appointmentType,
    //     sessionType: singleAppointment?.sessionType,
    //     image: singleAppointment?.patientNo.user?.imageSrc,
    //     dateBirth: singleAppointment?.patientNo.user.dateBirth,
    //   };
    //   appointmentInfoData.push(tempSingleAppointment);
    // });
    // let paramData = singleAptsData.find((item) => item._id == event.id);
   
  //  console.log(event)
      const e = {};
      e.id = event?.id,
      e.name = `${event?.patientNo?.user?.contactName?.first} ${event?.patientNo?.user?.contactName?.last}`;
      e.dateBirth =  event?.patientNo?.user?.dateBirth;
      e.image = event?.patientNo?.user?.imageSrc;
      e.gender = event?.patientNo?.user?.gender;
      e.title = event?.title;
      e.start = event?.startTime;
      e.end = event?.endTime;
      e.date = event?.startTime.split("T")[0];
      e.color = event?.color;
      e.sessionType = event?.sessionType;
      e.appointmentType = event?.appointmentType;
      e.status = event?.patientNo?.status;
      e.complaint = event?.title;
      e.clinicNo = event?.clinicNo;
      e.doctorNo = event?.doctorNo;

      navigation.navigate("AppointmentProfile", { item: e });
  };

const { goBack } = useNavigation();
useEffect(() => console.log(back), [])

  return (
    <View style={styles.Container}>
      <SafeAreaView />
      <StatusBar />
      <Navbar
        onPress={() => goBack()}



        Text={"Scheduler"}
      />
      <ActivityIndicator style={{marginTop:20}}  size="large" color="#00B7DD"/>
      {
        !loading && (<Scheduler
                        resources={resources}
                        events={events}
                        nowIndicator={true}
                        onEventPress={(event) => eventPressHandler(event)}
                        timeType={"min"}  // "hr" for hours interval and "min" for minutes interval
                      />)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
});
