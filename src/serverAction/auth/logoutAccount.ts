"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logoutAccount = async (): Promise<void> => {
  const cookie = await cookies();
  cookie.delete("token");

  redirect("/");
};

export default logoutAccount;
