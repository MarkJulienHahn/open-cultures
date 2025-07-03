import type React from "react"
import "./globals.css"
import Nav from "@/components/ui/Nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OpenCultures",
  description:
    "The overall aim of Open Planning Cultures. Design Principles for Transformative Spaces (OPEN_CULTURES) is to develop climate-sensitive design principles for urban development and spatial planning that are both based on and foster the translation of climate knowledge into the everyday practices of citizens to engender sustainable forms of urban living.",
  openGraph: {
    title: "OpenCultures",
    description: "Design principles for climate-sensitive urban development based on citizens' everyday practices.",
    images: ["https://opencultures.org/oc-image.png"],
    url: "https://www.opencultures.org",
    siteName: "OpenCultures",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenCultures",
    description: "Design principles for climate-sensitive urban development based on citizens' everyday practices.",
    images: ["https://opencultures.org/oc-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
