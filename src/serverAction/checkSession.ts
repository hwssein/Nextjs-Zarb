"use server";

import { cookies } from "next/headers";

import { CheckSessionResponse } from "@/types/types";

import { verifyToken } from "@/utils/verifyToken";

const checkSession = (): { error: string } | CheckSessionResponse => {
  try {
    const cookie = cookies();

    const token = cookie.get("token");
    if (!token) throw new Error("unauthorized");

    const verifiedToken = verifyToken(token.value);
    if (!verifiedToken) throw new Error("invalid token");

    return verifiedToken;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
  return { error: "an unexpected error occurred" };
};

export default checkSession;
