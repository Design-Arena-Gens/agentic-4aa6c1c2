import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SWE Performance Dashboard",
  description: "Track developer performance metrics across repositories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
