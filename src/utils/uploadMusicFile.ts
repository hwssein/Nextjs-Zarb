"use server";

import { FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import {
  Create_Asset_Music_Url,
  Publish_User_music_Asset,
} from "@/graphql/mutation";

import createMusicData from "./createMusicData";

const uploadMusicFile = async (
  name: string,
  artist: string,
  mp3File: File,
  category: string,
  language: string,
  userId: string
): Promise<FunctionResponse> => {
  try {
    const client = createApolloClient();

    const { data: urlMusicAsset } = await client.mutate({
      mutation: Create_Asset_Music_Url,
      variables: { fileName: mp3File.name },
    });

    const assetUrl = urlMusicAsset.createAsset.upload.requestPostData.url;

    const assetDate = urlMusicAsset.createAsset.upload.requestPostData.date;

    const assetKey = urlMusicAsset.createAsset.upload.requestPostData.key;

    const assetSignature =
      urlMusicAsset.createAsset.upload.requestPostData.signature;

    const assetAlgorithm =
      urlMusicAsset.createAsset.upload.requestPostData.algorithm;

    const assetPolicy = urlMusicAsset.createAsset.upload.requestPostData.policy;

    const assetCredential =
      urlMusicAsset.createAsset.upload.requestPostData.credential;

    const assetSecurityToken =
      urlMusicAsset.createAsset.upload.requestPostData.securityToken;

    const assetFormData = new FormData();

    assetFormData.append("X-Amz-Date", assetDate);
    assetFormData.append("key", assetKey);
    assetFormData.append("X-Amz-Signature", assetSignature);
    assetFormData.append("X-Amz-Algorithm", assetAlgorithm);
    assetFormData.append("policy", assetPolicy);
    assetFormData.append("X-Amz-Credential", assetCredential);
    assetFormData.append("X-Amz-Security-Token", assetSecurityToken);
    assetFormData.append("file", mp3File);

    const uploadAsset = await fetch(assetUrl, {
      method: "POST",
      body: assetFormData,
    });

    if (uploadAsset.status !== 204 || "error" in uploadAsset || !uploadAsset)
      throw new Error("there was a problem uploading the file");

    const { data: publishMusicAsset } = await client.mutate({
      mutation: Publish_User_music_Asset,
      variables: { id: urlMusicAsset.createAsset.id },
    });
    if (!publishMusicAsset || !publishMusicAsset.publishAsset.id)
      throw new Error("server error");

    const createMusicDataResponse = await createMusicData(
      name,
      artist,
      urlMusicAsset.createAsset.url,
      category,
      language,
      userId,
      urlMusicAsset.createAsset.id
    );
    if ("error" in createMusicDataResponse)
      throw new Error(createMusicDataResponse.error);

    return { message: "music upload successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default uploadMusicFile;
