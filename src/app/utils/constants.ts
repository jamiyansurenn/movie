export const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWUyNDFjZjExZThhODI3YTVlOWE1NTY2NDhlNDUwMCIsIm5iZiI6MTc0MTU3Nzc5OC4xNDksInN1YiI6IjY3Y2U1ZTQ2Mjc5NGIwZDU5ODJhYTU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.81M5rUjcU9bibEoNjOS0ThWTnk05hvgKkXbWAfm4Hc4"

export const BaseURL = "https://api.themoviedb.org/3/discover/movie"

export const ConImg = "https://image.tmdb.org/t/p/"

const Option = {
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    },
};
export default Option;