import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { IconBrandGithub } from "@tabler/icons-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          <footer className="bg-blue-50 py-12 flex justify-center items-center">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p className="text-center">
                Check out the source code on <br />
                <a
                  href="https://github.com/GK-Sastry/AI-Finance-Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-blue-500 hover:bg-blue-100 rounded px-2 py-1"
                >
                  <IconBrandGithub size={20} />
                  GitHub
                </a>
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
