import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IoT Innovators",
  description: "IoT Project Frontend Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
