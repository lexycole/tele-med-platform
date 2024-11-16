import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as Sentry from 'sentry-expo';
import { tokenCache } from './lib/api'; 
import * as Device from 'expo-device';
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import { proxy } from "valtio";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { AuthProvider } from './lib/authContext';

export const state = proxy({isTablet: false});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
}

const getDeviceType = async () => {
  const device = await getDeviceTypeAsync();
  state.isTablet = device === DeviceType.TABLET ? true : false;
  console.log("state of device is tablet:", state.isTablet);
};

Sentry.init({
  dsn: 'https://0e4e85c2923745b9ba04c3f7158ab954@o1130038.ingest.sentry.io/6179746',
  enableInExpoDevelopment: true,
  debug: true,
});

const InitialLayout = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const segments = useSegments();
  const router = useRouter();


  useEffect(() => {
    const setupToken = async () => {
      const token = await getToken();
      console.log(token, 'this is real token')
      if (token) {
        await tokenCache.saveToken('auth_token', token);
      }
    };
    setupToken();
  }, [getToken]);

  
  useEffect(() => {
    if (!isLoaded) return;
    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      getDeviceType();
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn]);

  return (
    <AuthProvider value={{ getToken, isSignedIn, isLoaded }}>
      <Slot />
    </AuthProvider>
  );
};

const RootLayout = () => {
  return (
    <Provider store={store}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <InitialLayout />
      </ClerkProvider>
    </Provider>
  );
};

export default Sentry.Native.wrap(RootLayout);

// import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
// import { Slot, useRouter, useSegments } from 'expo-router';
// import { useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import * as Sentry from 'sentry-expo';
// import { create } from 'apisauce';


// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// if (!publishableKey) {
//   throw new Error(
//     'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
//   )
// }


// Sentry.init({
//   dsn: 'https://0e4e85c2923745b9ba04c3f7158ab954@o1130038.ingest.sentry.io/6179746',
//   enableInExpoDevelopment: true,
//   debug: true,
// });

// const InitialLayout = () => {
//   const { isLoaded, isSignedIn} = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded) return;
//     const inTabsGroup = segments[0] === '(auth)';

//     console.log('User changed: ', isSignedIn);

//     if (isSignedIn && !inTabsGroup) {
//       router.replace('/home');
//     } else if (!isSignedIn) {
//       router.replace('/login');
//     }
//   }, [isSignedIn]);

//   return <Slot />;
// };

// const tokenCache = {
//   async getToken(key) {
//     try {
//       const getTokenCache = await SecureStore.getItemAsync(key);
//       console.log('Retrieved token:', getTokenCache);
//       return getTokenCache;
//     } catch (err) {
//       console.error("Error getting token:", err);
//       return null;
//     }
//   },
//   async saveToken(key, value) {
//     try {
//       const saveTokenCache = await SecureStore.setItemAsync(key, value);
//       console.log('Retrieved token:', saveTokenCache);
//       return saveTokenCache; 
//     } catch (err) {
//       console.error("Error saving token:", err);
//       return;
//     }
//   },

//   async deleteToken (key, value) {
//     try {
//       const deleteTokenCache = await SecureStore.deleteItemAsync(key, value);
//       console.log('Token deleted successfully: ', deleteTokenCache);
//       return deleteTokenCache;
//     } catch (err) {
//       console.error("Error removing token: ", err);
//     }
//   }
// };

// // API CLIENT
// const apiClient = create({
//   // nestjs api
//   baseURL: 'http://localhost:8080/api',
// });

// //access protected apis
// apiClient.addAsyncRequestTransform(
//   async (request) => {
//     const authToken = await tokenCache.getToken();
//     console.log(authToken, 'protected apis auth Token')
//     if(!authToken) return;
//       request.headers["x-auth-token"] = authToken;
//   }
// );

// const RootLayout = () => {
//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <InitialLayout />
//     </ClerkProvider>
//   );
// };

// export default Sentry.Native.wrap(RootLayout);