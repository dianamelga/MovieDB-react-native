import { useState } from "react";
import { AxiosError } from "axios";

import { MovieUseCaseImpl } from "../../../Domain/use-cases/MovieUseCaseImpl";
import { MediaItem } from "../../../Domain/entities/MediaItem";
import { DEFAULT_LANGUAGE } from "../../../Data/sources/remote/api/constants";
import {
  MediaItemFilter,
  MediaItemFilterType,
} from "../../../Domain/entities/MediaItemFilter";

const movieUseCase = new MovieUseCaseImpl();

type InitialStateProp = {
  upcoming: MediaItem[];
  trending: MediaItem[];
  recommended: MediaItem[];
  recommendedFilters: MediaItemFilter[];
  filterSelected: Map<MediaItemFilterType, string | null>;
};

const initialState: InitialStateProp = {
  upcoming: [],
  trending: [],
  recommended: [],
  recommendedFilters: [],
  filterSelected: new Map(),
};
const HomeViewModel = () => {
  const [error, setError] = useState("");
  const [state, setState] = useState(initialState);

  const loadData = async () => {
    try {
      const [upcoming, trending, recommended] = await Promise.all([
        movieUseCase.getUpComingMovies(),
        movieUseCase.getTopRatedMovies(),
        movieUseCase.getRecommendedMovies(DEFAULT_LANGUAGE),
      ]);

      const recommendedFilters: MediaItemFilter[] = [
        {
          name: "in Spanish",
          type: MediaItemFilterType.LANGUAGE,
          filterValue: "es",
        },
        {
          name: "Released in 1993",
          type: MediaItemFilterType.YEAR_OF_RELEASE,
          filterValue: "1993",
        },
      ];

      setState({
        ...initialState,
        upcoming: upcoming.results,
        trending: trending.results,
        recommended: recommended.results,
        recommendedFilters: recommendedFilters,
      });
    } catch (err) {
      const e = err as AxiosError;
      setError(e.message);
    }
  };

  const filterRecommendedMovies = async (filter: MediaItemFilter) => {
    try {
      const newFilters = new Map(state.filterSelected);
      newFilters.set(filter.type, filter.filterValue);

      const yearOfRelease =
        Number(newFilters.get(MediaItemFilterType.YEAR_OF_RELEASE)) || null;

      const response = await movieUseCase.getRecommendedMovies(
        newFilters.get(MediaItemFilterType.LANGUAGE) ?? null,
        yearOfRelease
      );

      setState({
        ...state,
        recommended: response.results,
        filterSelected: newFilters,
      });
    } catch (err) {
      const e = err as AxiosError;
      setError(e.message);
    }
  };

  return {
    error,
    ...state,
    loadData,
    filterRecommendedMovies,
  };
};

export default HomeViewModel;
