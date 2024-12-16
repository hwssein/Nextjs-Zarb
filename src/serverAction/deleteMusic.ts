"use server";

import { revalidatePath } from "next/cache";

import { FunctionResponse } from "@/types/types";

import { Delete_User_Music } from "@/graphql/mutation";
import createApolloClient from "@/config/apolloClient";
import findUser from "./findUser";

const deleteMusic = async (id: string): Promise<FunctionResponse> => {
  try {
    const user = await findUser();
    if ("error" in user) throw new Error("please login to your account");

    const client = createApolloClient();

    const { data } = await client.mutate({
      mutation: Delete_User_Music,
      variables: { id },
    });
    if (!data.deleteMusic.name || !data || "error" in data)
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
