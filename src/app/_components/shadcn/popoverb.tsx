"use client";
import Option, { BaseURL } from "@/app/utils/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { MovieTypes, GenreType } from "@/app/utils/type";

export function PopoverDemo() {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState<GenreType[]>([]); // State for storing genres
  const [loading, setLoading] = useState(true); // State for loading status
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${BaseURL}/genre/movie/list?language=en`,
          Option
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();

  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onClick={() => setOpen(true)} // Open popover when clicked
      >
        <Button
          variant="outline"
          className="w-[99px] h-[39px] px-2 py-4 border-[1px] rounded-[6px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M4 6.5L8 10.5L12 6.5"
              stroke="#FAFAFA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[14px] normal font-medium text-20px">Genre</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild className="w-[577px] h-[auto] ml-[505px] mt-5">
        <div className="grid gap-4">
          <div className="space-y-2 border-solid border-b-stone-400 border-b-[1px] pb-[10px]">
            <h4 className="font-semibold text-2xl">Genres</h4>
            <p className="text-[15px]">See lists of movies by genre</p>
          </div>
          <div className="flex flex-wrap gap-[18px]">
            {loading ? (
              <p>Loading genres...</p>
            ) : (
              genres?.map((movie, index) => (
                <Link
                  key={index}
                  onClick={() => setOpen(false)}
                  href={`/genres/14?genreIds=${movie.id}`}
                >
                  <button className="flex items-center gap-[8px] text-xs rounded-[20px] border-solid border-slate-500 border-[0.2px] px-[10px] py-[2px] font-semibold">
                    {movie.name}
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
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
