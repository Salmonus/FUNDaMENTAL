import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
import { AuthContext } from "./Contexts/AuthContext";

import useFonts from './hooks/useFonts';
import { BottomBarNavigator, AuthNavigator } from "./navigators";

export default function App() {
  const [authUserId, setAuthUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [IsReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await useFonts();
    };
    loadFonts();
    setIsReady(true);
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

  if (!IsReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      <NavigationContainer>
        {authUserId ? (
          <BottomBarNavigator chatStarted={false} />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
