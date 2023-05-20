import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, FlatList, ListRenderItem } from "react-native";
import SvgUri from "react-native-svg-uri";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

import MovieCard from "../../components/MovieCard";
import Screen from "../../components/Screen";
import commonStyles from "../../theme/commonStyles";
import { colors } from "../../theme/colors";
import { MediaItem } from "../../../Domain/entities/MediaItem";
import useViewModel from "./ViewModel";
import FilterButton from "../../components/FilterButton";
import { MediaItemFilter } from "../../../Domain/entities/MediaItemFilter";

type Props = {};

export const HomeScreen: React.FC<Props> = (props) => {
  const flatListRef = useRef<FlatList<MediaItem>>(null);
  const flatListFilterRef = useRef<FlatList<MediaItemFilter>>(null);
  const {
    loadData,
    error,
    upcoming,
    recommended,
    trending,
    recommendedFilters,
  } = useViewModel();
  useEffect(() => {
    loadData();
  }, []);

  const renderItem: ListRenderItem<MediaItem> = ({ item }) => {
    return <MovieCard mediaItem={item} onPress={() => {}} />;
  };

  const renderFilterItem: ListRenderItem<MediaItemFilter> = ({ item }) => {
    return (
      <FilterButton
        title={item.name}
        onPress={() => console.log("filter press -> ", item.name)}
      />
    );
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.logo}>
        <SvgUri
          source={require("../../../../assets/logo-marca.svg")}
          height={32}
          width={88}
        />
      </View>
      <View style={styles.firstSections}>
        <Text style={styles.title}>Upcoming</Text>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.id.toString()}
          data={upcoming}
          renderItem={renderItem}
        />
        <Text style={styles.title}>Trending</Text>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.id.toString()}
          data={trending}
          renderItem={renderItem}
        />
      </View>
      <Text style={styles.title}>Recommended for you</Text>
      <FlatList
        ref={flatListFilterRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.name}
        data={recommendedFilters}
        renderItem={renderFilterItem}
      />
      <FlatList
        ref={flatListRef}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id.toString()}
        data={recommended}
        renderItem={renderItem}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.paddingL,
  },
  firstSections: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
  },
  title: {
    fontSize: commonStyles.FONT_SIZE_REGULAR,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 1,
    alignSelf: "flex-start",
  },
  list: {
    paddingTop: 15,
  },
});
