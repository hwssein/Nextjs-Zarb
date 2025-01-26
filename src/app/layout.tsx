import type { Metadata } from "next";
import { ChildrenProps } from "@/types/types";

import Layout from "@/layout/Layout";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { metadataKeyword } from "@/constant/metadataKeyword";

import myFont from "@/config/font";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ZARB | The Music For Build The Body",
  description:
    "Explore the best music collection online for your workout. By Zarb Beat",
  keywords: metadataKeyword,
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html suppressHydrationWarning lang="en" className={`${myFont.className}`}>
      <body className="w-full font-normal flex items-center justify-center">
        <div className="max-w-5xl w-full p-2">
          <ThemeProvider>
            <Layout>{children}</Layout>
          </ThemeProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
