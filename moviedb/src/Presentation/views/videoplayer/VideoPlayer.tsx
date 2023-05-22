import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import YouTube from "react-native-youtube-iframe";
import { MediaStackParamsList } from "../detail/Detail";
import { colors } from "../../theme/colors";

type Props = StackScreenProps<MediaStackParamsList, "Video">;

export const VideoPlayerScreen: React.FC<Props> = ({ navigation, route }) => {
  const videoId = route?.params?.videoId;
  return (
    <View style={styles.container}>
      <YouTube
        videoId="d9MyW72ELq0"
        height={300}
        webViewStyle={{ width: "100%", height: 300 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.backgroundGradient,
  },
});
