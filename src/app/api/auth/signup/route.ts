import { NextRequest, NextResponse } from "next/server";

import createApolloClient from "@/config/apolloClient";
import { Create_User } from "@/graphql/mutation/createMutation";
import { Publish_User } from "@/graphql/mutation/publishMutation";

import { hashPassword } from "@/utils/verifyPassword";

const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const client = createApolloClient();

    const newPassword = await hashPassword(password);
    if (!newPassword)
      return NextResponse.json({ error: "server error" }, { status: 500 });

    const { data: createUser } = await client.mutate({
      mutation: Create_User,
      variables: { email, password: newPassword, role: "USER" },
    });
    if (!createUser?.createMyUser.id)
      return NextResponse.json({ error: "server error" }, { status: 500 });

    const { data: publishUser } = await client.mutate({
      mutation: Publish_User,
      variables: { id: createUser.createMyUser.id },
    });
    if (!publishUser?.publishMyUser.email)
      return NextResponse.json({ error: "server error" }, { status: 500 });

    if (publishUser?.publishMyUser.email) {
      const signupResponse = await fetch(
        `${process.env.BASE_URL}/api/auth/signin`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const signupData = await signupResponse.json();

      if ("error" in signupData)
        return NextResponse.json(
          { error: signupData.error },
          { status: signupResponse.status }
        );

      if ("message" in signupData && signupData.token)
        return NextResponse.json(
          { message: "successful login", token: signupData.token },
          { status: 201 }
        );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
};

export { POST };
