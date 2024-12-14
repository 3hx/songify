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
      <div className="max-w-6xl mx-auto">
        <NavBar />
        {children}
      </div>
      <Footer />
    </>
  );
}
