"use server";

import { FunctionResponse } from "@/types/types";

import signinAccount from "./signinAccount";
import { hashPassword } from "@/utils/verifyPassword";

import createApolloClient from "@/config/apolloClient";
import { Create_User } from "@/mutation/createMutation";
import { Publish_User } from "@/mutation/publishMutation";

const signupAccount = async (
  email: string,
  password: string
): Promise<FunctionResponse> => {
  try {
    const client = createApolloClient();

    const newPassword = await hashPassword(password);
    if (!newPassword) throw new Error("server error");

    const { data: createUser } = await client.mutate({
      mutation: Create_User,
      variables: { email, password: newPassword, role: "USER" },
    });
    if (!createUser?.createMyUser.id) throw new Error("server error");

    const { data: publishUser } = await client.mutate({
      mutation: Publish_User,
      variables: { id: createUser.createMyUser.id },
    });
    if (!publishUser?.publishMyUser.email) throw new Error("server error");

    if (publishUser?.publishMyUser.email) {
      const successSignup = await signinAccount(
        publishUser.publishMyUser.email,
        password
      );

      if (successSignup.message) return { message: successSignup.message };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred in login" };
};

export default signupAccount;
