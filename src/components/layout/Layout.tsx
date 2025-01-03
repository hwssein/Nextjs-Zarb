import { ChildrenProps } from "@/types/types";

import Header from "./Header";
import Footer from "./Footer";
import checkSession from "@/serverAction/auth/checkSession";

async function Layout({ children }: ChildrenProps) {
  const session = await checkSession();

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
