"use server";

import { cookies } from "next/headers";

const logoutAccount = (): void => {
  const cookie = cookies();

  cookie.set({
    name: "token",
    value: "",
    maxAge: 0,
    httpOnly: true,
    path: "/",
  });
};

export default logoutAccount;
