import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function Profile() {
  const { user, login, logout } = useAuthStore();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setMobile(user.mobile);
    }
  }, []);

  const handleUpdate = () => {
    if (!fullName || !mobile) {
      Alert.alert("All fields required");
      return;
    }

    const updatedUser = {
      ...user,
      fullName,
      mobile,
    };

    login(updatedUser); // update + save

    Alert.alert("Profile Updated");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
      />

      <TextInput
        value={mobile}
        onChangeText={setMobile}
        placeholder="Mobile"
      />

      <Button title="Update Profile" onPress={handleUpdate} />

      <Button title="Logout" onPress={logout} />
    </View>
  );
}