"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import {
  Delete_Music_Asset,
  Delete_User_Music,
} from "@/mutation/deleteMutation";

const deleteMusic = async (
  id: string,
  assetId: string
): Promise<FunctionResponse> => {
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

    if (assetId !== "false") {
      const { data: deleteAsset } = await client.mutate({
        mutation: Delete_Music_Asset,
        variables: { id: assetId },
      });
      if (!deleteAsset.deleteAsset.id || !deleteAsset || "error" in deleteAsset)
        throw new Error("server error");
    }

    const { data: deleteMusic } = await client.mutate({
      mutation: Delete_User_Music,
      variables: { id },
    });
    if (!deleteMusic.deleteMusic.name || !deleteMusic || "error" in deleteMusic)
      throw new Error("server error");

    revalidatePath("/dashboard/added-music");
    revalidatePath("/");
    revalidatePath("/all-musics");
    return { message: "deleted successful" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { message: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default deleteMusic;
