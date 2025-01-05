import { ChildrenProps } from "@/types/types";

import sessionRequest from "@/config/sessionRequest";

import Header from "./Header";
import Footer from "./Footer";

async function Layout({ children }: ChildrenProps) {
  const user = await sessionRequest();

  return (
    <>
      <Header session={user} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
