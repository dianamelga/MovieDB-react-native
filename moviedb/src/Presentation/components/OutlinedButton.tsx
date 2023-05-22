import React from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { colors } from "../theme/colors";
import commonStyles from "../theme/commonStyles";

type OutlinedButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.watchTrailerButton, style]}>
        <Text style={styles.watchTrailerButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  watchTrailerButton: {
    borderRadius: 8,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  watchTrailerButtonText: {
    fontSize: commonStyles.FONT_SIZE_SMALL,
    fontWeight: "bold",
    color: colors.white,
  },
});

export default OutlinedButton;
