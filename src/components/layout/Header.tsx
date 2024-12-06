"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { CheckSessionResponse } from "@/types/types";

import ThemeToggle from "../element/ThemeToggle";
import { Button } from "../ui/button";

function Header({
  session,
}: {
  session: CheckSessionResponse | { error: string };
}) {
  const pathName = usePathname();
  if (pathName === "/login") return null;

  return (
    <>
      <nav className="w-full flex items-center justify-between">
        <Image
          src="/images/logo.png"
          width={400}
          height={300}
          alt="logo"
          className="w-24 rounded"
        ></Image>

        <div className="flex flex-row items-center justify-end gap-4">
          <span>
            <ThemeToggle />
          </span>

          {"email" in session ? (
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </nav>

      <span className="w-full h-px bg-stroke block my-3"></span>
    </>
  );
}

export default Header;
