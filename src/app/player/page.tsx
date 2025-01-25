import { Metadata } from "next";
import { Suspense } from "react";

import { GetMusicProps } from "@/types/types";

import PlayerPage from "@/components/template/PlayerPage";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/graphql/query/musicQuery";

import Loader from "@/components/element/animation/Loader";

export const metadata: Metadata = {
  title: "ZARB | Music Player",
  description: "Zarb Music Player For Build Your Body",
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
