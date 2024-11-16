import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text,Image, SafeAreaView  } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
// import { deletePhysicalcondition, getPhysicalcondition, getPhysicalconditions, getPhysicalConditions } from "./../../api/physicalconditions";
// import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../components/Header";
import OperationsPhysicalCondition from "../screens/MedicalFiles/OperationsPhysicalCondition";
import { Avatar } from "react-native-elements";
import { borderWidth } from "styled-system";
import { useNavigation } from "@react-navigation/native";

const tableWrapper = {
  // 'PhysicalCondition':{
  //   cellWidth: 150,
  //   component: item => (
  //     <View style={{ 
  //       flexDirection: "row",
  //       justifyContent: "flex-start",
  //       alignItems: "center",
  //       width: "100%",
  //     }}>
  //       {
  //         item.img && <Avatar source={{ uri: item.img }} size={38} rounded={true} />
  //       }
  //       <Text style={{ marginLeft: 5 }}>{ item.name }</Text>
  //     </View>
  //   )
  // },
  'Patient':{
    cellWidth: 150,
    component: item => (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        {item.img ? (
          <Image
            source={{ uri: item.img }}
            style={{
              marginRight: 10,
              width: 25,
              height: 25,
              borderRadius: 25 / 2
            }}
          />
        ) : null}

        <Text>{item.name}  </Text>
      </View>
    )
  },

  'Prefix':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Height':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Weight':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Age':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  }, 

  'Temperature':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'BloodGroup':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  }, 
  'BloodPressure':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  }, 
  'BloodGlucoseLevel':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'HeartBeat':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },  

  'OxygenSaturation':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  }, 
  'RedBloodCell':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'WhiteBloodCell':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Hgb':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'GSR':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'GSP':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )  
  },
  'leftEyeSpherical':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )  
  },
  'rightEyeSpherical':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )  
  },
  'Status':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'dateBirth': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ dayjs(item).format("DD-MM-YYYY") }</Text>
      </View>
    )
  },
  'Gender': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'ethnicity': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'cityOfBirth': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  
}

