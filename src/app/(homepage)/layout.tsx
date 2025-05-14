import "./globals.css";
import type { Metadata } from "next";

import Nav from "@/components/ui/Nav";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Open Cultures",
  description:
    "The overall aim of Open Planning Cultures. Design Principles for Transformative Spaces (OPEN_CULTURES) is to develop climate-sensitive design principles for urban development and spatial planning that are both based on and foster the translation of climate knowledge into the everyday practices of citizens to engender sustainable forms of urban living.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body>
          <Nav />
          {children}
        </body>
    </html>
  );
}
