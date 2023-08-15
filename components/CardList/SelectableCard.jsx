import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const SelectableCard = ({ id, text, selected, onPress, children }) => {
  return (
    <TouchableOpacity
      id={id}
      onPress={onPress}
      style={styles.card}
    >
      <Image 
        source={require("../../assets/images/wide_button.png")} 
        style={{width: "auto", height: 64, zIndex: 0}}
        resizeMode="contain"
      />
      <View style={styles.itemContainer}>
        <View style={styles.icon}>{children}</View>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    padding: 12,
    width: "100%",
    height: "100%",
  },
  card: {
    height: 64,
    margin: 4,
  },
  textStyle: {
    flex: 5,
    color: "white",
    fontSize: 22,
    fontWeight: 600,
    paddingLeft: 12,
    fontFamily: "ChakraPetch-Medium"
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectableCard;
