import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register({ navigation }: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // ✅ VALIDATIONS
    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      Alert.alert("All fields required");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Invalid email");
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert("Mobile must be 10 digits");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password must be 6+ chars");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    const user = { fullName, email, mobile, password };

    await AsyncStorage.setItem("registeredUser", JSON.stringify(user));

    Alert.alert("Registered Successfully");
    navigation.navigate("Login");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Full Name" onChangeText={setFullName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Mobile" onChangeText={setMobile} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}