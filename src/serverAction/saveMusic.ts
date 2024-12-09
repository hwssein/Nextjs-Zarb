"use server";

import { FunctionResponse, MusicFormProps } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Create_Music } from "@/graphql/mutation";

import findUser from "./findUser";

const saveMusic = async (form: MusicFormProps): Promise<FunctionResponse> => {
  try {
    const name = form.name;
    const artist = form.artist;
    const url = form.url;
    const category = form.category;
    const language = form.language;

    if (!name || !url || !category)
      throw new Error("please fill in the fields.");

    const user = await findUser();
    if ("error" in user) throw new Error("please login to your account");

    const client = createApolloClient();

    const { data } = await client.mutate({
      mutation: Create_Music,
      variables: { name, artist, url, category, language, id: user?.id },
    });

    if (!data.createMusic.id) throw new Error("server error");

    return { message: "music saved successfully " };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }

  return { error: "an unexpected error occurred " };
};

export default saveMusic;
