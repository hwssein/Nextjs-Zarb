import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <>
      <div className="w-full flex items-center justify-start flex-col mt-6">
        <span className="font-bold text-2xl text-highlight tracking-widest mb-4">
          MuGym
        </span>

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
