import type { Metadata } from "next";
import { VT323, IBM_Plex_Mono } from "next/font/google";
import { CrtOverlay } from "@/components/CrtOverlay/CrtOverlay";
import { profile } from "@/lib/profile";
import "./globals.scss";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — gautam-os`,
  description: `${profile.name}'s retro CRT terminal portfolio. ${profile.tagline}`,
  metadataBase: new URL("https://gautamgupta.dev"),
  openGraph: {
    title: `${profile.name} — gautam-os`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${plexMono.variable}`}>
      <body>
        <a href="#terminal-input" className="skip-link">
          Skip to terminal
        </a>
        <CrtOverlay />
        {children}
      </body>
    </html>
  );
}
