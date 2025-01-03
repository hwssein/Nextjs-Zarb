"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { CheckSessionResponse } from "@/types/types";

import ThemeToggle from "../element/ThemeToggle";
import { Button } from "../ui/button";
import LogoutButton from "../element/LogoutButton";

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
        <Link href="/">
          <Image
            src="/images/new-logo.png"
            width={100}
            height={50}
            alt="logo"
            className="w-24 rounded"
            priority={true}
          ></Image>
        </Link>

        <div className="flex flex-row items-center justify-end gap-4">
          <span>
            <ThemeToggle />
          </span>

          {"email" in session ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>

              <span>
                <LogoutButton />
              </span>
            </div>
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
