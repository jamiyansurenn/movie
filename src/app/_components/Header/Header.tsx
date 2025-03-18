import { PopoverDemo } from "@/app/_components/shadcn/popoverb";
import { ModeToggle } from "@/app/_components/shadcn/theme-toggle";
import InputS from "./Input";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="top-[0] z-50 fixed bg-background w-[100vw] flex justify-center">
      <div className="flex w-[1408px] ml-20 px-4 justify-between items-center flex-shrink-0 h-[59px]  ">
        <div className="w-[1280px] h-[36px] max-w-[1280px] flex justify-between items-center flex-shrink-0">
          <Link href={`../`}>
            <div className="flex gap-2 items-center w-[92px] h-5 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.83341 2.16675V18.8334M14.1667 2.16675V18.8334M1.66675 10.5001H18.3334M1.66675 6.33341H5.83341M1.66675 14.6667H5.83341M14.1667 14.6667H18.3334M14.1667 6.33341H18.3334M3.48341 2.16675H16.5167C17.5201 2.16675 18.3334 2.9801 18.3334 3.98341V17.0167C18.3334 18.0201 17.5201 18.8334 16.5167 18.8334H3.48341C2.4801 18.8334 1.66675 18.0201 1.66675 17.0167V3.98341C1.66675 2.9801 2.4801 2.16675 3.48341 2.16675Z"
                  stroke="#4338CA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className=" text-[16px] italic font-bold text-20px tracking-[0.32px] text-[#4338CA] ">
                Movie Z
              </p>
            </div>
          </Link>

          <div
            className="flex 

     gap-[12px] items-center text-secondary-foreground"
          >
            <PopoverDemo />

            <div className="flex justify-center items-center border-[0.1px] rounded-lg border-gray-600">
              <InputS />
            </div>
          </div>

          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
