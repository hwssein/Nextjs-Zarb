"use server";

import { FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Create_Music, Create_Upload_Music_Url } from "@/graphql/mutation";

import findUser from "./findUser";

const saveMusic = async (formData: FormData): Promise<FunctionResponse> => {
  try {
    const name = formData.get("name") as string;
    const artist = (formData.get("artist") as string) || null;
    const url = (formData.get("url") as string) || null;
    const mp3File = (formData.get("mp3File") as File) || null;
    const category = formData.get("category") as string;
    const language = (formData.get("language") as string) || null;

    if (!name && (!url || !mp3File) && !category)
      throw new Error("please fill in the fields.");

    const user = await findUser();
    if ("error" in user) throw new Error("please login to your account");

    const client = createApolloClient();

    if (mp3File && !url) {
      const { data: urlMusicData } = await client.mutate({
        mutation: Create_Upload_Music_Url,
        variables: { fileName: mp3File.name },
      });

      const uploadUrl = urlMusicData.createAsset.upload.requestPostData.url;
      const uploadDate = urlMusicData.createAsset.upload.requestPostData.date;
      const uploadKey = urlMusicData.createAsset.upload.requestPostData.key;
      const uploadSignature =
        urlMusicData.createAsset.upload.requestPostData.signature;
      const uploadAlgorithm =
        urlMusicData.createAsset.upload.requestPostData.algorithm;
      const uploadPolicy =
        urlMusicData.createAsset.upload.requestPostData.policy;
      const uploadCredential =
        urlMusicData.createAsset.upload.requestPostData.credential;
      const uploadSecurityToken =
        urlMusicData.createAsset.upload.requestPostData.securityToken;

      const uploadFormData = new FormData();

      uploadFormData.append("X-Amz-Date", uploadDate);
      uploadFormData.append("key", uploadKey);
      uploadFormData.append("X-Amz-Signature", uploadSignature);
      uploadFormData.append("X-Amz-Algorithm", uploadAlgorithm);
      uploadFormData.append("policy", uploadPolicy);
      uploadFormData.append("X-Amz-Credential", uploadCredential);
      uploadFormData.append("X-Amz-Security-Token", uploadSecurityToken);
      uploadFormData.append("file", mp3File);

      const uploadAsset = await fetch(uploadUrl, {
        method: "POST",
        body: uploadFormData,
      });

      if (uploadAsset.status !== 204 || "error" in uploadAsset || !uploadAsset)
        throw new Error("there was a problem uploading the file");

      const { data: createMusicFileAndData } = await client.mutate({
        mutation: Create_Music,
        variables: {
          name,
          artist,
          url: urlMusicData.createAsset.url,
          category,
          language,
          id: user?.id,
        },
      });
      if (!createMusicFileAndData.createMusic.id)
        throw new Error("server error");

      return { message: "music saved successfully " };
    } else {
      const { data: createMusicData } = await client.mutate({
        mutation: Create_Music,
        variables: { name, artist, url, category, language, id: user?.id },
      });

      if (!createMusicData.createMusic.id) throw new Error("server error");

      return { message: "music saved successfully " };
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
