import type { Metadata } from "next";
import { ChildrenProps } from "@/types/types";

import Layout from "@/layout/Layout";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { metadataKeyword } from "@/constant/metadataKeyword";

import myFont from "@/config/font";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ZARBBEAT | Power Your Workout with the Best Gym Beats",
  description:
    "Unleash your full potential with Zarb Beat - the ultimate collection of high-energy gym music designed to power up your workouts. From intense training sessions to motivational beats, our playlist will keep you moving and crushing your fitness goals.",
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
