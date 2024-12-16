"use server";

import { revalidatePath } from "next/cache";

import { FunctionResponse } from "@/types/types";

import { Delete_Music_Asset, Delete_User_Music } from "@/graphql/mutation";
import createApolloClient from "@/config/apolloClient";
import findUser from "./findUser";

const deleteMusic = async (
  id: string,
  assetId: string
): Promise<FunctionResponse> => {
  try {
    const user = await findUser();
    if ("error" in user) throw new Error("please login to your account");

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
