import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import Screen from "../../components/Screen";
import {
  MediaItem,
  genresFormatted,
  voteAverageFormatted,
  yearRelease,
} from "../../../Domain/entities/MediaItem";
import commonStyles from "../../theme/commonStyles";
import { colors } from "../../theme/colors";
import OutlinedButton from "../../components/OutlinedButton";
import Badge from "../../components/Badge";

export type MediaStackParamsList = {
  Home: {};
  Detail: { mediaItem: MediaItem };
};

type Props = StackScreenProps<MediaStackParamsList, "Detail">;

export const DetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const mediaItem = route?.params?.mediaItem ?? null;
  return (
    <Screen contentContainerStyle={styles.root}>
      <ImageBackground
        style={styles.image}
        source={{ uri: mediaItem?.posterUrl ?? "" }}
      >
        <LinearGradient
          colors={[colors.transparent, colors.black]}
          style={styles.gradient}
        >
          <ScrollView
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <Text style={styles.title}>{mediaItem?.title}</Text>
              <View style={styles.badgesContainer}>
                <Badge
                  style={styles.badges}
                  title={yearRelease(mediaItem?.releaseDate)}
                />
                <Badge
                  style={styles.badges}
                  title={mediaItem?.originalLanguage}
                />
                <Badge
                  style={[styles.badges, { backgroundColor: colors.yellow }]}
                  showStarIcon
                  title={voteAverageFormatted(mediaItem?.voteAverage)}
                />
              </View>
              <Text style={styles.genres}>
                {genresFormatted(mediaItem?.genres)}
              </Text>
              <OutlinedButton
                style={styles.watchTrailerButton}
                title="Watch trailer"
                onPress={() => console.log("press")}
              />
              <Text style={styles.description}>{mediaItem?.overview}</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    marginTop: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flex: 1,
  },
  title: {
    fontSize: commonStyles.FONT_SIZE_LARGE,
    color: colors.white,
    textAlign: "center",
  },
  genres: {
    fontSize: commonStyles.FONT_SIZE_TINY,
    color: colors.white,
    textAlign: "center",
    marginTop: 16,
  },
  badges: {
    height: 28,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 8,
  },
  badgesContainer: { flexDirection: "row", marginTop: 16 },
  rating: {
    fontSize: commonStyles.FONT_SIZE_TINY,
  },
  watchTrailerButton: {
    width: 327,
    height: 46,
    marginTop: 24,
  },
  description: {
    fontSize: commonStyles.FONT_SIZE_TINY,
    color: colors.white,
    textAlign: "center",
    marginTop: 24,
  },
});