function PhysicalConditions() {
//   const [update, setUpdate] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [searchedPhysicalConditions, setSearchedPhysicalConditions] = useState([]);
//   const [users, setPhysicalConditions] = useState();
//   const [selectedPhysicalCondition, setSelectedPhysicalCondition] = useState();
//   const [loading, setLoading] = useState(false);
//   const [checkedPhysicalConditions, setCheckedPhysicalConditions] = useState([]);
//   const [dataWrapping, setDataWrapping] = useState({});

//   const navigation = useNavigation();
//   async function callForPhysicalConditions() {
// try{ 
//  setCheckedPhysicalConditions([]);
//   setPhysicalConditions([]);
//   setLoading(true);
//   const   {data }   = await getPhysicalconditions();

//     const filterPhysicalConditions = data.map((user) => {
//       return {
//         id: user?._id,

//         //id: user?.patientNo?.user._id,
//         Patient : {
//           name: user?.patientNo?.user.username,
//           img: user?.patientNo?.user.imageSrc,
//           patientNo:user.patientNo._id,
//         },
        
//        // PhysicalConditionname: user?.patientNo?.user.username,
//        Prefix: user?.patientNo?.user.prefix,
//        Height: user?.height? user?.height+" "+user?.heightUnit:" ",
//        Weight: user?.weight?user?.weight+" "+user?.weightUnit:" ",
//        Age:user?.age?user?.age : " ",
//        Temperature:user?.temperature?user?.temperature+ " "+user?.temperatureUnit : " ",
//        BloodPressure:user?.bloodPressure?user?.bloodPressure : " ",
//        HeartBeat:user?.heartBeat?user?.heartBeat : " ",
//        BloodGroup:user?.bloodGroup?user?.bloodGroup : " ",
//        BloodGlucoseLevel:user?.bloodGlucoseLevel?user?.bloodGlucoseLevel : " ",
//        OxygenSaturation:user?.oxygenSaturation?user?.oxygenSaturation : " ",
//        RedBloodCell:user?.redBloodCell? user?.redBloodCell : " ",
//        WhiteBloodCell:user?.whiteBloodCell?user?.whiteBloodCell : " ", 
//        Hgb:user?.Hgb?user?.Hgb : " ",
//        GSR:user?.GSR?user?.GSR : " ",
//        GSP:user?.GSP?user?.GSP : " ",
//        leftEyeSpherical:user?.optical?.leftEyeSpherical?user?.optical?.leftEyeSpherical : " ",
//        rightEyeSpherical:user?.optical?.rightEyeSpherical?user?.optical?.rightEyeSpherical : " ",
//        Status: user?.patientNo?.user.status,
//        dateBirth: user?.patientNo?.user.dateBirth,
//        ethnicity : user?.ethnicity,
//        cityOfBirth : user?.cityOfBirth
//         //Avatar: user?.imageSrc,
//       };
//     });
//     setDataWrapping(tableWrapper);
//     setPhysicalConditions(filterPhysicalConditions);
//     setLoading(false);}
//     catch(err){
// console.log(err)
//     }

// };

//   useEffect(() => {
 
//       callForPhysicalConditions();
//   }, [update]);

//   const onChangeSearch = () => {
//     const filtered = users.filter(
//       (el) =>
//         `${el.PhysicalConditionname}`.toLowerCase().startsWith(search.toLowerCase()) ||
//         `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
//     );
//     setSearchedPhysicalConditions(filtered);
//   };

  // if (showModal) {
  //   return (
  //     <OperationsPhysicalCondition
  //       selectedPhysicalCondition={selectedPhysicalCondition}
  //       setSelectedPhysicalCondition={setSelectedPhysicalCondition}
  //       visible={showModal}
  //       setVisible={setShowModal}
  //       setUpdate={setUpdate}
  //       update={update}
  //     />
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{flex:1}}>
      {/* <ActivityIndicator visible={loading} /> */}
      <Header back title={"PhysicalConditions"} />
      {/* <IconBar
        setShowModal={setShowModal}
        checkedPhysicalConditions={checkedPhysicalConditions}
        setCheckedPhysicalConditions={setSelectedPhysicalCondition}
        setSelectedPhysicalCondition={setSelectedPhysicalCondition}
        setUpdate={setUpdate}
        update={update}
        users={users}
        navigation={navigation}
        updatePress={() => {
          setUpdate(!update);
        }}
        callForPhysicalConditions={callForPhysicalConditions}

      /> */}
      {/* <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedPhysicalConditions();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      /> */}
      <ScrollView>
        {/* { users && users.length > 0 && (
          <Table
            data={
              searchedPhysicalConditions && searchedPhysicalConditions.length > 0
                ? searchedPhysicalConditions 
                : users
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={tableWrapper}
            onCheck={setCheckedPhysicalConditions}
            headerStyle={{
              backgroundColor: 'fff0bc',
              borderBottomWidth: 1,
              borderBottomColor: 'dcdcdc',
            }}
            oddRowStyle={{
              backgroundColor: 'white'
            }}
            evenRowStyle={{
              backgroundColor: 'efefef'
            }}
            containerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: 'dcdcdc'
            }}
          />
        )} */}
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default PhysicalConditions;


// const IconBar = ({
//   setShowModal,
//   checkedPhysicalConditions,
//   setCheckedPhysicalConditions,
//   setSelectedPhysicalCondition,
//   users,
//   setUpdate,
//   update,
//   navigation,
//   updatePress,
//   callForPhysicalConditions
// }) => {
//   return (
//     <View style={{ height: 60, justifyContent: "center" }}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <IconButton
//           icon="plus"
//           style={{ marginLeft: 8, backgroundColor: "#07f" }}
//           color="white"
//           onPress={() => {
        
