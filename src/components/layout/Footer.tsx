"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathName = usePathname();
  if (pathName === "/login" || pathName === "/player") return null;

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-1 p-1 mt-10">
        <p className="font-semibold capitalize text-center">
          Listen to the music and build your body
        </p>

        <p className="font-light capitalize text-center">
          Everything here is for you. by{" "}
          <strong className="font-bold">ZARB BEAT</strong>
        </p>
      </div>

      <div className="w-full flex items-center justify-center">
        <Link
          href="https://github.com/hwssein"
          target="_blank"
          className="py-1 px-2 hover:bg-muted rounded transition-all ease-in duration-100"
        >
          Developed By hwssein
        </Link>
      </div>
    </>
  );
}

export default Footer;
