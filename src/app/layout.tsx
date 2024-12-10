import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import localFont from "next/font/local";

const national = localFont({
  src: [
    {
      path: "./fonts/National-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/National-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/National-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/National-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-national",
});

export const metadata: Metadata = {
  title: "Bill",
  description:
    "Bill is a platform for creating custom songs for your loved ones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${national.variable} antialiased min-h-screen overflow-x-hidden`}
      >
        <div className="min-h-screen">
          <AnnouncementBanner />
          <div className="max-w-6xl mx-auto">
            <NavBar />
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
