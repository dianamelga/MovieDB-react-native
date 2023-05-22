import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { ReactNode } from "react";
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { colorPallete, colors } from "../theme/colors";

type Props = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  contentContainerStyle: StyleProp<ViewStyle>;
  scrollable?: boolean;
};

const Screen: React.FC<Props> = (props) => (
  <SafeAreaView {...props} style={[styles.container, props.style]}>
    {props.scrollable ? (
      <KeyboardAwareScrollView
        children={props.children}
        contentContainerStyle={props.contentContainerStyle}
      />
    ) : (
      <View style={props.contentContainerStyle} children={props.children} />
    )}
  </SafeAreaView>
);

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPallete.primary,
  },
});
