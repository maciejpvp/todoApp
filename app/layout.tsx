import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import "./reset.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Your next level app for todo list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
