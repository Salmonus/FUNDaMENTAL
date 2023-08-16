import React, { useState, useEffect } from "react";
import { SafeAreaView, ImageBackground, StatusBar } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
import { AuthContext } from "./Contexts/AuthContext";

import useFonts from './hooks/useFonts';
import { BottomBarNavigator, AuthNavigator } from "./navigators";

export default function App() {
  const [authUserId, setAuthUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  StatusBar.setBarStyle('light-content', true);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    }
  }

  useEffect(() => {
    const loadFonts = async () => {
      await useFonts();
      setIsReady(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUserId(user?.uid);
        setIsLoggedIn(!!user);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    authUserId,
    setAuthUserId,
    isLoggedIn,
    setIsLoggedIn,
  };

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      <SafeAreaView style={{flex: 1, backgroundColor: "black"}}>
        <NavigationContainer theme={navTheme}>
          <ImageBackground 
            source={require("./assets/images/background_box.png")}
            resizeMode="stretch"
            style={{flex: 1}}
          >
            {authUserId ? (
              <BottomBarNavigator chatStarted={false} />
            ) : (
              <AuthNavigator />
            )}
          </ImageBackground>
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}
