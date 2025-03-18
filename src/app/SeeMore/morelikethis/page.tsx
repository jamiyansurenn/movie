import Link from "next/link";
import Image from "next/image";
import TOKEN from "@/app/utils/constants";
import { MovieTypes } from "@/app/utils/type";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default async function page5({
  params: { morelike },
}: {
  params: { morelike: string };
}) {
  const MoreThisLike = await fetch(
    `https://api.themoviedb.org/3/movie/${morelike}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,

        "Content-Type": "application/json",
      },
    }
  );

  const MoreThis = await MoreThisLike.json();

  console.log(MoreThis);

  return (
    <div className=" flex flex-col items-center justify-center mt-8 w-[1260px] h-[900px]">
      <div className="w-[1090px] h-14 mb-4">
        <p className="text-[24px]">More Like This</p>
      </div>

      <div className="flex gap-5 ml-[70px] flex-wrap items-center justify-center w-full">
        {MoreThis.results

          ?.slice(0, 10)

          .map((movie: MovieTypes, index: number) => {
            return (
              <Link key={index} href={`/${movie.id}`}>
                <div className="rounded-[8px] overflow-hidden w-[225px] h-[430px] flex flex-col items-start cursor-pointer">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    alt={`Poster of ${movie?.original_title}`}
                    width={500}
                    height={750}
                  />

                  <div className="bg-secondary flex p-2 flex-col items-start self-stretch h-[100px]">
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

      <Pagination className="ml-[495px] mt-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
