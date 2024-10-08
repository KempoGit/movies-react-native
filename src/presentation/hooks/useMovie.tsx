import { useEffect, useState } from 'react';
import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { FullMovie } from '../../core/entities/movie.entity';
import { Cast } from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<FullMovie>();
    const [cast, setCast] = useState<Cast[]>([]);

    useEffect(() => {

        loadMovie();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId]);

    const loadMovie = async () => {
        setIsLoading(true);

        let moviePromise = await UseCases.getMovieByIdUseCase(movieDBFetcher, movieId);
        let castPromise = await UseCases.getMovieCastUseCase(movieDBFetcher, movieId);

        const [movieResponse, castResponse] = await Promise.all([moviePromise, castPromise]);

        setMovie(movieResponse);
        setCast(castResponse);
        setIsLoading(false);

    };

  return {
    isLoading,

    movie,
    cast,
  };
};
