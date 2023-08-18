import React, { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, ImageBackground } from "react-native";
import { SendIcon } from "../../assets/icons";

const ChatInputField = ({ value, sendResponse, onFocus }) => {
  const [input, setInput] = useState(value);

  const handleOnPress = () => {
    sendResponse(input);
    setInput("");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/tab.png")}
      resizeMode="stretch"
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(input) => setInput(input)}
          value={input}
          placeholder="Enter response..."
          placeholderTextColor={"white"}
          keyboardType="default"
          multiline={true}
          onFocus={onFocus}
        />
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.sendButton,
          ]}
          onPress={() => handleOnPress()}
        >
          <SendIcon
            height={28}
            width={28}
          />
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    minHeight: 48,
    maxHeight: 110,
    alignItems: "center", 
  },
  input: {
    color: "white",
    fontSize: 16,
    fontFamily: "ChakraPetch-Regular",
    marginLeft: 8,
    flex: 1,
  },
  sendButton: {
    justifyContent: "center",
    width: "10%",
    right: 5,
  }
});

export default ChatInputField;
