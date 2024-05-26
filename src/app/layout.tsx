import { UserProvider } from "@/contexts/UserContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/app/components/Header/Header";
import { CssBaseline } from "@mui/material";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pomar",
  description: "Mentoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <UserProvider>
          <Header />
          <CookiesProvider>{children}</CookiesProvider>
        </UserProvider>
      </body>
    </html>
  );
}
