import { FullMovie, Movie } from "../../core/entities/movie.entity";
import type { MoviesByIDResponse, Result } from "../interfaces/movie-db.responses";

export class MovieMapper {
    static fromMovieDBResultToEntity(result: Result): Movie {
        return {
            id: result.id,
            title: result.title,
            description: result.overview,
            releaseDate: new Date( result.release_date ),
            rating: result.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
        }
    }

    static fromMovieDBToEntity(response: MoviesByIDResponse): FullMovie {
        return {
            id: response.id,
            title: response.title,
            description: response.overview,
            releaseDate: new Date( response.release_date ),
            rating: response.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${response.backdrop_path}`,
            budget: response.budget,
            duration: response.runtime,
            genres: response.genres.map(gen => gen.name),
            originalTitle: response.original_title,
            productionCompanies: response.production_companies.map( comp => comp.name),
        };
    }
}
