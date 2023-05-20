import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { colorPallete } from "./src/Presentation/theme/colors";
import { SplashScreen } from "./src/Presentation/views/splash/Splash";
import { HomeScreen } from "./src/Presentation/views/home/Home";

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <GestureHandlerRootView style={styles.root}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const Routes = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <HomeScreen />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colorPallete.primary,
  },
});

export default App;
