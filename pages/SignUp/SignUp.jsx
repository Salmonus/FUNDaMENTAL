import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LernaLangLogo } from "../../assets/images";
import { Header } from "../../components";
import { BackIcon, LadderIcon } from "../../assets/icons";

import { signUpUser } from "../../firebase/config";

// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";
// import { db, auth } from "../../firebase/config";

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
    signUpUser(email, password, fullName)
      .then((user) => {
        navigation.navigate("Study App");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Header
          text="Create an account"
          leftButton={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon height={30} width={30} />
            </TouchableOpacity>
          }
        />
        <View style={{ alignItems: "center", margin: 40, marginBottom: 20 }}>
          <LernaLangLogo height={100} width={100} />
        </View>
        <Text style={styles.error}>{errorMessage}</Text>
        <View style={{gap: 12}}>
          <View style={styles.inputsView}>
            <Image 
              source={require("../../assets/images/tab.png")}
              style={{width: "80%", height: 48}}
              resizeMode="stretch"
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputsView}>
            <Image 
              source={require("../../assets/images/tab.png")}
              style={{width: "80%", height: 48}}
              resizeMode="stretch"
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputsView}>
            <Image 
              source={require("../../assets/images/tab.png")}
              style={{width: "80%", height: 48}}
              resizeMode="stretch"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputsView}>
            <Image 
              source={require("../../assets/images/tab.png")}
              style={{width: "80%", height: 48}}
              resizeMode="stretch"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
            <Image
              source={require("../../assets/images/button_normal.png")}
              style={{flex: 1, width: "60%"}}
              resizeMode="stretch"
            />
            <Text style={styles.buttonTitle}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text
              onPress={() => navigation.navigate("SignIn")}
              style={styles.footerLink}
            >
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  inputsView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 48,
    overflow: "hidden",
    paddingLeft: 16,
    position: "absolute",
    color: "white",
    fontFamily: "ChakraPetch-Regular"
  },
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "ChakraPetch-Bold",
    textAlign: "center",
  },
  button: {
    margin: 36,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "ChakraPetch-Bold",
    position: "absolute"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "grey",
    fontFamily: "ChakraPetch-Regular",
  },
  footerLink: {
    color: "lightgrey",
    fontFamily: "ChakraPetch-Bold",
    fontSize: 16,
  },
});

export default SignUp;
