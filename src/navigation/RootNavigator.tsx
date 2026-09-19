import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import ImageDetails from "../screens/ImageDetails";

import { useAuthStore } from "../store/useAuthStore";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          {/* 🏠 Home */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          {/* ⭐ Favorites */}
          <Stack.Screen
            name="Favorites"
            component={Favorites}
          />

          {/* 👤 Profile */}
          <Stack.Screen
            name="Profile"
            component={Profile}
          />

          {/* 🖼️ Image Details */}
          <Stack.Screen
            name="Details"
            component={ImageDetails}
          />
        </>
      ) : (
        <>
          {/* 🔐 Login */}
          <Stack.Screen name="Login" component={Login} />

          {/* 📝 Register */}
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}