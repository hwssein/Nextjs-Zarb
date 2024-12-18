import type { Metadata } from "next";
import { Children } from "@/types/types";

import Layout from "@/layout/Layout";

import ShadThemeProviders from "@/providers/ShadThemeProvider";

import myFont from "@/config/font";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ZARB | The Music For Build The Body",
  description:
    "this is a next.js project developed by hwssein for personal or public usage",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={`${myFont.className}`}>
      <body className="max-w-5xl p-2 font-normal">
        <ShadThemeProviders>
          <Layout>{children}</Layout>
        </ShadThemeProviders>
        <Toaster />
      </body>
    </html>
  );
}
