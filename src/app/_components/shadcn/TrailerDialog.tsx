import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TOKEN from "../../utils/constants";

export const TrailerDialog = async ({ movieId }: { movieId: number }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,

    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,

        "Content-Type": "application/json",
      },
    }
  );

  const comeTrailer = await response.json();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="absolute top-[400px] left-[155px]"
            variant="outline"
          >
            watch trailer
          </Button>
        </DialogTrigger>

        <DialogTitle hidden></DialogTitle>

        <DialogContent>
          <iframe
            src={`https://www.youtube.com/embed/${comeTrailer.results[0].key}`}
            width={520}
            height={280}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={comeTrailer.results[0].name}
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
      ;
    </>
  );
};
