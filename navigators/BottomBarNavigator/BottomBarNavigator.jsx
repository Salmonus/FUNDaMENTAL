import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Chat, ChatHistory, ChatOptions, Profile } from "../../pages";
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
              height={"35px"}
              width={"35px"}
              color={focused ? "white" : "lightgrey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <ChatIcon
              height={"30px"}
              width={"30px"}
              color={focused ? "white" : "lightgrey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat History"
        component={ChatHistory}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <HistoryIcon
                height={"35px"}
                width={"35px"}
                color={focused ? "white" : "lightgrey"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              height={"23px"}
              width={"23px"}
              color={focused ? "white" : "lightgrey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBarNavigator;
