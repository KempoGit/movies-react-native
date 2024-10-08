import { HttpAdapter } from "../../../config/adapters/http/http.adapter"
import { MovieGenericResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

export const moviesUpcomingUseCase = async ( fetcher: HttpAdapter ): Promise<Movie[]> => {

    try {
        const upcoming = await fetcher.get<MovieGenericResponse>('/upcoming');
        
        return upcoming.results.map( MovieMapper.fromMovieDBResultToEntity );
    } catch (error) {
        throw new Error('Error fetching upcoming');
    }

};
