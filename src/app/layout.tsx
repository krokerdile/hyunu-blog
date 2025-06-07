import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hyunu Blog",
  description: "Frontend Dev Blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300`}
      >
        <div className="flex flex-col flex-1">
          <Navbar />

          <main className="flex-1 flex-shrink-0 max-w-3xl w-full mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-700 px-4 py-6 text-sm text-center text-gray-500 dark:text-gray-400">
            © 2025 Hyunu. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
