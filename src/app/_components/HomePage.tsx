import { UpComingMovies } from "./HomeMovies/UpComingMovies";
import { PopularMovies } from "./HomeMovies/PopularMovies";
import { TopRatedMovies } from "./HomeMovies/TopRatedMovies";
import { CarouselPlugin } from "./Hero/Hero";



export default async function HomePage() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <CarouselPlugin />

        <UpComingMovies />

        <PopularMovies />

        <TopRatedMovies />
      </div>
    </div>
  );
}
