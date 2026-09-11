import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const sans = localFont({ src: [{ path: "../../public/fonts/dm-sans-regular.ttf", weight: "400" }, { path: "../../public/fonts/dm-sans-medium.ttf", weight: "500" }, { path: "../../public/fonts/dm-sans-semibold.ttf", weight: "600" }], variable: "--font-sans", display: "swap" });
const serif = localFont({ src: [{ path: "../../public/fonts/dm-serif-regular.ttf", weight: "400", style: "normal" }, { path: "../../public/fonts/dm-serif-italic.ttf", weight: "400", style: "italic" }], variable: "--font-serif", display: "swap" });
const mono = localFont({ src: "../../public/fonts/space-grotesk-medium.ttf", variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Reetesh Deshmukh — Software Engineer",
  description: "Full-stack craft. Infrastructure at scale. Explore Reetesh Deshmukh’s work at Oracle Cloud Infrastructure, projects, coding profiles, and writing.",
  applicationName: "Reetesh Deshmukh Portfolio",
  authors: [{ name: "Reetesh Deshmukh" }],
  openGraph: { title: "Reetesh Deshmukh — Software Engineer", description: "Full-stack tools, backend services, and cloud infrastructure. Based in Bengaluru. NITK Surathkal alumnus.", type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
