import "@radix-ui/themes/styles.css";
import "./theme.config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Provider";
import Navbar from "./components/Navbar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BugLog",
  description: "Issue tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <AuthProvider>
          <Theme appearance="dark" accentColor="green">
            <Navbar />
            <main className="p-5">{children}</main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}

