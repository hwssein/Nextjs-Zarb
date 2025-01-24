"use client";

import { useRef, useState } from "react";

import ReactPlayer from "react-player";
import RangeProgress from "../ui/RangeProgress";

import { SkipForward } from "lucide-react";
import { SkipBack } from "lucide-react";
import { Play } from "lucide-react";
import { Pause } from "lucide-react";

function MusicPlayer({ musicUrls }: { musicUrls: string[] }) {
  const [playlist] = useState<Array<string>>(musicUrls);
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [progressSeconds, setProgressSeconds] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const playerRef = useRef<ReactPlayer | null>(null);

  const nextHandler = () => {
    const newIndex = (currentMusic + 1) % playlist.length;
    setCurrentMusic(newIndex);
  };

  const prevHandler = () => {
    const newIndex = (currentMusic - 1 + playlist.length) % playlist.length;
    setCurrentMusic(newIndex);
  };

  const seekHandler = (newProgress: number) => {
    if (playerRef.current) {
      const seekTime = (newProgress / 100) * totalDuration;
      playerRef.current.seekTo(seekTime, "seconds");
      setProgressPercentage(newProgress);
      setProgressSeconds(seekTime);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      <ReactPlayer
        ref={playerRef}
        url={playlist[currentMusic]}
        style={{ display: "none" }}
        width="0"
        height="0"
        playing={isPlaying}
        onDuration={(duration) => setTotalDuration(duration)}
        onProgress={(progress) => {
          setProgressPercentage(progress.played * 100);
          setProgressSeconds(progress.playedSeconds);
        }}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
              disablePictureInPicture: true,
            },
            forceAudio: true,
          },
        }}
      />

      <div className="w-full flex items-center justify-center gap-2">
        <span>{formatTime(progressSeconds)}</span>

        <RangeProgress
          value={progressPercentage}
          onValueChange={seekHandler}
          className="w-full bg-secondary cursor-pointer"
        />

        <span>{formatTime(totalDuration)}</span>
      </div>

      <div className="w-full flex items-start justify-between gap-2 px-4 sm:w-1/2">
        <span
          onClick={prevHandler}
          className="p-1 cursor-pointer rounded-md transition-all ease-in duration-100 hover:bg-secondary"
        >
          <SkipBack />
        </span>

        {isPlaying ? (
          <span
            onClick={() => setIsPlaying(false)}
            className="p-1 cursor-pointer rounded-md transition-all ease-in duration-100 hover:bg-secondary"
          >
            <Pause />
          </span>
        ) : (
          <span
            onClick={() => setIsPlaying(true)}
            className="p-1 cursor-pointer rounded-md transition-all ease-in duration-100 hover:bg-secondary"
          >
            <Play />
          </span>
        )}

        <span
          onClick={nextHandler}
          className="p-1 cursor-pointer rounded-md transition-all ease-in duration-100 hover:bg-secondary"
        >
          <SkipForward />
        </span>
      </div>
    </div>
  );
}

export default MusicPlayer;
