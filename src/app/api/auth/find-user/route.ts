import { NextRequest, NextResponse } from "next/server";

import { FindExistingUserProps } from "@/types/types";

import createApolloClient from "@/config/apolloClient";
import { Get_Existing_User } from "@/graphql/query/userQuery";

import { verifyToken } from "@/utils/verifyToken";

const POST = async (req: NextRequest) => {
  try {
    const { token } = await req.json();

    if (!token)
      return NextResponse.json(
        { error: "please login to your account" },
        { status: 401 }
      );

    const verifiedToken = verifyToken(token);
    if (!verifiedToken)
      return NextResponse.json(
        { error: "please login to your account" },
        { status: 401 }
      );

    const client = createApolloClient();

    const { data } = await client.query<FindExistingUserProps>({
      query: Get_Existing_User,
      variables: { email: verifiedToken.email },
    });
    if (data.myUsers.length === 0)
      return NextResponse.json({ error: "user not found" }, { status: 401 });

    return NextResponse.json(
      {
        email: data.myUsers[0].email,
        id: data.myUsers[0].id,
        role: data.myUsers[0].role,
        createdAt: data.myUsers[0].createdAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
};

export { POST };
