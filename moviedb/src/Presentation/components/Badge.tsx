import React from "react";
import { StyleProp, ViewStyle, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import commonStyles from "../theme/commonStyles";
import { colors } from "../theme/colors";

type BadgeProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  showStarIcon?: boolean;
};

const Badge: React.FC<BadgeProps> = ({ title, style, showStarIcon }) => {
  return (
    <View style={[styles.root, style]}>
      {showStarIcon ? (
        <View style={{ paddingRight: 5 }}>
          <Ionicons name="star" size={14} color="black" />
        </View>
      ) : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: commonStyles.FONT_SIZE_TINY,
    color: colors.black,
  },
});

export default Badge;
