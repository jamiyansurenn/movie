"use client";

import { useState } from "react";
import { ArrowRight, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import Fetchdata from "../../utils/inputData";
import { MovieTypes } from "../../utils/type";
import "./Input.css";
import { ConImg } from "@/app/utils/constants";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();

    setSearchValue(search);

    if (search === "") {
      setSearchResults([]);

      return;
    }

    const searchData = await Fetchdata(
      `/search/movie?query=${e.target.value.toLowerCase()}&language=en-US`
    );

    console.log(searchData);

    setSearchResults(searchData.results || []);
  };

  const clearInput = () => {
    setSearchValue("");

    setSearchResults([]);
  };

  return (
    <div className="relative w-[381px]">
      <div className="absolute left-2.5 top-[10px] h-4 w-4 text-muted-foreground">
        <SearchIcon className="h-4 w-4" />
      </div>

      <Input
        id="search"
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={searchHandler}
        className="w-full h-[38px] rounded-lg bg-background py-3 pl-8 focus:outline-hidden flex items-center pt-3"
      />

      {searchResults.length > 0 ? (
        <div className="w-[577px] flex p-3 flex-col items-start rounded-[8px] border-[1px] border-[#27272a] bg-secondary opacity-95 absolute z-50  mt-2 ml-[-145px]">
          {searchResults

            ?.slice(0, 5)

            .map((movie: MovieTypes, index: number) => (
              <Link
                key={index}
                onClick={clearInput}
                href={`/catagory/${movie?.id}`}
              >
                <div className="gradient">
                  <Image
                    src={`${ConImg}original/${movie?.poster_path}`}
                    width={67}
                    height={100}
                    alt=""
                    className="rounded-[6px] cursor-pointer"
                  />

                  <div className="flex flex-col items-start gap-4 w-[100%]">
                    <h2 className="font-bold text-[20px]">
                      {movie?.original_title}
                    </h2>

                    <div className="flex items-center">
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

                      <div className="flex text-[14px] items-center">
                        <p className="font-semibold">
                          {movie?.vote_average.toFixed(1)}
                        </p>

                        <p className="text-[12px] text-[#71717A]">/10</p>
                      </div>
                    </div>

                    <div className="flex justify-between w-[100%]">
                      <p>{movie?.release_date}</p>

                      <div className="flex items-center gap-2 cursor-pointer pr-5">
                        <p className="hover:underline text-[14px]">See more</p>

                        <ArrowRight className="w-[16px]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[550px] h-[1.5px] my-1 bg-gray-700"></div>
              </Link>
            ))}

          <Link href={`/inputgenres/${searchValue}`}>
            <div
              onClick={clearInput}
              className="flex justify-center items-center gap-3"
            >
              <p>See all results for</p>
              &quot;{searchValue}&quot;
            </div>
          </Link>
        </div>
      ) : searchValue.length > 1 && searchResults.length === 0 ? (
        <div className="absolute mt-4 z-10 bg-secondary w-[400px] rounded-lg border-[1px] flex justify-center text-[13px] text-red-500 p-8">
          <p>&quot;Not Found&quot;</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchInput;
