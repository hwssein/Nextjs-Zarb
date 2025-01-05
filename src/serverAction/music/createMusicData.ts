"use server";

import { FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Create_Music } from "@/mutation/createMutation";
import { Publish_User_music_Data } from "@/mutation/publishMutation";
import { revalidatePath } from "next/cache";

const createMusicData = async (
  name: string,
  artist: string,
  url: string | null,
  category: string,
  language: string,
  userId: string,
  assetId: string
): Promise<FunctionResponse> => {
  try {
    const client = createApolloClient();

    const { data: createMusicData } = await client.mutate({
      mutation: Create_Music,
      variables: {
        name,
        artist,
        url,
        category,
        language,
        id: userId,
        assetId,
        published: false,
      },
    });
    if (!createMusicData.createMusic.id) throw new Error("server error");

    const { data: publishMusicData } = await client.mutate({
      mutation: Publish_User_music_Data,
      variables: { id: createMusicData.createMusic.id },
    });
    if (!publishMusicData.publishMusic.id) throw new Error("server error");

    revalidatePath("/admin");

    return { message: "music created successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default createMusicData;
