# 📱 React Native Gallery App

A mobile application built using **React Native (Expo)**, **TypeScript**, and **Zustand** for state management.  
This app demonstrates a clean architecture with authentication flow, image gallery display, and navigation handling.

## 🚀 Features

- 🔐 User Authentication (Login & Register)
- 🖼️ Image Gallery Display
- ❤️ Add / Remove Favorites
- 🧭 Navigation using React Navigation
- ⚡ State Management using Zustand
- 📂 Clean and scalable folder structure


## 🛠️ Tech Stack

- React Native (Expo)
- TypeScript
- Zustand (State Management)
- React Navigation

## 📁 Project Structure

src/
├── navigation/
│ └── RootNavigator.tsx
├── screens/
│ ├── HomeScreen.tsx
│ ├── LoginScreen.tsx
│ ├── Register.tsx
│ ├── Favorites.tsx
│ └── Profile.tsx
├── store/
│ ├── useAuthStore.ts
│ └── useGalleryStore.ts

## ▶️ How to Run the Project

### 1. Install dependencies
```bash
npm install
2. Start the app
npx expo start
3. Run on device
Scan QR code using Expo Go (Android/iOS)

⚠️ Important Note
This project is built using Expo SDK 50
Latest Expo Go uses SDK 57, which may cause compatibility issues
If app does not run on phone:
Option 1: Install older Expo Go version compatible with SDK 50
Option 2: Upgrade project to latest Expo SDK

🧠 Learning Highlights
Implemented global state management using Zustand
Built reusable and modular components
Managed navigation flow between authentication and app screens
Structured project for scalability
👩‍💻 Author

Priyanka Jonnalagadda
