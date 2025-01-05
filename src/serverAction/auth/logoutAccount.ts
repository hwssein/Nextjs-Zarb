"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logoutAccount = (): void => {
  const cookie = cookies();
  cookie.delete("token");

  redirect("/");
};

export default logoutAccount;
