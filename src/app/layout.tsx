import type { Metadata } from "next";
import { Children } from "@/types/types";

import ShadThemeProviders from "@/providers/ShadThemeProvider";

import myFont from "@/config/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "MuGym | The Music for Gym",
  description:
    "this is a next.js project developed by hwssein for personal or public usage",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={`${myFont.className} text-base`}>
      <body className="max-w-7xl p-2 ">
        <ShadThemeProviders>{children}</ShadThemeProviders>
      </body>
    </html>
  );
}
