import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

const Header2 = ({ text, leftButton, rightButton }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>{text}</Text>
      <View style={styles.headerRight}>{rightButton}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
    height: 50,
    top: 10,
  },
  headerText: {
    flex: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    alignSelf: "center",
  },
  headerRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
});

export default Header2;
