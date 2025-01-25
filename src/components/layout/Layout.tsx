import { ChildrenProps } from "@/types/types";

import sessionRequest from "@/config/sessionRequest";

import Header from "./Header";
import Footer from "./Footer";

async function Layout({ children }: ChildrenProps) {
  const user = await sessionRequest();

  return (
    <>
      <header className="w-full">
        <Header session={user} />
      </header>

      <main className="w-full">{children}</main>

      <footer className="w-full">
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
