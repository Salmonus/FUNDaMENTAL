import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  ScrollView
} from "react-native";
import { Header } from "../../components";
import { LernaLangLogo } from "../../assets/images";
import { BackIcon, LadderIcon } from "../../assets/icons";

import { signInUser } from "../../firebase/config";
import { AuthContext } from "../../Contexts/AuthContext";

const SignIn = ({ navigation }) => {
  const { setAuthUserId } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onLoginPress = () => {
    setAuthUserId("RalZbLOhqoOzGwchqYjBWAafer43");
    // signInUser with firebase functions
    // try {
    //   signInUser(email, password)
    //     .then((userId) => {
    //       setAuthUserId(userId);
    //     })
    //     .catch((error) => {
    //       setErrorMessage("Invalid email or password.");
    //     });
    // } catch (error) {
    //   console.error(error.message);
    //   setErrorMessage("Invalid email or password.");
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text="Sign In"
        leftButton={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon height={30} width={30} />
          </TouchableOpacity>
        }
        rightButton={<LadderIcon height={30} width={30} />}
      />
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <LernaLangLogo height={250} width={200} />
        <Text style={styles.error}>{errorMessage}</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Image
            source={require("../../assets/images/button_normal.png")}
            style={{flex: 1}}
            resizeMode="stretch"
          />
          <Text style={styles.buttonTitle}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={styles.footerLink}
            >
              Create an account
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  inputsView: {
    width: "100%",
    gap: 16,
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 48,
    overflow: "hidden",
    paddingLeft: 16,
    position: "absolute",
    color: "white"
  },
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "ChakraPetch-Bold",
    textAlign: "left",
    width: "80%",
  },
  button: {
    margin: 20,
    width: "40%",
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
    marginTop: 20,
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

export default SignIn;
