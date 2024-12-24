import { GetMusicProps } from "@/types/types";

import AllMusicsPage from "@/components/template/AllMusicsPage";

import createApolloClient from "@/config/apolloClient";
import { Get_Published_Music } from "@/graphql/query";

async function AllMusics() {
  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Published_Music,
  });

  if ("musics" in data && data.musics.length > 0) {
    return (
      <>
        <AllMusicsPage musics={data?.musics} />
      </>
    );
  } else {
    return (
      <>
        <div className="w-full text-center bg-secondary py-4 px-2 rounded-md mt-4 mb-10">
          No Items Found
        </div>
      </>
    );
  }
}

export default AllMusics;
