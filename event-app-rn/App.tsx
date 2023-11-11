import React, { useEffect } from 'react';
import theme from './src/utils/theme';
import { ThemeProvider } from '@shopify/restyle';
import Navigation from './src/navigation';
import {SafeAreaProvider} from "react-native-safe-area-context"
import { StatusBar } from 'expo-status-bar';
import useUserGlobalStore from './src/store/useUserGlobalStore';

export default function App() {
  const {user, updateUser} = useUserGlobalStore()

  console.log('user', JSON.stringify(user, null, 2))

  useEffect(() => {
    updateUser({
      email: "d@gmail.com",
      name: "d"
    })
    return () => {}
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
      <Navigation />
      <StatusBar translucent
      />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}


