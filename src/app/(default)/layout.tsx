import AnnouncementBanner from "@/components/AnnouncementBanner";

import { Footer } from "@/components/Footer";

import NavBar from "@/components/NavBar";

// Default layout with nav, footer, etc.
export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnnouncementBanner />
      <div className="min-h-[calc(100vh-theme(spacing.16))] flex flex-col">
        <div className="max-w-6xl mx-auto w-full">
          <NavBar />
        </div>
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
