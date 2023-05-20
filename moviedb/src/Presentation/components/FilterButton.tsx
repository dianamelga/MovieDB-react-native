import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";
import commonStyles from "../theme/commonStyles";

type RoundedButtonProps = {
  title: string;
  onPress: (selected: boolean) => void;
};

const FilterButton: React.FC<RoundedButtonProps> = ({ title, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    onPress(isPressed);
  };

  const buttonColor = isPressed ? colors.white : colors.transparent;
  const textColor = isPressed ? colors.black : colors.white;
  const borderColor = isPressed ? colors.transparent : colors.lightGray;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor, borderColor: borderColor },
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 21,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "center",
    height: 34,
    width: 101,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: commonStyles.FONT_SIZE_TINY,
    textAlign: "center",
  },
});

export default FilterButton;
