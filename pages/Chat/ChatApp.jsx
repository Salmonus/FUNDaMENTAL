import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from "./Chat"
import ChatHistory from "./ChatHistory"

const Stack = createNativeStackNavigator();

const ChatApp = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Chat List">
      <Stack.Screen 
        name="Chat List"
        component={ChatHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChatApp;