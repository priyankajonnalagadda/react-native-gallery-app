import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 👤 User Type
interface User {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

// 🧠 State Type
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  loadUser: () => void;
}

// 🚀 Store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  // ✅ LOGIN
  login: async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    set({ user, isLoggedIn: true });
  },

  // ✅ LOGOUT
  logout: async () => {
    await AsyncStorage.removeItem("user");
    set({ user: null, isLoggedIn: false });
  },

  // ✅ LOAD SESSION (AUTO LOGIN)
  loadUser: async () => {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      set({
        user: JSON.parse(data),
        isLoggedIn: true,
      });
    }
  },
}));