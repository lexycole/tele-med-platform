import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
// import { getAyurvedaSessions } from "../../src/api/ayurveda";
// import { getMedicalfiles } from "../../src/api/medicalfiles";
// import { getHomeoPathySessions } from "../../src/api/sessions";
// import ActivityIndicator from "../components/ActivityIndicator";
import Header from "../components/Header";
// import IconBar from "../../src/screens/MedicalFiles/IconBar";
import { Avatar } from "react-native-elements";
import { Table } from "@tcmfiles/rn-table";
import moment from "moment";
// import { getTCMSessions } from "../../src/api/tcmsessions";
import { state } from "../_layout";


function MedicalFilesScreen({ navigation }) {

  // const [loading, setLoading] = useState(false);
  // const [medicalfiles, setMedicalfiles] = useState([]);
  // const [checkedMedicalFiles, setCheckedMedicalFiles] = useState([]);
  // const [searchedMedicalFiles, setSearchedMedicalFiles] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedPreviousSessionPatient, setSelectedPreviousSessionPatient] = useState("")

  const tableWrapper = {
    // "avatar": {
    //   cellWidth: 50,
    //   component: item => (
    //     <View>
    //       {item ?
    //         <Avatar source={{ uri: item }} size={38} rounded={true} /> :
    //         <Avatar source={{ uri: 'https://i.imgur.com/6xIOp7F.jpg' }} size={38} rounded={true} />}
    //     </View>
    //   )
    // },
    "patient": {
      cellWidth: 200,
      align: "flex-start",
      component: item => (
        <View style={{ flexDirection: "row" }}>
          {item?.avatar ?
            <Avatar source={{ uri: item.avatar }} size={38} rounded={true} /> :
            <Avatar source={{ uri: 'https://i.imgur.com/6xIOp7F.jpg' }} size={38} rounded={true} />}
          <Text style={{ marginLeft: 15 }}>{item?.patientName ? item.patientName : "HH"}</Text>
        </View>
      )
    },
    "complaint": {
      cellWidth: 150,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    },
    "date": {
      cellWidth: 150,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    },
    "doctor": {
      cellWidth: 200,
      align: "flex-start",
      component: item => (
        <View style={{ flexDirection: "row" }}>
          {item?.avatar ?
            <Avatar source={{ uri: item.avatar }} size={38} rounded={true} /> :
            <Avatar source={{ uri: 'https://i.imgur.com/6xIOp7F.jpg' }} size={38} rounded={true} />}
          <Text style={{ marginLeft: 15 }}>{item?.doctorName ? item.doctorName : "HH"}</Text>
        </View>
      )
    },
    "session": {
      cellWidth: 150,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    },
    "previousSessions": {
      cellWidth: 150,
      align: "center",
      component: item => (
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (selectedPreviousSessionPatient) {
              setSelectedPreviousSessionPatient("")
            } else {
              setSelectedPreviousSessionPatient(item[0]["patientId"])
            }
          }}
        />
      )
    },
    // "doctor": {
    //   cellWidth: 0,
    //   component: item => (
    //     <View>
    //       <Text>{item ? item : "HH"}</Text>
    //     </View>
    //   )
    // },
    "clinic": {
      cellWidth: 0,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    },
    "patientId": {
      cellWidth: 0,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    }
  }

  const nestedPreviousSessionTableWrapper = {
    "date": {
      cellWidth: 150,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    },
    "complaint": {
      cellWidth: 150,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    },
    "session": {
      cellWidth: 150,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    },
    "actions": {
      cellWidth: 150,
      align: "center",
      component: item => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => {
            navigation.navigate(
              item.session == 'ayurveda' ? 'AyurvedaSession' :
                item.session == 'homeopathy' ? 'HomeoPathySession' :
                  'TCMSession', {
              sessionId: item.id,
              isEdit: true
            })
          }}>
            <Image
              source={require("../assets/icons/edit.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <IconButton
            icon="eye"
            style={{ marginLeft: 8, backgroundColor: "blue" }}
            color="white"
            onPress={() => {
              navigation.navigate(
                item.session == 'ayurveda' ? 'AyurvedaSession' :
                  item.session == 'homeopathy' ? 'HomeoPathySession' :
                    'TCMSession', {
                sessionId: item.id,
                isEdit: false
              })
            }}
          />
        </View>
      )
    },
    "doctor": {
      cellWidth: 200,
      align: "flex-start",
      component: item => (
        <View style={{ flexDirection: "row" }}>
          {item?.avatar ?
            <Avatar source={{ uri: item.avatar }} size={38} rounded={true} /> :
            <Avatar source={{ uri: 'https://i.imgur.com/6xIOp7F.jpg' }} size={38} rounded={true} />}
          <Text style={{ marginLeft: 15 }}>{item?.doctorName ? item.doctorName : "HH"}</Text>
        </View>
      )
    },
    // "doctor": {
    //   cellWidth: 0,
    //   component: item => (
    //     <View>
    //       <Text>{item ? item : "HH"}</Text>
    //     </View>
    //   )
    // },
    "clinic": {
      cellWidth: 0,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    },
    "patientId": {
      cellWidth: 0,
      align: "center",
      component: item => (
        <View>
          <Text>{item ? item : "HH"}</Text>
        </View>
      )
    }
  }

  // useEffect(() => {
  //   setLoading(true)
  //   fetchData().then(res => {
  //     setMedicalfiles(res);
  //     setLoading(false);
  //   })
  // }, []);
  // const fetchData = async () => {

  //   const res = await getMedicalfiles();
  //   const res1 = await getHomeoPathySessions();
  //   const res2 = await getAyurvedaSessions();
  //   const res3 = await getTCMSessions();

  //   if (res.ok || res1.ok || res2.ok || res3.ok) {
  //     console.log(res3)
  //     const medicalFiles = res.ok ? res.data.reverse() : []
  //     const homeSessionData = res1.ok ? res1.data.reverse() : [];
  //     const ayurvedaSessionsData = res2.ok ? res2.data.reverse() : [];
  //     const tcmSessionData = res3.ok ? res3.data.reverse() : [];

  //     const data = ayurvedaSessionsData.concat(homeSessionData, medicalFiles, tcmSessionData);
  //     const filteredData = data.filter(d => d.createdAt)
  //     const orderedData = _.orderBy(filteredData, function (o) { return new moment(o?.createdAt); }, ['desc'])
  //     let filter = []
  //     orderedData.map((file) => {
  //       const index = filter.findIndex((el) => el.patientId == file?.patientNo?._id)
  //       if (index >= 0) {
  //         filter[index].previousSessions.push({
  //           id: file?._id,
  //           patientId: file?.patientNo?._id,
  //           // avatar: file?.patientNo?.user?.imageSrc,
  //           // patientName: `${file?.patientNo?.user?.contactName?.first} ${file?.patientNo?.user?.contactName?.last}`,
  //           complaint: file?.chiefComplaint,
  //           date: moment(file?.createdAt).format('L hh:mm A'),
  //           session: file?.sourceSession,
  //           doctor: {
  //             avatar: file?.doctorNo?.user?.imageSrc,
  //             doctorName: `${file?.doctorNo?.user?.contactName?.first} ${file?.doctorNo?.user?.contactName?.last}`
  //           },
  //           clinic: file?.clinicNo?._id,
  //           actions: {
  //             id: file?._id,
  //             session: file?.sourceSession
  //           }
  //         })
  //       } else {
  //         filter.push({
  //           id: file?._id,
  //           patientId: file?.patientNo?._id,
  //           patient: {
  //             avatar: file?.patientNo?.user?.imageSrc,
  //             patientName: `${file?.patientNo?.user?.contactName?.first} ${file?.patientNo?.user?.contactName?.last}`
  //           },
  //           complaint: file?.chiefComplaint,
  //           date: moment(file?.createdAt).format('L hh:mm A'),
  //           session: file?.sourceSession,
  //           doctor: {
  //             avatar: file?.doctorNo?.user?.imageSrc,
  //             doctorName: `${file?.doctorNo?.user?.contactName?.first} ${file?.doctorNo?.user?.contactName?.last}`
  //           },
  //           clinic: file?.clinicNo?._id,
  //           previousSessions: [{
  //             id: file?._id,
  //             patientId: file?.patientNo?._id,
  //             // avatar: file?.patientNo?.user?.imageSrc,
  //             // patientName: `${file?.patientNo?.user?.contactName?.first} ${file?.patientNo?.user?.contactName?.last}`,
  //             complaint: file?.chiefComplaint,
  //             date: moment(file?.createdAt).format('L hh:mm A'),
  //             session: file?.sourceSession,
  //             doctor: {
  //               avatar: file?.doctorNo?.user?.imageSrc,
  //               doctorName: `${file?.doctorNo?.user?.contactName?.first} ${file?.doctorNo?.user?.contactName?.last}`
  //             },
  //             clinic: file?.clinicNo?._id,
  //             actions: {
  //               id: file?._id,
  //               session: file?.sourceSession
  //             }
  //           }],
  //         })
  //       }
  //     });

  //     return filter;
  //   } else {
  //     Alert.alert("Data fetching fields")
  //   }
  // }

  // const onChangeSearch = () => {
  //   const filtered = medicalfiles.filter(
  //     (el) =>
  //       el?.complaint?.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
  //       el?.username?.toLowerCase().startsWith(searchQuery.toLowerCase())
  //   );
  //   setSearchedMedicalFiles(filtered)
  //   setSearchQuery("");
  // };

  // const onEditPress = () => {
  //   if (checkedMedicalFiles.length < 1) {
  //     return;
  //   }
  //   const selected = medicalfiles.filter(el => el.id === checkedMedicalFiles[0])[0];

  //   navigation.navigate(
  //     selected.session == 'ayurveda' ? 'AyurvedaSession' :
  //       selected.session == 'homeopathy' ? 'HomeoPathySession' :
  //         'TCMSession', {
  //     sessionId: selected.id,
  //   }
  //   );
  // }

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator visible={loading} /> */}
      <SafeAreaView />
      <Header
        back
        title={"Medical Files"}
        rightComponent={
          <View style={styles.rightContainer}>
            <IconButton
              onPress={() => navigation.navigate("HomeoPathySession")}
              size={26}
              icon="plus-circle"
            />
          </View>
        }
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedMedicalFiles.length < 1) {
              return;
            }
            const selected = medicalfiles.filter(el => el.id === checkedMedicalFiles[0])[0];

            navigation.navigate(
              selected.session == 'ayurveda' ? 'AyurvedaSession' :
                selected.session == 'homeopathy' ? 'HomeoPathySession' :
                  'TCMSession', {
              sessionId: selected.id,
            }
            );
          }}
        /> */}
        {/* <IconBar onEditPress={onEditPress} /> */}
      </View>
      <Searchbar
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
          borderWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        }}
        underlineColorAndroid="white"
        placeholder="Search"
        // onChangeText={setSearchQuery}
        // value={searchQuery}
        // onSubmitEditing={() => {
        //   onChangeSearch();
        // }}
      />
      <ScrollView>
        {/* {
          medicalfiles.length > 0 && (
            <Table
              data={
                searchedMedicalFiles && searchedMedicalFiles.length > 0
                  ? searchedMedicalFiles : medicalfiles
              }
              fitWidth={false}
              uniqueKey={"id"}
              dataWrapper={tableWrapper}
              onCheck={setCheckedMedicalFiles}
              headerStyle={{
                backgroundColor: '#fff0bc',
                borderBottomWidth: 1,
                borderBottomColor: '#dcdcdc',
              }}
              oddRowStyle={{
                backgroundColor: 'white'
              }}
              evenRowStyle={{
                backgroundColor: '#efefef'
              }}
              containerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: '#dcdcdc'
              }}
              selectedPreviousSessionPatient={selectedPreviousSessionPatient}
              isRowCheckbox={false}
              nestedPreviousSessionTableWrapper={nestedPreviousSessionTableWrapper}
            />
          )
        } */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 5,
    width: "100%",
  },
  rightIcon: {
    marginLeft: 10,
  },
  iconContainer: {
    padding: state?.isTablet ? 10 : 5,
    marginRight: 10,
    backgroundColor: "lightblue",
  },
  icon: {
    height: state?.isTablet ? 50 : 30,
    width: state?.isTablet ? 50 : 30,
  },
});

export default MedicalFilesScreen;