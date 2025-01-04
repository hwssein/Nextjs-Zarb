import { NextRequest, NextResponse } from "next/server";

import { FindExistingUserProps } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_Existing_User } from "@/graphql/query/userQuery";

import { comparePassword } from "@/utils/verifyPassword";
import { sign } from "jsonwebtoken";

const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const client = createApolloClient();

    const { data } = await client.query<FindExistingUserProps>({
      query: Get_Existing_User,
      variables: { email },
    });
    if (data.myUsers.length === 0)
      return NextResponse.json(
        { error: "this user dose not exist" },
        { status: 401 }
      );

    const isValidPassword = await comparePassword(
      password,
      data.myUsers[0].password
    );
    if (
      (typeof isValidPassword === "object" && "error" in isValidPassword) ||
      !isValidPassword
    )
      return NextResponse.json(
        { error: "password is incorrect" },
        { status: 401 }
      );

    const secretKey = process.env.SECRET_KEY as string;
    const token = sign({ email: data?.myUsers[0].email }, secretKey, {
      expiresIn: 72 * 60 * 60,
    });
    if (!token)
      return NextResponse.json({ error: "server error" }, { status: 500 });

    return NextResponse.json({ message: "success", token }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
};

export { POST };
