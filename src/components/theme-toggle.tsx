"use client";

import * as Switch from "@radix-ui/react-switch";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (theme === "dark" || (!theme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    const next = html.classList.contains("dark") ? "light" : "dark";
    html.classList.toggle("dark");
    localStorage.setItem("theme", next);
    setIsDark(next === "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-zinc-700 dark:text-zinc-300">🌙</span>
      <Switch.Root
        checked={isDark}
        onCheckedChange={toggle}
        className="w-10 h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full relative data-[state=checked]:bg-blue-600 transition"
      >
        <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow absolute left-1 top-1 transition-transform data-[state=checked]:translate-x-4" />
      </Switch.Root>
      <span className="text-sm text-zinc-700 dark:text-zinc-300">☀️</span>
    </div>
  );
}
