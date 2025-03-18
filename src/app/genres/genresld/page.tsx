
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GenreType, PageType } from "@/app/utils/type";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Option, { BaseURL, ConImg } from "@/app/utils/constants";
export default function ToggleGroupDemo() {
    const [movies, setMovies] = React.useState<{
        page: number;
        total_results: number;
        results: PageType[];
        total_pages: number;
    } | null>(null);
    const [genres, setGenres] = React.useState<GenreType[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = Number(searchParams.get("page") || "1");
    const genrelds = searchParams.get("genreIds");
    React.useEffect(() => {
        const getDatas = async () => {
            const datas = await fetch(
                `${BaseURL}/discover/movie?language=en&with_genres=${genrelds}&page=${page}`,
                Option
            );
            const data = await datas.json();
            setMovies(data || []);
            console.log("Movies:", data);
        };
        getDatas();
    }, [genrelds, page]);
    React.useEffect(() => {
        const getDatass = async () => {
            const responses = await fetch(
                `${BaseURL}/genre/movie/list?language=en`,
                Option
            );
            const dataGenre = await responses.json();
            setGenres(dataGenre.genres || []);
        };
        getDatass();
    }, []);
    const clickHandler = (newGenreIds: string[]) => {
        console.log("newGenre", newGenreIds);
        router.push(`?page=${page}&genreIds=${newGenreIds}`);
    };
    // Calculate page range for pagination (show 3 pages before and after the current page)
    const getPaginationRange = () => {
        const totalPages = movies?.total_pages || 0;
        const range = [];
        let startPage = Math.max(page - 3, 1);
        let endPage = Math.min(page + 3, totalPages);
        // Adding the pages before the current page
        if (startPage > 1) range.push(1);
        // Add pages in the middle
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }
        // Adding the pages after the current page
        if (endPage < totalPages) range.push(totalPages);
        return range;
    };
    return (
        <div className="w-[1440px] h-full flex flex-col items-center z-10  mt-5">
            <div className="w-[1280px] h-full flex flex-col items-start gap-8">
                <p className="text-secondary-foreground text-[30px] normal font-semibold ">
                    Search filter
                </p>
                <div className="flex items-start self-stretch gap-1 h-full">
                    <div className="w-[387px] flex flex-col items-start gap-5 text-secondary-foreground sticky top-[100px]">
                        <div className="w-[213px] flex flex-col items-start gap-1">
                            <p className="text-[24px] normal font-semibold">Genres</p>
                            <p className="text-[16px] normal font-normal ">
                                See lists of movies by genre
                            </p>
                        </div>
                        <ToggleGroup
                            onValueChange={clickHandler}
                            type="multiple"
                            className="flex flex-wrap justify-start mt-[20px] gap-[16px]"
                        >
                            {genres?.map((genre: GenreType, index: number) => (
                                <ToggleGroupItem
                                    key={genre.id}
                                    value={genre.id.toString()}
                                    aria-label="Toggle bold"
                                    variant={"outline"}
                                    className="h-auto rounded-full text-[12px] px-[10px]"
                                >
                                    {genre.name}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <div className="w-[2px] h-[1830px] flex flex-col py-4 gap-[10px] self-stretch ml-8 mr-4 bg-secondary"></div>
                    <div className="w-[806px] flex flex-col items-start gap-8 h-full">
                        <h1 className="flex  items-start gap-4 text-[20px] font-medium ">
                            {movies?.total_results} titles in{" "}
                            {genres
                                .filter((genre: GenreType) => genre.id.toString() == genrelds)
                                .map((genre: GenreType, index: number) => (
                                    <p key={index}>&quot;{genre.name}&quot;</p>
                                ))}
                        </h1>
                        <div className="w-[806px] h-full flex flex-wrap items-start self-stretch gap-8">
                            {movies?.results.map((movie: PageType, index: number) => {
                                return (
                                    <Link key={movie.id} href={`/catagory/${movie.id}`}>
                                        <div className="rounded-[8px] overflow-hidden w-[165px] h-[330px] flex flex-col items-start cursor-pointer">
                                            {/* <Image
                                                src={`${ConImg}original/${movie?.poster_path}`}
                                                alt={`Poster of ${movie?.original_title}`}
                                                width={500}
                                                height={750}
                                            /> */}
                                            <img src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                                            alt={`Poster of ${movie?.original_title}`}
                                            />
                                            <div className="bg-secondary flex p-2 flex-col items-start self-stretch h-full">
                                                <div className="flex gap-[2px] items-center">
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
                                                        <span className="text-[#71717a] text-[12px]">
                                                            /10
                                                        </span>
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
                </div>
            </div>
        </div>
    )
}
