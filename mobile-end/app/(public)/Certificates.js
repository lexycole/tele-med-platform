import { useIsFocused, useNavigation } from "@react-navigation/core";
// import dayjs from "dayjs";
// import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
// import { deleteCertificate, getCertificates } from "../../api/certificates";
// import ActivityIndicator from "../components/ActivityIndicator";
import Table from "../components/Datatable/AppTable";
import Header from "../components/Header";

const Certificates = () => {
  // const focus = useIsFocused();
  // const [search, setSearch] = useState("");
  // const [searchedCertificates, setSearchedCertificates] = useState([]);
  // const [certificates, setCertificates] = useState();
  // const [allCertificates, setAllCertificates] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [checkedCertificates, setCheckedCertificates] = useState([]);

  // const callForCertificates = async () => {
  //   setCheckedCertificates([]);
  //   setCertificates([]);
  //   setLoading(true);
  //   // const { ok, data } = await getCertificates();
  //   // console.log(data[0].sharedTo, "-- Certificates--")
  //   // if (ok) {
  //   //   setAllCertificates(data);
  //   //   const filterCertificates = data.map((certificate) => {
  //   //     console.log(certificate.participants)
  //   //     return {
  //   //             id: certificate._id,
  //   //             avatar:certificate.user?.imageSrc,		
  //   //             username:certificate.user?.username,
  //   //             CertificateNo: certificate.certificateNo,			
  //   //             Name: certificate.name,
  //   //             Level: certificate.level,			
  //   //             "Valid From": moment(certificate.validFrom).format("DDD-MM-YYYY"),
  //   //             "Valid Till": certificate.validTill,				
  //   //             BusinessName: certificate.businessName,			
  //   //             Department: certificate.department,
  //   //             Description: certificate.description,
  //   //             Reference:certificate.reference,
  //   //             Note:certificate.note,
  //   //     };
  //   //   });
  //   //   setCertificates(filterCertificates);
  //   //   setLoading(false);
  //   // }
  // };

  // useEffect(() => {
  //   callForCertificates();
  // }, [focus]);

  // const onChangeSearch = () => {
  //   const filtered = certificates.filter(
  //     (el) =>
  //       `${el.Certificatename}`.toLowerCase().startsWith(search.toLowerCase()) ||
  //       `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
  //   );
  //   setSearchedCertificates(filtered);
  // };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#00B7DD"}  />

        {/* <ActivityIndicator visible={loading} /> */}
        <Header back title={"Certificates"}rightComponent={()=>{}} />
        {/* <IconBar
          checkedCertificates={checkedCertificates}
          certificates={allCertificates}
          callForCertificates={callForCertificates}
        /> */}
        {/* <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedCertificates();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        /> */}
        {/* {certificates && certificates.length > 0 && (
          <Table
            tableData={
              searchedCertificates && searchedCertificates.length > 0 ? searchedCertificates : certificates
            }
            showCheckbox
            checked={checkedCertificates}
            setChecked={setCheckedCertificates}
          />
        )} */}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedCertificates, certificates, callForCertificates }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsCertificate");
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
            if (checkedCertificates.length < 1) {
              navigate("OperationsCertificate");
            }

            const data = certificates.filter((user) => user._id == checkedCertificates[0])[0];

            const cleanCertificate = {
              _id:  data._id,
              Name: data.name,
              Level: data.level,
              "Valid From": data.validFrom,			  
              "Valid Till": data.validTill,			  			  
              "Certificate-No": data.CertificateNo,			  			  			  
              BusinessName: data.businessName,
              Department:   data.department,
              Description: data.description,
              reference: data.reference,
              notes: data.notes,
            };
            navigate("OperationsCertificate", { selectedCertificate: cleanCertificate });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8,backgroundColor: "black" }}
          color="white"
          // onPress={() => {
          //   if (checkedCertificates.length < 1) return null;
          //   checkedCertificates.forEach(async (userId) => {
          //     const { ok } = await deleteCertificate(userId);
          //     if (ok) {
          //       console.log("deleted");
          //       callForCertificates();
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
        <IconButton
          icon="archive"
          style={{ marginLeft: 8, backgroundColor: "gray" }}
          color="white"
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

export default Certificates;
