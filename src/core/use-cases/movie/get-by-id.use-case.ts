import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MoviesByIDResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie } from "../../entities/movie.entity";

export const getMovieByIdUseCase = async (fetcher: HttpAdapter, movieId: number): Promise<FullMovie> => {
    try {
        const movieById = await fetcher.get<MoviesByIDResponse>('/' + movieId);
        
        return MovieMapper.fromMovieDBToEntity(movieById);
    } catch (error) {
        throw new Error("Cannot get movie");
    }
}