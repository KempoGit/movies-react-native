import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBCastResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { CastMapper } from '../../../infrastructure/mappers/cast.mapper';

export const getMovieCastUseCase = async (fetcher: HttpAdapter, movieId: number) => {
    try {
        const response = await fetcher.get<MovieDBCastResponse>('/' + movieId + '/credits');

        return response.cast.map( CastMapper.fromMovieDBCastToEntity );
    } catch (error) {
        throw new Error('Cannot get movie');
    }
};
