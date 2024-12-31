"use server";

import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

import { FindExistingUserProps, FunctionResponse } from "@/types/types";

import createApolloClient from "@/config/apolloClient";

import { comparePassword } from "@/utils/verifyPassword";
import { Get_Existing_User } from "@/query/userQuery";

const signinAccount = async (
  email: string,
  password: string
): Promise<FunctionResponse> => {
  try {
    const client = createApolloClient();

    const { data } = await client.query<FindExistingUserProps>({
      query: Get_Existing_User,
      variables: { email },
    });
    if (data.myUsers.length === 0) throw new Error("this user does not exist");

    const isValidPassword = await comparePassword(
      password,
      data.myUsers[0].password
    );
    if (
      (typeof isValidPassword === "object" && "error" in isValidPassword) ||
      !isValidPassword
    )
      throw new Error("password is incorrect");

    const secretKey = process.env.SECRET_KEY as string;
    const token = sign({ email: data?.myUsers[0].email }, secretKey, {
      expiresIn: 24 * 60 * 60,
    });
    if (!token) throw new Error("server error");

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return { message: "successful login" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred in login" };
};

export default signinAccount;
