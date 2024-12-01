"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/ui/button";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {theme === "dark" ? (
        <Button onClick={() => setTheme("light")} variant="ghost" size="icon">
          <Sun />
        </Button>
      ) : (
        <Button onClick={() => setTheme("dark")} variant="ghost" size="icon">
          <Moon />
        </Button>
      )}
    </div>
  );
}

export default ThemeToggle;
