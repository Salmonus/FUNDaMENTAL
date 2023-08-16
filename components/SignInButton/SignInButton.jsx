import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

const SignInButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <Image 
        source={require("../../assets/images/wide_button.png")}
        style={{width: 300, height: 40}}
        resizeMode="stretch"
      />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    padding: 10,
    fontSize: 18,
    color: "white",
    fontFamily: "ChakraPetch-Regular",
    textAlign: "center",
    zIndex: 0,
    position: "absolute"
  },
});

export default SignInButton;
