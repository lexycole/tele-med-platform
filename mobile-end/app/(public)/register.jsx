import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp()

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    // Start the sign-up process using the info the user provided
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      })

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Display the second form to collect the verification code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle the submission of the verification form
  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    // Use the code the user provided to attempt verification
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/login')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error('Error:', JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View>
      {!pendingVerification && (
        <View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={onSignUpPress}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
// import * as React from 'react'
// import { Button, TextInput, View, StyleSheet } from 'react-native';
// import { useSignUp } from '@clerk/clerk-expo';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { useState } from 'react';
// import { Stack } from 'expo-router';

// const Register = () => {
//   const { isLoaded, signUp, setActive } = useSignUp();

//   const [firstName, setFirstName] = React.useState('')
//   const [lastName, setLastName] = React.useState('')
//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const [pendingVerification, setPendingVerification] = React.useState(false)
//   const [code, setCode] = React.useState('')

//   const [loading, setLoading] = useState(false);

//   // Create the user and send the verification email
//   const onSignUpPress = async () => {
//     if (!isLoaded) {
//       return;
//     }
//     setLoading(true);

//     try {
//       // Create the user on Clerk
//       await signUp.create({
//         firstName,
//         lastName,
//         emailAddress,
//         password,
//       });

//       // Send verification Email
//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

//       // change the UI to verify the email address
//       setPendingVerification(true);
//     } catch (err) {
//       alert(err.errors[0].message);
//       console.error(JSON.stringify(err, null, 2))
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify the email address
//   const onPressVerify = async () => {
//     if (!isLoaded) {
//       return;
//     }
//     setLoading(true);

//     try {
//       const completeSignUp = await signUp.attemptEmailAddressVerification({
//         code,
//       });


//       if (completeSignUp.status === 'complete') {
//         await setActive({ session: completeSignUp.createdSessionId })
//         router.replace('/dashboard')
//       } else {
//         console.error(JSON.stringify(completeSignUp, null, 2))
//       }
      
//     } catch (err) {
//       alert(err.errors[0].message);
//       console.error(JSON.stringify(err, null, 2))
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
//       <Spinner visible={loading} />

//       {!pendingVerification && (
//         <>
//           <TextInput autoCapitalize="none" placeholder="example@mail.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
//           <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

//           <Button onPress={onSignUpPress} title="Sign up" color={'#6c47ff'}></Button>
//         </>
//       )}

//       {pendingVerification && (
//         <>
//           <View>
//             <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
//           </View>
//           <Button onPress={onPressVerify} title="Verify Email" color={'#6c47ff'}></Button>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   inputField: {
//     marginVertical: 4,
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#6c47ff',
//     borderRadius: 4,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   button: {
//     margin: 8,
//     alignItems: 'center',
//   },
// });

// export default Register;