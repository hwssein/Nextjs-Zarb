"use client";

import { ChildrenProps } from "@/types/types";

import { useEffect, useState } from "react";

import Loader from "@/element/Loader";
import { ThemeProvider } from "@/components/ui/theme-provider";

function ShadThemeProviders({ children }: ChildrenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader />;
  }
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}

export default ShadThemeProviders;
