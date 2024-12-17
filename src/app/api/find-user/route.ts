import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import createApolloClient from "@/config/apolloClient";
import { Find_Existing_User } from "@/graphql/query";

import { verifyToken } from "@/utils/verifyToken";

const GET = async (): Promise<NextResponse> => {
  try {
    const cookie = cookies();
    const token = cookie.get("token");
    if (!token) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const verifiedToken = verifyToken(token.value);
    if (!verifiedToken) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const client = createApolloClient();
    const { data } = await client.query({
      query: Find_Existing_User,
      variables: { email: verifiedToken.email },
    });

    if (data.myUsers.length === 0) {
      return NextResponse.json(
        { error: "user does not exist." },
        { status: 401 }
      );
    }

    const user = data.myUsers[0];

    return NextResponse.json(
      {
        message: "authorized",
        data: {
          email: user.email,
          rol: user.rol,
          id: user.id,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
};

export { GET };
