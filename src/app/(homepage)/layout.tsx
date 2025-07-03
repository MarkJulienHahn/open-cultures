import "./globals.css";
import Head from "next/head";
import Nav from "@/components/ui/Nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Head>
          <title>OpenCultures</title>
          <meta
            name="description"
            content="The overall aim of Open Planning Cultures. Design Principles for Transformative Spaces (OPEN_CULTURES) is to develop climate-sensitive design principles for urban development and spatial planning that are both based on and foster the translation of climate knowledge into the everyday practices of citizens to engender sustainable forms of urban living."
          />
          {/* Open Graph */}
          <meta property="og:title" content="OpenCultures" />
          <meta
            property="og:description"
            content="Design principles for climate-sensitive urban development based on citizens’ everyday practices."
          />
          <meta property="og:image" content="https://opencultures.org/oc-image.png" />
          <meta property="og:url" content="https://www.opencultures.org" />
          <meta property="og:site_name" content="OpenCultures" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="OpenCultures" />
          <meta
            name="twitter:description"
            content="Design principles for climate-sensitive urban development based on citizens’ everyday practices."
          />
          <meta name="twitter:image" content="https://opencultures.org/oc-image.png" />
        </Head>
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
