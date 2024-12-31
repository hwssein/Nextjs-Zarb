import { redirect } from "next/navigation";

import { GetMusicProps } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_Unpublished_Music } from "@/query/musicQuery";

import findUser from "@/serverAction/auth/findUser";
import AdminPage from "@/components/template/AdminPage";

async function Admin() {
  const user = await findUser();
  if ("error" in user || user.role !== "ADMIN") redirect("/dashboard");

  const client = createApolloClient();
  const { data } = await client.query<GetMusicProps>({
    query: Get_Unpublished_Music,
  });

  if ("musics" in data && data.musics.length > 0) {
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
