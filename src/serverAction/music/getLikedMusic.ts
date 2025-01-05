"use server";

import { FunctionResponse, LikedMusicProps } from "@/types/types";
import { cookies } from "next/headers";

import createApolloClient from "@/config/apolloClient";
import { Get_Liked_Music } from "@/query/musicQuery";

const getLikedMusic = async (): Promise<FunctionResponse | LikedMusicProps> => {
  try {
    const cookie = cookies();
    const token = cookie.get("token")?.value;

    const res = await fetch(`${process.env.BASE_URL}/api/auth/find-user`, {
      method: "POST",
      body: JSON.stringify({ token: token || "" }),
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });
    const user = await res.json();

    if (user.error) throw new Error("please login to your account");

    const client = createApolloClient();

    const { data } = await client.query<LikedMusicProps>({
      query: Get_Liked_Music,
      variables: { userId: user.id },
    });
    if (data?.userVotes.length === 0) return { message: "no items found" };
    if (!data || "error" in data) throw new Error("server error");

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default getLikedMusic;
