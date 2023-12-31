import React from "react";
import { StyleSheet } from "react-native";
import RadioButtonRN from "radio-buttons-react-native";

const RadioButton = ({ radioOptions, handleSelection }) => {
  return (
    <RadioButtonRN
      data={radioOptions}
      selectedBtn={(e) => {
        handleSelection(e);
      }}
      box={false}
      circleSize={10}
      activeColor={"grey"}
      deactiveColor={"white"}
      textStyle={styles.buttonText}
      style={styles.buttonContainer}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    padding: 5,
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "ChakraPetch-Medium",
  },
});

export default RadioButton;
