"use server";

import {
  FindExistingUserProps,
  FunctionResponse,
  LoginFormProps,
} from "@/types/types";

import signinAccount from "./signinAccount";
import signupAccount from "./signupAccount";

import createApolloClient from "@/config/apolloClient";
import { Get_Existing_User } from "@/query/userQuery";

const registerUser = async (
  form: LoginFormProps
): Promise<FunctionResponse> => {
  try {
    const { email, password } = form;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailRegexResult = emailRegex.test(email);

    if (!email || !password || !emailRegexResult) {
      throw new Error("invalid data");
    }

    if (password.length < 4)
      throw new Error("password should be more than 4 character");

    const client = createApolloClient();

    const { data } = await client.query<FindExistingUserProps>({
      query: Get_Existing_User,
      variables: { email },
    });

    if (data.myUsers.length === 0) {
      const signUp = await signupAccount(email, password);
      if (signUp.error) throw new Error("unable connect to server , try again");
    } else {
      const signin = await signinAccount(email, password);
      if (signin.error) throw new Error(signin.error);
    }

    return { message: "successful login" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred in login" };
};

export default registerUser;
