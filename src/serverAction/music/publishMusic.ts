"use server";

import { revalidatePath } from "next/cache";

import { FunctionResponse } from "@/types/types";

import sessionRequest from "@/config/sessionRequest";

import createApolloClient from "@/config/apolloClient";
import {
  Publish_Music_For_View,
  Publish_User_music_Asset,
  Publish_User_music_Data,
} from "@/mutation/publishMutation";

const publishMusic = async (
  id: string,
  assetId: string
): Promise<FunctionResponse> => {
  try {
    const user = await sessionRequest();

    if (user.error || user.role !== "ADMIN") throw new Error("Unauthorized");

    const client = createApolloClient();

    const { data: musicValuePublish } = await client.mutate({
      mutation: Publish_Music_For_View,
      variables: { id },
    });
    if ("error" in musicValuePublish || musicValuePublish.error)
      throw new Error("server error");

    const [publishMusicAsset, publishMusicData] = await Promise.all([
      client.mutate({
        mutation: Publish_User_music_Asset,
        variables: { assetId },
      }),

      client.mutate({
        mutation: Publish_User_music_Data,
        variables: { id },
      }),
    ]);

    const assetIdResult = publishMusicAsset?.data?.publishAsset?.id;
    const musicIdResult = publishMusicData?.data?.publishMusic?.id;

    if ((assetId !== "false" && !assetIdResult) || !musicIdResult) {
      throw new Error("server error");
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return { message: "published successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default publishMusic;
