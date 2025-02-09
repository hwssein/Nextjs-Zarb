import { Suspense } from "react";
import { Metadata } from "next";

import { GetMusicProps } from "@/types/types";

import AllMusicsPage from "@/components/template/AllMusicsPage";
import {
  categoryFilter,
  languageFilter,
  searchFilter,
} from "@/utils/filterData";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/query/musicQuery";

import Loader from "@/components/element/animation/Loader";
import sessionRequest from "@/config/sessionRequest";

export const metadata: Metadata = {
  title: "ZARBBEAT | Power Your Workout with the Best Gym Beats - All Musics",
  description:
    "Unleash your full potential with Zarb Beat - the ultimate collection of high-energy gym music designed to power up your workouts. From intense training sessions to motivational beats, our playlist will keep you moving and crushing your fitness goals",
};

interface SearchParams {
  search?: string;
  category?: string;
  language?: string;
}
type SearchParamsProps = Promise<SearchParams>;

async function AllMusics(props: { searchParams: SearchParamsProps }) {
  const user = await sessionRequest();

  const searchParams = await props.searchParams;

  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
    fetchPolicy: "network-only",
  });

  if ("musics" in data && data.musics.length > 0) {
    let filteredData = searchFilter(data.musics, searchParams.search ?? "");
    filteredData = categoryFilter(filteredData, searchParams.category ?? "");
    filteredData = languageFilter(filteredData, searchParams.language ?? "");

    return (
      <>
        <Suspense fallback={<Loader />}>
          <AllMusicsPage musics={filteredData} role={user.role} />
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

export default AllMusics;
