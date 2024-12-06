import { Children } from "@/types/types";

import Header from "./Header";
import Footer from "./Footer";
import checkSession from "@/serverAction/checkSession";

function Layout({ children }: Children) {
  const session = checkSession();

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
