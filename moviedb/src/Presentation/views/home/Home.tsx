import React, { ReactNode, useEffect, useRef } from "react";
import { View, StyleSheet, Text, FlatList, ListRenderItem } from "react-native";
import SvgUri from "react-native-svg-uri";

import MovieCard from "../../components/MovieCard";
import Screen from "../../components/Screen";
import commonStyles from "../../theme/commonStyles";
import { colors } from "../../theme/colors";
import { MediaItem } from "../../../Domain/entities/MediaItem";
import useViewModel from "./ViewModel";
import FilterButton from "../../components/FilterButton";
import { MediaItemFilter } from "../../../Domain/entities/MediaItemFilter";
import GridList from "../../components/GridList";
import { MediaStackParamsList } from "../detail/Detail";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<MediaStackParamsList, "Home">;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const flatListRef = useRef<FlatList<MediaItem>>(null);
  const flatListFilterRef = useRef<FlatList<MediaItemFilter>>(null);
  const {
    loadData,
    error,
    upcoming,
    recommended,
    trending,
    recommendedFilters,
    filterSelected,
    filterRecommendedMovies,
  } = useViewModel();
  useEffect(() => {
    loadData();
  }, []);

  const onMovieClick = (item: MediaItem) => {
    navigation.navigate("Detail", { mediaItem: item });
  };

  const renderItem: ListRenderItem<MediaItem> = ({ item }) => {
    return (
      <MovieCard
        style={styles.listItem}
        mediaItem={item}
        onPress={onMovieClick}
      />
    );
  };

  const renderGridItem = (item: MediaItem): ReactNode => {
    return (
      <MovieCard
        style={styles.gridItem}
        mediaItem={item}
        onPress={onMovieClick}
      />
    );
  };

  const renderFilterItem: ListRenderItem<MediaItemFilter> = ({ item }) => {
    return (
      <FilterButton
        title={item.name}
        isSelected={(filterSelected.get(item.type) ?? null) !== null}
        onPress={(isSelected) => {
          if (isSelected) {
            filterRecommendedMovies(item);
          } else {
            filterRecommendedMovies({ ...item, filterValue: null });
          }
        }}
      />
    );
  };

  return (
    <Screen contentContainerStyle={styles.container} scrollable>
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
          initialNumToRender={20}
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
          initialNumToRender={20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.id.toString()}
          data={trending}
          renderItem={renderItem}
        />
        <Text style={styles.title}>Recommended for you</Text>
        <FlatList
          ref={flatListFilterRef}
          horizontal
          initialNumToRender={20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          keyExtractor={(item) => item.name}
          data={recommendedFilters}
          renderItem={renderFilterItem}
        />
      </View>
      <View style={styles.spacer} />
      <GridList
        rowsCount={2}
        data={recommended.map((item) => renderGridItem(item))}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.paddingL,
  },
  firstSections: {
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
  filterList: {
    paddingTop: 15,
    justifyContent: "flex-start",
  },
  listItem: {
    width: 138,
    height: 180,
  },
  gridItem: {
    height: 205,
    width: 156,
  },
  spacer: {
    marginVertical: 5,
  },
});
