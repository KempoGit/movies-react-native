import { HttpAdapter } from "../../../config/adapters/http/http.adapter"
import { MovieGenericResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number;
    limit?: number;
}

export const moviesPopularUseCase = async ( fetcher: HttpAdapter, options?: Options ): Promise<Movie[]> => {

    try {
        const popular = await fetcher.get<MovieGenericResponse>('/popular', {
            params: {
                page: options?.page,
            },
        });

        return popular.results.map( MovieMapper.fromMovieDBResultToEntity );
    } catch (error) {
        throw new Error('Error fetching popular');
    }

};
