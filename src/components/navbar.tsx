"use client";

import { ThemeToggle } from "./theme-toggle";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function Navbar() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-700 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">Hyunu Blog</h1>

      <div className="flex items-center gap-4">
        {/* 드롭다운 메뉴 확장 예시 */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="text-sm px-3 py-1 border rounded-md">
            메뉴
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            sideOffset={4}
            className="z-50 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-md shadow-lg p-2"
          >
            <DropdownMenu.Item className="px-2 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
              블로그
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-2 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
              소개
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <ThemeToggle />
      </div>
    </header>
  );
}
