import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { tokenCache } from '../lib/api'; 


const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // Get the token from the completed sign-in
      const sessionId = completeSignIn.createdSessionId;
      if (sessionId) {
        // Get the session token
        const token = await completeSignIn.token;
        // Store the token
        await tokenCache.saveToken('auth_token', token);
        console.log('Token saved successfully');
      }

      // Set the active session
      await setActive({ session: sessionId });
    } catch (err) {
      console.error('Sign in error:', err);
      alert(err.errors?.[0]?.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput 
        autoCapitalize="none" 
        placeholder="wale@gmail.com" 
        value={emailAddress} 
        onChangeText={setEmailAddress} 
        style={styles.inputField} 
      />
      <TextInput 
        placeholder="password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.inputField} 
      />

      <Button 
        onPress={onSignInPress} 
        title="Login" 
        color={'#00B7DD'}
      />

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

// import { useSignIn } from '@clerk/clerk-expo';
// import { Link } from 'expo-router';
// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';

// const Login = () => {
//   const { signIn, setActive, isLoaded } = useSignIn();

//   const [emailAddress, setEmailAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const onSignInPress = async () => {
//     if (!isLoaded) {
//       return;
//     }
//     setLoading(true);
//     try {
//       const completeSignIn = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       // This indicates the user is signed in
//       await setActive({ session: completeSignIn.createdSessionId });
//     } catch (err) {
//       alert(err.errors[0].message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Spinner visible={loading} />

//       <TextInput autoCapitalize="none" placeholder="wale@gmail.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
//       <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

//       <Button onPress={onSignInPress} title="Login" color={'#00B7DD'}></Button>

//       <Link href="/reset" asChild>
//         <Pressable style={styles.button}>
//           <Text>Forgot password?</Text>
//         </Pressable>
//       </Link>
//       <Link href="/register" asChild>
//         <Pressable style={styles.button}>
//           <Text>Create Account</Text>
//         </Pressable>
//       </Link>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Login;