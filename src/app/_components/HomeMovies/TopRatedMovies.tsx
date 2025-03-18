import Image from "next/image";
import { ACCESS_TOKEN } from "../../utils/constants";
import Link from "next/link";
import { MovieTypes } from "../../utils/type";

export const TopRatedMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,

    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,

        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const movies = data.results;
  return (
    <div>
      <div className="w-[1260px]">
        <div className="w-full h-[36px] mt-5 mb-5 flex justify-between items-start">
          <p className=" cursor-pointer text-[24px]">Top Rated</p>

          <button className="flex items-center justify-center gap-2">
            <Link href={"SeeMore/toprated"}>See more</Link>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />

              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className=" mx-auto  flex items-start content-start gap-8 self-stretch flex-wrap w-full max-w-[1290px] h-[910px] ">
        {movies.slice(0, 10).map((movie: MovieTypes, index: number) => {
          return (
            <Link href={`catagory/${movie.id}/`} key={index}>
              <div
                key={index}
                className="rounded-[8px] overflow-hidden w-[230px] h-[439px] flex flex-col items-start cursor-pointer"
              >
                {/* <Image
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={`Poster of ${movie?.original_title}`}
                  width={500}
                  height={650}
                /> */}
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={`Poster of ${movie?.original_title}`}
                />
                <div className="bg-secondary flex p-2 flex-col items-start self-stretch  h-full">
                  <div className="flex items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M7.99992 1.33325L10.0599 5.50659L14.6666 6.17992L11.3333 9.42659L12.1199 14.0133L7.99992 11.8466L3.87992 14.0133L4.66658 9.42659L1.33325 6.17992L5.93992 5.50659L7.99992 1.33325Z"
                        fill="yellow"
                        stroke="yellow"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p>
                      {movie?.vote_average.toFixed(1)}

                      <span className="text-[#71717a] text-[12px]">/10</span>
                    </p>
                  </div>

                  <p>{movie?.original_title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
