import { Suspense } from "react";

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

interface SearchParams {
  searchParams: {
    search?: string;
    category?: string;
    language?: string;
  };
}

async function AllMusics({ searchParams }: SearchParams) {
  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
  });

  if ("musics" in data && data.musics.length > 0) {
    let filteredData = searchFilter(data.musics, searchParams.search ?? "");
    filteredData = categoryFilter(filteredData, searchParams.category ?? "");
    filteredData = languageFilter(filteredData, searchParams.language ?? "");

    return (
      <>
        <Suspense fallback={<Loader />}>
          <AllMusicsPage musics={filteredData} />
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
