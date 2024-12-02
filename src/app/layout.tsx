import type { Metadata } from "next";
import { Children } from "@/types/types";

import Layout from "@/layout/Layout";

import ShadThemeProviders from "@/providers/ShadThemeProvider";
import ApolloProviders from "@/providers/ApolloProviders";

import myFont from "@/config/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "MuGym | The Music for Gym",
  description:
    "this is a next.js project developed by hwssein for personal or public usage",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={`${myFont.className}`}>
      <body className="max-w-5xl p-2 ">
        <ShadThemeProviders>
          <ApolloProviders>
            <Layout>{children}</Layout>
          </ApolloProviders>
        </ShadThemeProviders>
      </body>
    </html>
  );
}
