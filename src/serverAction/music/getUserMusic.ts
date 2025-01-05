"use server";

import { FunctionResponse, UserMusicInfo } from "@/types/types";
import { cookies } from "next/headers";

import createApolloClient from "@/config/apolloClient";
import { Get_User_Music } from "@/query/userQuery";

const getUserMusic = async (): Promise<FunctionResponse | UserMusicInfo> => {
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

    const { data: getUserMusicArray } = await client.query<UserMusicInfo>({
      query: Get_User_Music,
      variables: { id: user.id },
    });

    if (!getUserMusicArray || "error" in getUserMusicArray)
      throw new Error("server error");
    if (getUserMusicArray.myUser.music.length === 0)
      return { message: "no items found" };

    return getUserMusicArray;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred " };
};

export default getUserMusic;
