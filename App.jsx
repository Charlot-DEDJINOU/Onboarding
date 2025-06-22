import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './src/screens/Onboarding';
import Toast from 'react-native-toast-message';
import toastConfig from './toastConfig';
import "./style.css";

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingScreen />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}