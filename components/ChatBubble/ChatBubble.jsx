import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ChatBubble = ({ text, leftBubble = false }) => {
  return (
    <View style={leftBubble ? styles.chatBubbleLeft : styles.chatBubbleRight}>
      <Text style={[styles.text, {color: leftBubble ? "lightgrey" : "skyblue"}]}>
        <Text style={{fontFamily: "ChakraPetch-SemiBold"}}>{leftBubble ? "Learna: " : "You: "}</Text>
        <Text>{text}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatBubbleLeft: {
    margin: 4,
  },
  chatBubbleRight: {
    margin: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "ChakraPetch-Regular",
    textAlign: "left",
    padding: 8,
  },
});

export default ChatBubble;
