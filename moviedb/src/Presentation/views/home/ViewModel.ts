import { useState } from "react";
import { AxiosError } from "axios";

import { MovieUseCaseImpl } from "../../../Domain/use-cases/MovieUseCaseImpl";
import { MediaItem } from "../../../Domain/entities/MediaItem";
import { DEFAULT_LANGUAGE } from "../../../Data/sources/remote/api/constants";

const movieUseCase = new MovieUseCaseImpl();

type InitialStateProp = {
  upcoming: MediaItem[];
  trending: MediaItem[];
  recommended: MediaItem[];
};

const initialState: InitialStateProp = {
  upcoming: [],
  trending: [],
  recommended: [],
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

      setState({
        upcoming: upcoming.results,
        trending: trending.results,
        recommended: recommended.results,
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
