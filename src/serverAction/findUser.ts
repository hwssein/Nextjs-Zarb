"use server";

import { FindExistingUserProps, UserInfo } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_Existing_User } from "@/graphql/query";
import checkSession from "./checkSession";

const findUser = async (): Promise<UserInfo | { error: string }> => {
  try {
    const session = await checkSession();
    if ("error" in session) throw new Error("Please Login to your account");

    const client = createApolloClient();

    const { data } = await client.query<FindExistingUserProps>({
      query: Get_Existing_User,
      variables: { email: session.email },
    });
    if (data.myUsers.length === 0)
      throw new Error("Please Login to your account");

    return {
      email: data.myUsers[0].email,
      id: data.myUsers[0].id,
      role: data.myUsers[0].role,
      createdAt: data.myUsers[0].createdAt,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default findUser;
