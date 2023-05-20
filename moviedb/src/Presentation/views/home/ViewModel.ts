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
};

const initialState: InitialStateProp = {
  upcoming: [],
  trending: [],
  recommended: [],
  recommendedFilters: [],
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

  return {
    error,
    ...state,
    loadData,
  };
};

export default HomeViewModel;
