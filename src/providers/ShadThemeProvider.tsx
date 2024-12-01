import { Children } from "@/types/types";
import { ThemeProvider } from "@/components/ui/theme-provider";

function ShadThemeProviders({ children }: Children) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </>
  );
}

export default ShadThemeProviders;
