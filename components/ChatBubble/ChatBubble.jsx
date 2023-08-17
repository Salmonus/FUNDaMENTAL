import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AuthContext } from "../../Contexts/AuthContext";
import { getName } from "../../firebase/config";

const ChatBubble = ({ text, leftBubble = false }) => {
  const { authUserId } = useContext(AuthContext);
  const [name, setName] = useState("You");

  getName( authUserId ).then((n) => setName(n))

  return (
    <View style={leftBubble ? styles.chatBubbleLeft : styles.chatBubbleRight}>
      <Text style={[styles.text, {color: leftBubble ? "lightgrey" : "skyblue"}]}>
        <Text style={{fontFamily: "ChakraPetch-SemiBold"}}>{leftBubble ? "Learna: " : `${name}:`}</Text>
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
