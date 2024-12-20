import { redirect } from "next/navigation";

import { MusicCategory, MusicLanguage } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_Unpublished_Music } from "@/graphql/query";

import findUser from "@/serverAction/findUser";
import AdminPage from "@/components/template/AdminPage";

interface Music {
  musics: [
    {
      id: string;
      name: string;
      artist: string;
      url: string;
      category: MusicCategory;
      language: MusicLanguage;
      assetId: string;
    }
  ];
}

async function Admin() {
  const user = await findUser();
  if ("error" in user) redirect("/login");

  const client = createApolloClient();
  const { data } = await client.query<Music>({
    query: Get_Unpublished_Music,
  });

  if ("musics" in data) {
    return (
      <>
        <AdminPage musics={data.musics} role={user.role} />
      </>
    );
  } else {
    return (
      <div className="w-full text-center bg-secondary py-4 px-2 rounded-md mt-4 mb-10">
        No Items Found
      </div>
    );
  }
}

export default Admin;
