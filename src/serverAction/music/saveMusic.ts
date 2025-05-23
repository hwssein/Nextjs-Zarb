"use server";

import { FunctionResponse } from "@/types/types";

import sessionRequest from "@/config/sessionRequest";
import createMusicData from "@/serverAction/music/createMusicData";

import uploadMusicFile from "./uploadMusicFile";

const saveMusic = async (formData: FormData): Promise<FunctionResponse> => {
  try {
    const name = formData.get("name") as string;
    const artist = formData.get("artist") as string;
    const url = (formData.get("url") as string) || null;
    const mp3File = (formData.get("mp3File") as File) || null;
    const category = formData.get("category") as string;
    const language = formData.get("language") as string;

    const urlCondition = url?.length !== 0 ? true : !!mp3File;

    if (!name || !artist || !category || !language || !urlCondition) {
      throw new Error("Please fill in all the required fields.");
    }

    const user = await sessionRequest();

    if (user.error) throw new Error("please login to your account");

    if (mp3File && !url) {
      const uploadAssetResponse = await uploadMusicFile(
        name,
        artist,
        mp3File,
        category,
        language,
        user.id
      );

      if ("error" in uploadAssetResponse)
        throw new Error(uploadAssetResponse.error);

      return { message: "music saved successfully" };
    } else {
      const createMusicResponse = await createMusicData(
        name,
        artist,
        url,
        category,
        language,
        user.id,
        "false"
      );
      if ("error" in createMusicResponse)
        throw new Error(createMusicResponse.error);

      return { message: "music saved successfully" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }

  return { error: "an unexpected error occurred " };
};

export default saveMusic;
