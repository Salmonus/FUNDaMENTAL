import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatApp, Profile } from "../../pages";
import {
  ProfileIcon,
  ChatIcon,
  HistoryIcon,
  StudyIcon,
} from "../../assets/icons";
import StudyApp from "../../pages/Study/StudyApp";

const Tab = createBottomTabNavigator();

const BottomBarNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          margin: 12,
          marginBottom: 16,
        }
      }}
    >
      <Tab.Screen
        name="Study App"
        component={StudyApp}
        options={{
          tabBarIcon: ({ focused }) => (
            <StudyIcon 
              border={focused ? require("../../assets/images/chatBorder.png") : require("../../assets/images/disabledBorder.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatApp}
        options={{
          tabBarIcon: ({ focused }) => (
            <ChatIcon 
              border={focused ? require("../../assets/images/chatBorder.png") : require("../../assets/images/disabledBorder.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon 
              border={focused ? require("../../assets/images/chatBorder.png") : require("../../assets/images/disabledBorder.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBarNavigator;
