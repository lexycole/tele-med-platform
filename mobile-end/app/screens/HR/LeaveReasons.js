import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
// import { deleteLeaveReason, getLeaveReasons } from "../../api/leavereasons";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const LeaveReasons = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedLeaveReasons, setSearchedLeaveReasons] = useState([]);
  const [LeaveReasons, setLeaveReasons] = useState();
  const [allLeaveReasons, setAllLeaveReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedLeaveReasons, setCheckedLeaveReasons] = useState([]);

  const callForLeaveReasons = async () => {
    setCheckedLeaveReasons([]);
    setLeaveReasons([]);
    setLoading(true);
    // const { ok, data } = await getLeaveReasons();
    // console.log(data[0].sharedTo, "-- LeaveReasons--")
    // if (ok) {
    //   setAllLeaveReasons(data);
    //   const filterLeaveReasons = data.map((LeaveReason) => {
    //     console.log(LeaveReason.participants)
    //     return {
    //             id: LeaveReason._id,
    //             avatar:LeaveReason.user?.imageSrc,		
    //             username:LeaveReason.user?.username,
    //             Name: LeaveReason.name,
    //             BusinessName: LeaveReason.businessName,			
    //             Department: LeaveReason.department,
    //             Description: LeaveReason.description,
    //             Reference:LeaveReason.reference,
    //             Note:LeaveReason.note,
    //     };
    //   });
    //   setLeaveReasons(filterLeaveReasons);
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    callForLeaveReasons();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = LeaveReasons.filter(
      (el) =>
        `${el.LeaveReasonname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedLeaveReasons(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#00B7DD"}  />

        <ActivityIndicator visible={loading} />
        <Header back title={"LeaveReasons"}rightComponent={()=>{}} />
        <IconBar
          checkedLeaveReasons={checkedLeaveReasons}
          LeaveReasons={allLeaveReasons}
          callForLeaveReasons={callForLeaveReasons}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedLeaveReasons();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {LeaveReasons && LeaveReasons.length > 0 && (
          <Table
            tableData={
              searchedLeaveReasons && searchedLeaveReasons.length > 0 ? searchedLeaveReasons : LeaveReasons
            }
            showCheckbox
            checked={checkedLeaveReasons}
            setChecked={setCheckedLeaveReasons}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedLeaveReasons, LeaveReasons, callForLeaveReasons }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsLeaveReason");
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "pink" }}
          color="black"
        />
		
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedLeaveReasons.length < 1) {
              navigate("OperationsLeaveReason");
            }

            const data = LeaveReasons.filter((user) => user._id == checkedLeaveReasons[0])[0];

            const cleanLeaveReason = {
              _id:  data._id,
              Name: data.name,
              BusinessName: data.businessName,
              Department:   data.department,
              Description: data.description,
              reference: data.reference,
              notes: data.notes,
            };
            navigate("OperationsLeaveReason", { selectedLeaveReason: cleanLeaveReason });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8,backgroundColor: "black" }}
          color="white"
          // onPress={() => {
          //   if (checkedLeaveReasons.length < 1) return null;
          //   checkedLeaveReasons.forEach(async (userId) => {
          //     const { ok } = await deleteLeaveReason(userId);
          //     if (ok) {
          //       console.log("deleted");
          //       callForLeaveReasons();
          //     }
          //   });
          // }}
        />
        <IconButton
          icon="file-delimited"
          style={{ marginLeft: 8, backgroundColor: "lime" }}
          color="white"
        />

        <IconButton
          icon="file-pdf-box"
          style={{ marginLeft: 8, backgroundColor: "red" }}
          color="white"
        />
        <IconButton
          icon="microsoft-excel"
          style={{ marginLeft: 8, backgroundColor: "green" }}
          color="white"
        />
        <IconButton
          icon="printer"
          style={{ marginLeft: 8, backgroundColor: "brown" }}
          color="white"
        />
        <IconButton
          icon="cloud-upload"
          style={{ marginLeft: 8, backgroundColor: "cyan" }}
          color="black"
        />
        <IconButton
          icon="cloud-download"
          style={{ marginLeft: 8, backgroundColor: "7AB356" }}
          color="black"
        />
      </ScrollView>
    </View>
  );
};

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

export default LeaveReasons;
