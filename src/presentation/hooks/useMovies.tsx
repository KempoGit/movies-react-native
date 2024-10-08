import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {

    const [isLoading, setisLoading] = useState(true);
    const [nowPlaying, setnowPlaying] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);

    useEffect(() => {

      initialLoad();

    }, []);

    const initialLoad = async () => {

        const nowPlayingPromise = UseCases.moviesNoyPlayingUseCase(movieDBFetcher);
        const upcomingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher);
        const topRatedPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher);
        const popularPromise = UseCases.moviesPopularUseCase(movieDBFetcher);

        const [
          nowPlayingMovies,
          upcomingMovies,
          topRatedMovies,
          popularMovies,
        ] = await Promise.all([
            nowPlayingPromise,
            upcomingPromise,
            topRatedPromise,
            popularPromise,
        ]);

        setnowPlaying(nowPlayingMovies);
        setUpcoming(upcomingMovies);
        setTopRated(topRatedMovies);
        setPopular(popularMovies);

        setisLoading(false);

        // console.log({
        //   nowPlayingMovies,
        //   upcomingMovies,
        //   topRatedMovies,
        //   popularMovies,
        // });

    };

  return {
    isLoading,
    nowPlaying,
    upcoming,
    topRated,
    popular,

    // Methods
    popularNextPage: async() => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, {
        page: popularPageNumber,
      });

      setPopular( prev => [...prev, ...popularMovies]);
    },
  };
};
