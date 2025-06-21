import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './screens/Onboarding';

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingScreen />
    </SafeAreaProvider>
  );
}