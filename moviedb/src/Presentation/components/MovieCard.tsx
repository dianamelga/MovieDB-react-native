import React from "react";
import {
  View,
  Image,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

import Card from "./Card";
import { MediaItem } from "../../Domain/entities/MediaItem";

type MovieCardProps = {
  mediaItem: MediaItem;
  style?: StyleProp<ViewStyle>;
  onPress: (mediaItem: MediaItem) => void;
};

const MovieCard: React.FC<MovieCardProps> = ({ mediaItem, style, onPress }) => {
  return (
    <Card style={[style, styles.card]} onPress={() => onPress(mediaItem)}>
      <Image
        style={styles.image}
        source={{ uri: mediaItem?.posterUrl ?? "" }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 16,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default MovieCard;
