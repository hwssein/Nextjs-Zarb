"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathName = usePathname();
  if (pathName === "/login") return null;

  return (
    <>
      <div className="w-full flex items-center justify-start flex-col mt-6">
        <Image
          src="/images/logo.png"
          width={400}
          height={300}
          alt="logo"
          className="w-32 mb-4 rounded"
        ></Image>

        <span className="font-light capitalize mb-1">
          Listen to the music and build your body
        </span>

        <span className="font-light capitalize mb-4">
          Everything here is for you
        </span>

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
