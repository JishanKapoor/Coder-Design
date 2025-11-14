import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coder Design - Full-Stack Development, AI & SEO Agency in New York",
  description:
    "Premier New York development agency specializing in full-stack engineering, AI/ML solutions, mobile app development, and data-driven SEO. Serving NYC, Manhattan, Brooklyn.",
  keywords:
    "New York development agency, NYC web development, full-stack development New York, AI machine learning NYC, SEO services New York, mobile app development NYC, React developers NYC, Manhattan web agency, Brooklyn app development, enterprise software New York",
  openGraph: {
    title: "Coder Design - Full-Stack Development, AI & SEO Agency in New York",
    description:
      "Premier New York development agency specializing in full-stack engineering, AI/ML, mobile app development, and SEO services.",
    url: "https://coderdesign.com",
    siteName: "Coder Design",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coder Design - Full-Stack Development, AI & SEO Agency in New York",
    description:
      "Premier NYC development agency. Full-stack engineering, AI/ML, mobile apps & SEO. Located at 17 State Street, New York.",
  },
  alternates: {
    canonical: "https://coderdesign.com/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.png",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
