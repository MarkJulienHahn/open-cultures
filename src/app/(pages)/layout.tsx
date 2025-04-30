import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { Suspense } from "react";
import Wallpaper from "@/components/ui/Wallpaper";

export const metadata: Metadata = {
  title: "Open Cultures",
  description:
    "The overall aim of Open Planning Cultures. Design Principles for Transformative Spaces (OPEN_CULTURES) is to develop climate-sensitive design principles for urban development and spatial planning that are both based on and foster the translation of climate knowledge into the everyday practices of citizens to engender sustainable forms of urban living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
        </Suspense>
        {children}
        <Footer />
        <Wallpaper img={"/images/openCultures.png"} />
      </body>
    </html>
  );
}
