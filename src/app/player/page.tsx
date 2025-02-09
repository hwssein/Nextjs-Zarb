import { Metadata } from "next";
import { Suspense } from "react";

import { GetMusicProps } from "@/types/types";

import PlayerPage from "@/components/template/PlayerPage";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/graphql/query/musicQuery";

import Loader from "@/components/element/animation/Loader";

export const metadata: Metadata = {
  title: "ZARBBEAT | Power Your Workout with the Best Gym Beats - Music Player",
  description:
    "Unleash your full potential with Zarb Beat - the ultimate collection of high-energy gym music designed to power up your workouts. From intense training sessions to motivational beats, our playlist will keep you moving and crushing your fitness goals",
};

async function Player() {
  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
    fetchPolicy: "cache-first",
  });

  if ("musics" in data && data.musics.length > 0) {
    return (
      <>
        <Suspense fallback={<Loader />}>
          <PlayerPage musics={data?.musics} />
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full text-center bg-secondary py-4 px-2 rounded-md mt-4 mb-10 capitalize">
          No music has been added yet
        </div>
      </>
    );
  }
}

export default Player;
