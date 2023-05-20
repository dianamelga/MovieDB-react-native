import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import commonStyles from "../theme/commonStyles";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const defaultProps: Partial<Props> = {
  style: {},
};

const Card: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={!props.onPress}
      style={[props.style, styles.cardContainer]}
    >
      {props.children}
    </TouchableOpacity>
  );
};

Card.defaultProps = defaultProps;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.darkerGray,
    borderRadius: 8,
    elevation: 5,
    ...commonStyles.shadow,
  },
});

export default Card;
