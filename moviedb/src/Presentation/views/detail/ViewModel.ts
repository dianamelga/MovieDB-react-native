import { useState } from "react";
import { MovieUseCaseImpl } from "../../../Domain/use-cases/MovieUseCaseImpl";
import { AxiosError } from "axios";
import { DEFAULT_LANGUAGE } from "../../../Data/sources/remote/api/constants";

const movieUseCase = new MovieUseCaseImpl();

const DetailViewModel = () => {
  const [error, setError] = useState<AxiosError | null>(null);
  const [videoId, setVideoId] = useState("");

  const getVideoId = async (mediaItemId: number) => {
    try {
      const response = await movieUseCase.getMovieVideos(
        mediaItemId,
        DEFAULT_LANGUAGE
      );

      const youtubeId =
        response?.find((item) => {
          return (
            item.site.toLowerCase() === "youtube" &&
            item.type.toLowerCase() === "trailer" &&
            item.official
          );
        })?.id || "";

      setVideoId(youtubeId);
    } catch (err) {
      const e = err as AxiosError;
      setError(e);
      return Promise.reject(e);
    }
  };

  return { error, videoId, getVideoId };
};

export default DetailViewModel;
