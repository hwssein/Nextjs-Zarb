import { cookies } from "next/headers";
import { ChildrenProps } from "@/types/types";

import Header from "./Header";
import Footer from "./Footer";

async function Layout({ children }: ChildrenProps) {
  const cookie = cookies();
  const token = cookie.get("token")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/auth/find-user`, {
    method: "POST",
    body: JSON.stringify({ token: token || "" }),
    headers: { "Content-Type": "application/json" },
    cache: "reload",
  });
  const user = await res.json();

  return (
    <>
      <Header session={user} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
