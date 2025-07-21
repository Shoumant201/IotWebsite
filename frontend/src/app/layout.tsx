import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "IoT Innovators",
  description: "IoT Project Frontend Application - Herald College Kathmandu",
  icons: {
    icon: [
      { url: '/iot.png', sizes: '32x32', type: 'image/png' },
      { url: '/iot.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/iot.png',
    apple: '/iot.png',
    other: [
      {
        rel: 'icon',
        url: '/iot.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/iot.png" type="image/png" />
        <link rel="shortcut icon" href="/iot.png" type="image/png" />
        <link rel="apple-touch-icon" href="/iot.png" />
      </head>
      <body className="antialiased min-h-screen bg-white" suppressHydrationWarning>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
