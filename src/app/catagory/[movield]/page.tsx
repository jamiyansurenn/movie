import Option, { BaseURL, ConImg } from "@/app/utils/constants";
import formatVoteAverage from "@/app/utils/vote";
import { MovieTypes, Trailer } from "@/app/utils/type";
import formatVoteAverage2 from "@/app/utils/vote";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
 
export default async function Page1({
    params: { movieId },
}: {
    params: { movieId: string };
}) {
    const response = await fetch(
        `${BaseURL}/movie/${movieId}?language=en-US`,
        Option
    );
    const data: MovieTypes = await response.json();
    console.log(data)
 
    const responseStar = await fetch(
        `${BaseURL}/movie/${movieId}/credits?language=en-US`,
        Option
    );
    const dataStar = await responseStar.json();
 
    const responseTrailer = await fetch(
        `${BaseURL}/movie/${movieId}/videos?language=en-US`,
        Option
    );
    const dataTrailer = await responseTrailer.json();
 
    const moreThisLike = await fetch(
        `${BaseURL}/movie/${movieId}/similar?language=en-US&page=1`,
        Option
    );
    const moreThis = await moreThisLike.json();
 
    const trailers = await fetch(
        `${BaseURL}/movie/${movieId}/videos?language=en-US`,
        Option
    );
    const comeTrailer = await trailers.json();
 
    return (
        <div className="w-[1080px] z-10">
            <div className="mt-8">
                <h1>{data.title}</h1>
                {/* <Image
                    src={`${ConImg}w500${data.poster_path}`}
                    alt={data.title}
                    width={500}
                    height={750}
                /> */}
                <img
                src={`${ConImg}w500${data.poster_path}`}
                alt={data.title}
                />
                <p>{data.overview}</p>
                <p>Vote Average: {formatVoteAverage(data.vote_average)}</p>
                <p>Vote Count: {data.vote_count}</p>
                <p>Release Date: {data.release_date}</p>
                <p>Popularity: {data.popularity}</p>
                <p>Original Language: {data.original_language}</p>
                {data.genre_ids && <p>Genres: {data.genre_ids.join(", ")}</p> }
                <div>
                    <h2>Trailers</h2>
                    {dataTrailer.results && dataTrailer.results.map((trailer: Trailer) => (
                        <div key={trailer.id}>
                            <h3>{trailer.name}</h3>
                            <p>Site: {trailer.site}</p>
                            <p>Official: {trailer.official ? "Yes" : "No"}</p>
                            <p>Size: {trailer.size}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>More Like This</h2>
                    {moreThis.results && moreThis.results.map((movie: MovieTypes) => (
                        <div key={movie.id}>
                            <Link href={`/catagory/${movie.id}`}>
                                <div className="cursor-pointer">
                                    {/* <Image
                                        src={`${ConImg}w500${movie.poster_path}`}
                                        alt={movie.title}
                                        width={200}
                                        height={300}
                                    /> */}
                                    <img
                                    src={`${ConImg}w500${movie.poster_path}`}
                                    alt={movie.title}
                                    />
                                    <p>{movie.title}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}