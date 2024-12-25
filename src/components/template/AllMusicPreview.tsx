import Link from "next/link";

import { GetMusicProps } from "@/types/types";

import MusicCard from "../module/MusicCard";

import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

function AllMusicPreview({ musics }: GetMusicProps) {
  const sortedMusics = [...musics].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const selectedMusics = sortedMusics.slice(0, 4);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2 p-2 border border-stroke rounded-md">
        <div className="w-full flex items-start">
          <h2 className="capitalize font-semibold text-lg tracking-wider border-b-2 border-primary mb-2">
            newest
          </h2>
        </div>

        <div className="w-full flex flex-col items-center justify-start gap-2 md:flex-row md:flex-wrap md:justify-between">
          {selectedMusics.map((item) => (
            <div
              key={item.id}
              className="w-full h-20 flex items-center shadow-md md:w-[calc(50%-4px)] bg-secondary rounded pr-1"
            >
              <MusicCard
                name={item.name}
                artist={item.artist}
                url={item.url}
                category={item.category}
                language={item.language}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end mt-2">
          <Link href="/all-musics">
            <Button variant="outline">
              All Musics <MoveRight />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AllMusicPreview;