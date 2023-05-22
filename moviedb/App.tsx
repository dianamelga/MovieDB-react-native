import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants from "expo-constants";

import { colorPallete } from "./src/Presentation/theme/colors";
import { SplashScreen } from "./src/Presentation/views/splash/Splash";
import { HomeScreen } from "./src/Presentation/views/home/Home";
import { DetailScreen } from "./src/Presentation/views/detail/Detail";

const Stack = createNativeStackNavigator();

const App = () => {
  const statusBarHeight = Constants.statusBarHeight || 0;
  const paddingTop = Platform.OS === "android" ? statusBarHeight : 0;

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <GestureHandlerRootView style={[styles.root, { paddingTop }]}>
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

  return showSplash ? (
    <SplashScreen />
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent", // Set the header background color to transparent
        },
        headerTransparent: true, // Make the header transparent
        headerTintColor: "white", // Set the color of the back button
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colorPallete.primary,
  },
});

export default App;
