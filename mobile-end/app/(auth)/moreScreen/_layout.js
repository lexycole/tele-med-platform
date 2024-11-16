import "react-native-gesture-handler";
import React, { Component, useState, useEffect } from "react";
import {SafeAreaView,StyleSheet,Image,View,Text,TouchableOpacity,Switch, } from "react-native";
import { Navbar4, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
// import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
// import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/core";
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const doLogout = () => {
    signOut();
};
  

const MoreTab = ({ title, navigateTo, Icon,isTablet, isSub = false }) => {
  const router = useRouter();
  const subMenuView = isTablet ? styles.subMenuView : styles.subMenuView1;
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(navigateTo);
      }}
      
      style={isSub ? subMenuView : styles.ContainerView}
    >
      <View style={styles.LeftContainer}>
        <Icon />
        <Text style={isTablet ? styles.TextContainer : styles.TextContainer1}>{title}</Text>
      </View>
      <View style={styles.RightContainer}>
        <Image style={styles.icons} source={require("../../assets/next.png")} />
      </View>
    </TouchableOpacity>
  );
};

const MultipleMoreTab = ({ title, Icon,isTablet, children }) => {
  const [switchSubMenu, setSwitchSubMenu] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setSwitchSubMenu(!switchSubMenu)}
        style={styles.ContainerView}
      >
        <View style={styles.LeftContainer}>
          <Icon />
          <Text style={isTablet ? styles.TextContainer : styles.TextContainer1}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.RightContainer}>
          <Image
            style={[styles.icons, switchSubMenu && styles.rotateImage]}
            source={require("../../assets/next.png")}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {switchSubMenu && <View>{children}</View>}
    </>
  );
};


