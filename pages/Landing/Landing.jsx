import React, { useState, useCallback } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import { SignInButton } from "../../components";
import { AccountIcon } from "../../assets/icons";
import LoginImage from "../../assets/images/LoginImage2.png";
import LoginImage2 from "../../assets/images/LoginImage.png";
import BackgroundImage from "../../assets/Starfall_GUI_2/Sliced/11_Main_Menu/mm_box.png"; // Import the background image
import { useFocusEffect } from '@react-navigation/native';

const Landing = ({ navigation }) => {
  const [currentLoginImage, setCurrentLoginImage] = useState(LoginImage);

  const handleLoginPress = () => {
    setCurrentLoginImage(LoginImage2);
    setTimeout(() => {
      navigation.navigate("SignIn");
    }, 1000);
  };

  // Reset the image every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setCurrentLoginImage(LoginImage);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage} /> {/* Set the background image */}
      <Text style={styles.titleStyles}>Hi, I'm Fundy!</Text>
      <Text style={styles.slogan}>
        Learn with Fundy,{"\n"} Earn with FUNDaMENTAL
      </Text>
      <View style={styles.signInButtonStyles}>
        <TouchableOpacity onPress={handleLoginPress}>
          <Image source={currentLoginImage} style={{ width: 240, height: 80 }} />
        </TouchableOpacity>
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
  backgroundImage: { // Add a style for the background image
    position: "absolute", // This will make the image position itself behind all other content
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleStyles: {
    paddingTop: 150,
    marginBottom: 0,
    marginTop: 0,
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
  },
  signInButtonStyles: {
    bottom: 0,
    paddingBottom: 150,
    alignItems: "center",
    justifyContent: "center",
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
