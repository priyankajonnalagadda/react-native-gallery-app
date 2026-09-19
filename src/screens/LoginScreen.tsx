import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/useAuthStore";

export default function Login({ navigation }: any) {
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await AsyncStorage.getItem("registeredUser");

    if (!data) {
      Alert.alert("No user found. Register first.");
      return;
    }

    const user = JSON.parse(data);

    if (user.email === email && user.password === password) {
      login(user);
    } else {
      Alert.alert("Invalid credentials");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}