import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { getCurrencyDetails } from "@/lib/utils/currency";
import { CurrencyInitializer } from "@/components/CurrencyInitializer";

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
  title: "Songify",
  description:
    "Create personalized, custom songs for your loved ones. Professional artists turn your stories into unique musical gifts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get currency details on server
  const currency = await getCurrencyDetails();

  return (
    <html lang="en">
      <body
        className={`${national.variable} antialiased h-screen overflow-x-hidden`}
      >
        <CurrencyInitializer currency={currency} />
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
