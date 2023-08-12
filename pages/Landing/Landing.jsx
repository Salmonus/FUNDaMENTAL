import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, TextInput } from "react-native";
import { LernaLangLogo } from "../../assets/images";
import { SignInButton } from "../../components";
import { EmailIcon, AccountIcon } from "../../assets/icons";

const Landing = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyles}>Hi, I'm Fundy!</Text>
      <View style={styles.logoStyles}>
        <LernaLangLogo height={300} width={300} />
        <Text style={styles.slogan}>
          Learn with Fundy,{"\n"} Earn with FUNDaMENTAL{" "}
        </Text>
      </View>
      <View style={styles.signInButtonStyles}>
        <SignInButton
          text="Login with Email"
          onPress={() => navigation.navigate("SignIn")}
        >
          <EmailIcon height={20} width={20} />
        </SignInButton>
        <SignInButton
          text="Create Account"
          onPress={() => navigation.navigate("SignUp")}
        >
          <AccountIcon height={20} width={20} />
        </SignInButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  titleStyles: {
    paddingTop: 150,
    marginBottom: 0,
    marginTop: 0,
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
  },
  logoStyles: {
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  signInButtonStyles: {
    bottom: 0,
    paddingBottom: 150,
  },
  slogan: {
    marginTop: 0,
    padding: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "thin",
    color: "grey",
  },
});

export default Landing;
