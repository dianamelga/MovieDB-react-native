import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../theme/colors";
import SvgUri from "react-native-svg-uri";
import Screen from "../../components/Screen";

type Props = {};

export const SplashScreen: React.FC<Props> = (props) => {
  useEffect(() => {
    // Side effect code here
  }, []);

  return (
    <Screen contentContainerStyle={styles.container}>
      <LinearGradient
        colors={[colors.backgroundGradient, colors.red]}
        style={styles.container}
      >
        <View style={styles.view}>
          <SvgUri
            source={require("../../../../assets/logo-marca.svg")}
            height={54}
            width={144}
          />
        </View>
      </LinearGradient>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
