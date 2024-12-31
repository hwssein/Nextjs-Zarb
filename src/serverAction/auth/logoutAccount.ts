"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logoutAccount = (): void => {
  const cookie = cookies();

  cookie.set({
    name: "token",
    value: "",
    maxAge: 0,
    httpOnly: true,
    path: "/",
  });

  redirect("/");
};

export default logoutAccount;