const Layout = ({ navigation }) => {
  const [appoinmentSwitch, setAppoinmentSwitch] = useState(false);
  const [popupReminder, setPopupReminder] = useState(false);
  const [switchSubMenu, setSwitchSubMenu] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const getDeviceType = async () => {
    const device = await getDeviceTypeAsync();
    setIsTablet(device === DeviceType.TABLET);
  };

  useEffect(() => {
    getDeviceType();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.Container}>
        <SafeAreaView />
        <Navbar4 Text={"More"} />

        <MoreTab
          title="My Profile"
          navigateTo="ClinicUserProfile"
          Icon={() => (
            <Image
              style={styles.iconImages}
              source={require("../../assets/icons/myprofile.png")}
            />
          )}
          isTablet={isTablet}
        />

        <MultipleMoreTab
          title="My Profile"
          Icon={() => (
            <Image
              style={[
                styles.iconImages,
                { width: 30, height: 30, marginLeft: 0 },
              ]}
              source={require("../../assets/icons/myprofile.png")}
            />
          )}
          isTablet={isTablet}
        >
          <MoreTab
            title="About Me"
            navigateTo="MyAccount"
            isSub={true}
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/about.png")}
              />
            )}
            isTablet={isTablet}
          />
            <MoreTab
              title="Address"
              navigateTo="Address"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/address.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Phones"
              navigateTo="Phones"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/phone.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Working Hours"
              navigateTo="WorkingHours"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/workinghours.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Bank"
              navigateTo="BankAccount"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/bank2.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Insurances"
              navigateTo="Insurances"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/insurance.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Business Info"
              navigateTo="BusinessInfo"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/business.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Membership"
              navigateTo="Membership"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/membership.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Change Password"
              navigateTo="ChangePassword"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/password.png")}
                />
              )}
              isTablet
            />
			
            <MoreTab
              title="Skills & Certification"
              navigateTo="Skills"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/education.png")}
                />
              )}
              isTablet
            />
			
        </MultipleMoreTab>

        <MultipleMoreTab
          title="Medical Files"
          Icon={() => (
            <Image
              style={styles.iconImages}
              source={require("../../assets/icons/medicalfile.png")}
            />
          )}
          isTablet={isTablet}
        >
             <MoreTab
              title="Add Homeopathy Session"
              navigateTo="HomeoPathySession"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/homeosession.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add TCM Session"
              navigateTo="TCMSession"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/yinyang.png")}
                  
                />
              )}
              isTablet
            />

            <MoreTab
              title="Add Ayurveda Session"
              navigateTo="AyurvedaSession"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/ohm-symbol.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Medical Files"
              navigateTo="MedicalFilesScreen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/medicalrecord.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Physical Condition"
              navigateTo="PhysicalConditions"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/humanbody.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Manage Physical Conditions"
              navigateTo="PhysicalConditions"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/humanbody.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Search in Medical Files"
              navigateTo="MedicalFilesScreen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
        </MultipleMoreTab>

        <MultipleMoreTab
          title="Planning and Scheduler"
          Icon={() => (
            <Image
              style={styles.iconImages}
              source={require("../../assets/icons/planning.png")}
            />
          )}
          isTablet={isTablet}
        >
        <MoreTab
              title="Calendar"
              navigateTo="Calender"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/dailyplanner.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Agenda"
              navigateTo="Agenda"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/agenda.png")}
                />
              )}
              isTablet
            />
            {/* <MoreTab
              title="Scheduler"
              navigateTo="Scheduler"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/scheduler.png")}
                />
              )}
            /> */}
            <MoreTab
              title="Appointments"
              navigateTo="Appointments"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/appointment1.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Requests for Appointment"
              navigateTo="Leaves"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/requestforappt.png")}
                />
              )}
              isTablet
            />
              <MoreTab
            title="Timeline of Appointments"
            navigateTo="TimelineAppointments"
            isSub={true}			
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/stopwatch.png")}
              />
            )}
            isTablet
          />
          {/* 15 */}
          <MoreTab
            title="Schedulerf"
            navigateTo="Schedulerf" 
            isSub={true}						
            Icon={() => <Fontisto name="date" size={30} color={"#003c75"} />}
            isTablet
          />
        </MultipleMoreTab>

        
          {/* end */}
          <MultipleMoreTab
            title="Human Resources"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/employment.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Certificates"
              navigateTo="Certificates"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}

                  source={require("../../assets/icons/certificate.png")}

                />
              )}
              isTablet
            />
            <MoreTab
              title="Leaves"
              navigateTo="Leaves"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/leave.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Skills"
              navigateTo="Skills"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/skills.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Shifts"
              navigateTo="Shifts"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/shift.png")}
                />
              )}
              isTablet
            />

              <MoreTab
            title="Timeline Attendances"
            navigateTo="TimelineAttendance"
            isSub={true}			
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/stopwatch.png")}
              />
            )}
            isTablet
          />
			
          </MultipleMoreTab>
		  
          {/* end */}
          <MultipleMoreTab
            title="ERO"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/lifejacket.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="ERO"
              navigateTo="EROs"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/lifejacket.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Area"
              navigateTo="EROs"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/lifejacket.png")}
                />
              )}
              isTablet
            />
			
            <MoreTab
              title="Incidents"
              navigateTo="Incidents"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/incident.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
		  
          {/* 1.2 */}
          <MultipleMoreTab
            title="KanbansScreen"
            navigateTo="Kanban" 
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/kanban.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="KanbansScreen"
              navigateTo="KanbansScreen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/kanban.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Manage Kanbans"
              navigateTo="Kanbans"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/kanban.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Admin Kanbans"
              navigateTo="AdminKanbans"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/kanban.png")}
                />
              )}
              isTablet
            />
			
            <MoreTab
              title="Grid Kanbans"
              navigateTo="GridKanbans"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/kanban.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Manage Tasks"
              navigateTo="Tasks"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/notepinned.png")}
                />
              )}
              isTablet
            />
			
            <MoreTab
              title="Timeline of Tasks"
              navigateTo="TimelineTasks"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/stopwatch.png")}
                />
              )}
              isTablet
            />
		
          </MultipleMoreTab>
          {/* end */}

          {/* 1.5 */}
          <MultipleMoreTab
            title="Tickets & Support"
            //navigateTo="TermsofUse"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/tickets.png")}
              />
            )}
            isTablet
          >
            
            <MoreTab
              title="Add Ticket"
              navigateTo="OperationsTicket"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/ticket.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Tickets"
              navigateTo="Tickets"
              isSub={true}
              Icon={() => (
                <FontAwesome5 name="ticket-alt" size={25} color={"#003c75"} />
              )}
              isTablet
            />
            <MoreTab
              title="Grid View of Tickets"
              navigateTo="GridTickets"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/ticket.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Timeline of Tickets"
              navigateTo="Timeline of Tickets"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/stopwatch.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Search in Tickets"
              navigateTo="SearchTickets"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 13 */}
          <MoreTab
            title="Rate Us"
            navigateTo="Rate Us" 
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/star.png")}
              />
            )}
            isTablet
          />
          {/* end */}

          <MoreTab
            title="Fileviewer"
            navigateTo="FileViewer" 
            Icon={() => <Fontisto name="date" size={30} color={"#003c75"} />}
            isTablet
          />

          <MultipleMoreTab
            title="Forums"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/forum1.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Add Topic"
              navigateTo="CreatePost"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/topic.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Forums"
              navigateTo="Forum"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/category.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Category Idex"
              navigateTo="CategoryIndex"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/category.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Category"
              navigateTo="OperationsCategories"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/category.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Search in Forums for topic"
              navigateTo="Searchforum"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>

          <MultipleMoreTab
            title="Directory List of Clinics"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/directorylist.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="FishboneChart"
              navigateTo="FishboneChart"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/directorylist.png")}
                />
              )}
              isTablet
            />
              <MoreTab
              title="PieChart"
              navigateTo="PieChart"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/directorylist.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Direcotry List of Clinics"
              navigateTo="DirectoryList"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/directorylist.png")}
                />
              )}
              isTablet
            />
            {/* <MoreTab
              title="BusinessProfile"
              navigateTo="BusinessProfile"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
            /> */}
            <MoreTab
              title="Search in Clinics"
              navigateTo="SearchClinics"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* end */}

          <MultipleMoreTab
            title="Manage Clinics"
            isSub={true}			
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/company.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Clinics"
              navigateTo="Clinics"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Clinic"
              navigateTo="OperationsClinic"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Search in Clinics"
              navigateTo="SearchClinics"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* end */}

          <MultipleMoreTab
            title="Manage Companies"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/company.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Companies"
              navigateTo="Companies"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Company"
              navigateTo="OperationsCompany"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Search in Companies"
              navigateTo="SearchCompaniess"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.4 */}
          <MultipleMoreTab
            title="Manage Users"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/addressbook.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Users"
              navigateTo="Users"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/users.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Edit User"
              navigateTo="OperationsUser"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/users.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Patients"
              navigateTo="Patients"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/patient.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Patient"
              navigateTo="OperationsPatient"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/patient.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Accountants"
              navigateTo="Accountants"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/accountant.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Accountant"
              navigateTo="OperationsAccountant"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/accountant.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Receptions"
              navigateTo="Receptions"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/bell.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Reception"
              navigateTo="OperationsReception"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/bell.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Doctors"
              navigateTo="Doctors"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/doctor.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Doctor"
              navigateTo="OperationsDoctor"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/doctor.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Freelancers"
              navigateTo="Freelancers"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/boat.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Edit Freelancer"
              navigateTo="OperationsFreelancer"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/boat.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="EROs"
              navigateTo="EROs"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/lifejacket.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Add Edit ERO"
              navigateTo="OperationsERO"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/lifejacket.png")}
                />
              )}
              isTablet
            />
			
            <MoreTab
              title="Search in Users"
              navigateTo="SearchUsers"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
			
          </MultipleMoreTab>
          {/* end */}

          {/* 1.9 */}
          <MultipleMoreTab
            title="Accounting"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/accounting.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Settings"
              navigateTo="Settings"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/setting.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Invoices"
              navigateTo="Invoices"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/invoice.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="InvoiceProfile"
              navigateTo="InvoiceProfile"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/invoice.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Expenses"
              navigateTo="Expenses"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/expense.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="COAs"
              navigateTo="COAs"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/COA.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Operations Expense"
              navigateTo="OperationsExpense"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/transactions.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Profit Loss Statement"
              navigateTo="ProfitLossStatement"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/profitloss.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Reports"
              navigateTo="Charts"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/BI.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Products"
              navigateTo="Products"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/product.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Services"
              navigateTo="Services"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/service.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Payment Details"
              navigateTo="PaymentsDetails"
              isSub={true}			  
              Icon={() => (
                <MaterialIcons name="payment" size={30} color={"#003c75"} />
              )}
              isTablet
            />
            <MoreTab
              title="Search in Accounting"
              navigateTo="SearchAccounting"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.2 */}
          <MultipleMoreTab
            title="Books"
            navigateTo="Books" 
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/books.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Materia Medica TCM"
              navigateTo="MateriaMedicaTCM"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/mortarpestle.png")}
                />
              )}
              isTablet
            />



            {/* <MoreTab
              title="Acupuncture"
              navigateTo="Acupuncture"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/acuneedles.png")}
                />
              )}
              isTablet
            /> */}
            {/* <MoreTab
              title="Formulas TCM"
              navigateTo="FormulasTCM"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/formulas.png")}
                />
              )}
              isTablet
            /> */}
            {/* <MoreTab
              title="Meridians"
              navigateTo="Meridians"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/meridians1.png")}
                />
              )}
              isTablet
            /> */}

            <MoreTab
              title="Materia Medica Ayurveda"
              navigateTo="MateriaMedicaAyurveda"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/mortarpestle.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Materia Medica Homeopathy"
              navigateTo="MateriaMedicaHomeo"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/mortarpestle3.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Henry C. Allen"
              navigateTo="Allen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/allen.jpg")}
                />
              )}
              isTablet
            />

            {/* <MoreTab
              title="Boericke"
              navigateTo="Boericke"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/boericke.jpg")}
                />
              )}
              isTablet
            /> 
            <MoreTab
              title="Borger"
              navigateTo="Borger"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/boger.jpg")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Clarke"
              navigateTo="Clarke"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/clarke.jpg")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Dunham"
              navigateTo="Dunham"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/dunham.jpg")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Farrington"
              navigateTo="Farrington"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/farrington.jpg")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Henry N. Guernsey"
              navigateTo="Guernsey"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/guernsey.jpg")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Hahnemann"
              navigateTo="Hahnemann"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/hahnemann.jpg")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Hering"
              navigateTo="Hering"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/hering.jpg")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="J. T. Kent"
              navigateTo="Kent"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/kent.jpg")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="A. Von Lippe"
              navigateTo="Lippe"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/lippe.jpg")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Mure"
              navigateTo="Mure"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/mure.jpg")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Nash"
              navigateTo="Nash"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/nash.jpg")}
                />
              )}
              isTablet
            /> */}
          </MultipleMoreTab>
          {/* end */}
          {/* 1.4 */}
          <MultipleMoreTab
            title="Messenger"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/messages.png")}
              />
            )}
            isTablet
          >
            <MoreTab
   			  title="ContactsList"			
			  navigateTo="Contacts" 			
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/users.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="VideoCall"
              navigateTo="CameraScreen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/videochat.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="MessagesScreen"
              navigateTo="MessagesScreen"
              isSub={true}			  
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/messages.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Search in Messages"
              navigateTo="SearchMessageScreen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.2 */}
          {/* <MultipleMoreTab
            title="Databases"
            navigateTo="MateriaMedicaHomeo" 
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/database1.png")}
              />
            )}
            isTablet
          > */}
            {/* <MoreTab
              title="Organizations"
              navigateTo="Organizations"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/organization.png")}
                />
              )}
              isTablet
            /> */}

            {/* <MoreTab
              title="Banks"
              navigateTo="Banks"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/bank.png")}
                />
              )}
              isTablet
            /> */}

            {/* <MoreTab
              title="Titles"
              navigateTo="Titles"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/title.png")}
                />
              )}
              isTablet
            /> */}
            {/* <MoreTab
              title="Insurances"
              navigateTo="Insurances"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/insurance.png")}
                />
              )}
              isTablet
            /> */}
          {/* </MultipleMoreTab> */}
          {/* end */}

          {/* 1.5 */}
          <MultipleMoreTab
            title="About Us"
            navigateTo="AboutUs" 
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/about.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Clinic User Profile"
              navigateTo="ClinicUserProfile"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/company.png")}
                />
              )}
              isTablet
            />
		  
            <MoreTab
              title="Privacy Policy"
              navigateTo="PrivacyPolicy"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/privacypolicy.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Terms of Use & Condition"
              navigateTo="TermsofUse" 
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/termofuse.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.5 */}
          <MultipleMoreTab
            title="My Cloud"
            navigateTo="Drive" 
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/yourdrive.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Drive"
              navigateTo="Drive"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/yourdrive.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* 99 */}

          {/* 1.4 */}
          <MultipleMoreTab
            title="TeleMed Screens"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/addressbook.png")}
              />
            )}
            isTablet
          >
            <MoreTab
              title="Map"
              navigateTo="Map"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/mappin.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Financial"
              navigateTo="Financial"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/BI.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="TabShare"
              navigateTo="TabShare"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/BI.png")}
                />
              )}
              isTablet
            />

            {/* <MoreTab
              title="AppointmentsDetail"
              navigateTo="AppoinmentInfo"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/patient.png")}
                />
              )}
              isTablet
            /> */}
            <MoreTab
              title="BookAppointment"
              navigateTo="BookAppointment"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/patient.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Cardiolist"
              navigateTo="Cardiolist"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/accountant.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="ConsultantDetails"
              navigateTo="ConsultantDetails"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/accountant.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Schedule"
              navigateTo="Schedule"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/scheduler.png")}
                />
              )}
              isTablet
            />
            <MoreTab
              title="Slot2"
              navigateTo="Slot2"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/bell.png")}
                />
              )}
              isTablet
            />

            <MoreTab
              title="Speacility"
              navigateTo="Speacility"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/doctor.png")}
                />
              )}
              isTablet
            />
          </MultipleMoreTab>
          {/* end */}

        <TouchableOpacity
          onPress={doLogout}
          style={styles.ContainerView}
        >
          <View style={styles.LeftContainer}>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/logout.png")}
            />
            <Text style={styles.TextContainer}>Logout</Text>
          </View>
          <View style={styles.RightContainer}></View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  ContainerView: {
    backgroundColor: "white",
    width: "90%",
    height: h("10%"),
    marginTop: h("2%"),
    flexDirection: "row",
  },
  rotateImage: {
    transform: [{ rotate: "90deg" }],
  },
  subMenuView: {
    backgroundColor: "white",
    width: "80%",
    height: h("8%"),
    marginTop: h("2%"),
    marginLeft: h("2%"),
    flexDirection: "row",
  },
  subMenuView1: {
    backgroundColor: "white",
    width: "81%",
    height: h("8%"),
    marginTop: h("2%"),
    marginLeft: h("5%"),
    flexDirection: "row",
  },
  LeftContainer: {
    width: "80%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: h("2%"),
  },
  RightContainer: {
    // backgroundColor: 'gold',
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TextContainer: {
    color: "black",
    fontSize: h("2%"),
    paddingLeft: 5,
  },
  //tablet
  TextContainer1: {
    color: "black",
    fontSize: h("1.8%"),
    paddingLeft: 5,
  },
  icons: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  iconImages: {
   // borderWidth: 3,
    resizeMode: "cover",
    width: 25,
    height: 25,
    marginLeft: 5,
  },
});