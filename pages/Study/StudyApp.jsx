import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudyOptions from "./StudyOptions"
import Study from "./Study"

const Stack = createNativeStackNavigator();

const StudyApp = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Study Options">
      <Stack.Screen 
        name="Study Options"
        component={StudyOptions}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Study"
        component={Study}
      />
    </Stack.Navigator>
  );
};

export default StudyApp;