//             navigation.navigate("AddOrUpdatePhysicalCondition", { selectedPhysicalCondition: {} , 
//             callForPhysicalConditions:callForPhysicalConditions
//            });


 
           
      
//           }}
//         />
//         <IconButton
//           icon="eye"
//           style={{ marginLeft: 8, backgroundColor: "blue" }}
//           color="white"
//           // onPress={() => {
//           //   if (checkedPhysicalConditions.length < 1) {
//           //     return;
//           //   }
//           //   const data = users.filter(
//           //     (user) => user._id == checkedPhysicalConditions[0]
//           //   )[0];
//           //   const cleanPhysicalCondition = {
//           //     _id: data._id,
//           //     prefix: data.prefix,
//           //     username: data.username,
//           //     status:data.status,			  
//           //     role: data.role,
//           //     Avatar: data.imageSrc,
//           //     PhysicalConditionname: data.username,
//           //     BirthDate: dayjs(data.dateBirth).format("YYYY-MM-DD"),
//           //     Email: data.email,
//           //     Gender: data.gender,
//           //     FirstName: data.contactName.first,
//           //     Initials: data.contactName.initials,
//           //     LastName: data.contactName.last,
//           //     Address1: data.Address.address1,
//           //     Address2: data.Address.address2,
//           //     Address3: data.Address.address3,
//           //     "Zip Code": data.Address.zip,
//           //     City: data.Address.city,
//           //     State: data.Address.state,
//           //     Country: data.Address.country,
//           //     Phone: data.phones.phone,
//           //     Mobile: data.phones.mobile,
//           //     Skype: data.phones.skype,
//           //     Mood: data.mood,
//           //     About: data.about,
//           //   };
//           //   navigate("PhysicalConditionProfile", { selectedPhysicalCondition: cleanPhysicalCondition });
//           // }}
//         />

//         <IconButton
//           icon="pencil"
//           style={{ marginLeft: 8, backgroundColor: "yellow" }}
//           color="black"
//           // onPress={async() => {
//           //   if (checkedPhysicalConditions.length < 1) {
//           //     return;
//           //   }
            
//           //   let data =  users.filter((user) => user.id === checkedPhysicalConditions[0])[0];
//           //  const getSelected = await getPhysicalcondition(data.id)
//           //   data.PhysicalConditionname = data?.Patient.name;
//           //   data.Avatar = data?.Patient.img;
//           //   let m = getSelected.data
//           //   m.id=m._id
//           //   m.leftEyeSpherical=m.optical.leftEyeSpherical
//           //   m.rightEyeSpherical=m.optical.rightEyeSpherical
//           //   m.patientNo=data.Patient.patientNo
//           //   m.bloodGroup=data.BloodGroup
//           //   navigation.navigate("AddOrUpdatePhysicalCondition", { selectedPhysicalCondition:m ,
//           //      callForPhysicalConditions:callForPhysicalConditions           });
//           // }}
//         />
//         <IconButton
//           icon="delete"
//           style={{ marginLeft: 8, backgroundColor: "#f44" }}
//           color="white"
//           // onPress={() => {
//           //   if (checkedPhysicalConditions.length < 1) return null;
//           //   checkedPhysicalConditions.forEach((userId) => {
//           //     deletePhysicalcondition(userId).then((res) => console.log(res))
//           //   });
//           //   updatePress();
//           //   setUpdate(!update);
//           // }}
//         />
//         <IconButton
//           icon="file-pdf-box"
//           style={{ marginLeft: 8, backgroundColor: "red" }}
//           color="white"
//         />
//         <IconButton
//           icon="microsoft-excel"
//           style={{ marginLeft: 8, backgroundColor: "green" }}
//           color="white"
//         />
//         <IconButton
//           icon="printer"
//           style={{ marginLeft: 8, backgroundColor: "brown" }}
//           color="white"
//         />
//       </ScrollView>
//     </View>
//   );
// };

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
  search: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
});