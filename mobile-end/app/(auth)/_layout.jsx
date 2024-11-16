import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";



export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};


export const HeaderAndbbutton = ({ children, back, title, rightComponent }) => {
  const { goBack } = useNavigation();
  useEffect(() => console.log(back), [])
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.left}>
          {back && (
            <TouchableOpacity style={styles.leftIcon} onPress={()=>goBack()}>
              <MaterialIcons
                style={{
                  padding: 5,
                  width: "100%",
                }}
                name="arrow-back-ios"
                color="white"
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[styles.center, { width: rightComponent ? "60%" : "90%" }]}
        >
          {title && (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight:"bold",
                fontSize:17,
              }}
            >
              {title}
            </Text>
          )}
        </View>
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00B7DD',
        },
        headerTintColor: '#fff',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Home',
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color}  />,
          tabBarLabel: 'My Profile',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          headerTitle: 'My Dashboard',
          tabBarIcon: ({ color, size }) => <Ionicons name="apps-outline" size={size} color={color} />,
          tabBarLabel: 'Dashboard',
          headerLeft: () => <HeaderAndbbutton/>
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="planAndScheduleScreen"
        options={{
          tabBarLabel: 'Planning',
          headerTitle: 'Planning',
          tabBarIcon: ({color, size }) => (
            <Image
            style={styles.iconsPhone}
              source={require("../assets/icons/planning.png")}
            />
          ),
          // headerLeft: () => <HeaderAndbbutton/>
        }}
        redirect={!isSignedIn}
      />

      <Tabs.Screen
        name="patients"
        options={{
          headerTitle: 'Patients',
          tabBarLabel: "Patients",
          tabBarIcon: ({ color, size }) => (
            <Image
            style={styles.iconsPhone}
              source={require("../assets/icons/patient.png")}
            />
          ),
          // headerLeft: () => <HeaderAndbbutton/>
        }}
        redirect={!isSignedIn}
      />

      <Tabs.Screen
        name="medicalFiles"
        options={{
          headerTitle: 'Medical Files', 
          tabBarLabel: "Medical",
          tabBarIcon: ({ color, size }) => (
            <Image
            style={styles.iconsPhone}
              source={require("../assets/icons/medicalfile.png")}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      
      <Tabs.Screen
        name="moreScreen"
        options={{
          tabBarLabel: "More",
          headerTitle: 'More',
          tabBarIcon: ({ color, size }) => (
            <Image
              style={styles.iconsPhone}
              source={require("../assets/more.png")}
            />
          ),
        }}
        redirect={!isSignedIn}
      />

    </Tabs>
    
  );
};

export default TabsPage;

const styles = StyleSheet.create({
  icons: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },
  iconsPhone:{
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
  container: {
    height: hp("5%"),
    backgroundColor: "#00B7DD",
    flexDirection: "row",
    alignItems: "center",
  },
  childrenContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
  },
  left: {
    height: "100%",
    flex: 2,
    justifyContent: "center",
  },
  leftIcon: {
    marginHorizontal: 5,
  },
  center: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    height: "100%",
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});