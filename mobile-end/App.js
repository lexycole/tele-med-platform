// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
// import { ClerkProvider } from '@clerk/clerk-expo';
// import { Slot } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { Provider } from "react-redux";
// import { store } from "./src/store";
// import { proxy } from "valtio";
// import { DeviceType, getDeviceTypeAsync } from "expo-device";
// import * as Sentry from 'sentry-expo';
// import 'react-native-url-polyfill/auto';
// import 'react-native-get-random-values';
// import authStorage from "./src/auth/storage";

// export const state = proxy({
//   isTablet: false,
// });

// const App = () => {
//   const [loading, setLoading] = useState(true);

//   const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
//   if (!publishableKey) {
//     throw new Error(
//       'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
//     )
//   }

//   const getDeviceType = async () => {
//     const device = await getDeviceTypeAsync();
//     state.isTablet = device === DeviceType.TABLET;
//     console.log("Is tablet:", state.isTablet);
//   };

//   Sentry.init({
//     dsn: 'https://0e4e85c2923745b9ba04c3f7158ab954@o1130038.ingest.sentry.io/6179746',
//     enableInExpoDevelopment: true,
//     debug: true,
//   });

//   useEffect(() => {
//     const prepare = async () => {
//       try {
//         await SplashScreen.preventAutoHideAsync();
//         await getDeviceType();
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setLoading(false);
//         await SplashScreen.hideAsync();
//       }
//     };
//     prepare();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Image source={require('./src/assets/logo.png')} style={styles.image} />
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={authStorage.tokenCache}>
//       <Provider store={store}>
//         <Slot />
//       </Provider>
//     </ClerkProvider>
//   );
// }

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
// });