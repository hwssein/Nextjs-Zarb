"use client";

import ReactPlayer from "react-player";
import { Button } from "../ui/button";

function MusicPlayer({
  url,
  isPlay,
  setIsPlay,
}: {
  url: string;
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {isPlay && (
        <div className="w-full p-1 h-full flex items-center justify-center gap-1 bg-secondary rounded-md">
          <ReactPlayer
            onPause={() => setIsPlay(false)}
            url={url}
            controls={true}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                },
                forceAudio: true,
              },
            }}
            width="100%"
            height="50px"
          />
          <Button size="sm" variant="outline" onClick={() => setIsPlay(false)}>
            Close
          </Button>
        </div>
      )}
    </>
  );
}

export default MusicPlayer;
