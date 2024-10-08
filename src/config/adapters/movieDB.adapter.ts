import { THE_MOVIE_DB_KEY } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";

export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        // api_key: 'a2170a5177f73f91611ee11f33faf58a',
        api_key: THE_MOVIE_DB_KEY,
        language: 'es',
    },
});
