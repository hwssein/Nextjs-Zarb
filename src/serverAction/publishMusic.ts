"use server";

import { revalidatePath } from "next/cache";

import { FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import {
  Publish_Music_For_View,
  Publish_User_music_Data,
} from "@/graphql/mutation";

import findUser from "./findUser";

const publishMusic = async (id: string): Promise<FunctionResponse> => {
  try {
    const user = await findUser();
    if ("error" in user || user.role !== "ADMIN")
      throw new Error("Unauthorized");

    const client = createApolloClient();

    const { data: musicValuePublish } = await client.mutate({
      mutation: Publish_Music_For_View,
      variables: { id },
    });
    if ("error" in musicValuePublish || musicValuePublish.error)
      throw new Error("server error");

    const { data: musicDataPublish } = await client.mutate({
      mutation: Publish_User_music_Data,
      variables: { id },
    });
    if ("error" in musicDataPublish || musicDataPublish.error)
      throw new Error("server error");

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
