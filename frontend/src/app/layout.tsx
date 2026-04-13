import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BloShield | AI-Powered Financial Gateway",
  description: "Secure, monitor, and analyze financial API traffic in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
