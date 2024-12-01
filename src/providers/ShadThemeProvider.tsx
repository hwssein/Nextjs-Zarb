"use client";

import { Children } from "@/types/types";

import { useEffect, useState } from "react";

import { ThemeProvider } from "@/components/ui/theme-provider";

function ShadThemeProviders({ children }: Children) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
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
