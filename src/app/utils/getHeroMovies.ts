import Option, { BaseURL } from "./constants";
export const getHeroMovies = async () => {
 try {
   const res = await fetch(
     `${BaseURL}/movie/now_playing?language=en-US&page=1`,
     Option
   );
   if (!res.ok) throw new Error("Failed to fetch movies");
   return res.json();
 } catch (error) {
   console.error("Error fetching movies:", error);
   return { results: [] };
 }
};
