import { NextResponse } from "next/server";

import { FindExistingUserProps, LoginFormProps } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_Existing_User } from "@/graphql/query/userQuery";

export async function POST(req: Request) {
  try {
    const { email, password }: LoginFormProps = await req.json();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailRegexResult = emailRegex.test(email);

    if (!email || !password || !emailRegexResult) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    if (password.length < 4) {
      return NextResponse.json(
        { error: "Password should be more than 4 characters" },
        { status: 400 }
      );
    }

    const client = createApolloClient();

    const { data } = await client.query<FindExistingUserProps>({
      query: Get_Existing_User,
      variables: { email },
    });

    if (data.myUsers.length === 0) {
      const signupUserResponse = await fetch(
        `${process.env.BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );
      const signupUserData = await signupUserResponse.json();

      if ("error" in signupUserData)
        return NextResponse.json(
          { error: signupUserData.error },
          { status: signupUserResponse.status }
        );

      if ("message" in signupUserData && signupUserData.token) {
        const loginResponse = NextResponse.json(
          { message: "successful login" },
          { status: 201 }
        );
        loginResponse.cookies.set("token", signupUserData.token, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          maxAge: 72 * 60 * 60,
        });

        return loginResponse;
      }
    } else {
      const signinUserResponse = await fetch(
        `${process.env.BASE_URL}/api/auth/signin`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );
      const signinUserData = await signinUserResponse.json();

      if ("error" in signinUserData) {
        return NextResponse.json(
          { error: signinUserData.error },
          { status: signinUserResponse.status }
        );
      }

      if ("message" in signinUserData && signinUserData.token) {
        const loginResponse = NextResponse.json(
          { message: "successful login" },
          { status: 201 }
        );
        loginResponse.cookies.set("token", signinUserData.token, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          maxAge: 72 * 60 * 60,
        });

        return loginResponse;
      }
    }

    return NextResponse.json({ message: "Successful login" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error, you can't sign in now, try again later" },
      { status: 500 }
    );
  }
}
