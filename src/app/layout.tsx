import type { Metadata } from "next";

import myFont from "@/config/font";
import "./globals.css";

type Children = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: "MuGym | The Music for Gym",
  description:
    "this is a next.js project developed by hwssein for personal or public usage",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={`${myFont.className} text-base text-title`}>
      <body className="max-w-7xl">{children}</body>
    </html>
  );
}
