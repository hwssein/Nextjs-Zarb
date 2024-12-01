import { Children } from "@/types/types";

import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }: Children) {
  return (
    <>
      <Header />
      <span className="w-full h-px bg-stroke block my-3"></span>
      {children}
      <Footer />
    </>
  );
}

export default Layout;
