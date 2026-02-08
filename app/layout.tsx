import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development Company Toronto | CoderDesign",
  description:
    "Toronto software development company. Custom web apps, mobile apps, AI automation, and SEO. 100+ projects for startups and enterprises. (437) 239-2448.",
  keywords:
    "software development company Toronto, web development agency Toronto, custom software development Toronto, mobile app development Toronto, app developers Toronto, AI automation Toronto, SEO company Toronto, best software agency Toronto, React Next.js developers Toronto, full stack developers Toronto, Toronto web design, SaaS development Toronto, startup software development, ecommerce development Toronto, GTA app development",
  openGraph: {
    title: "Software Development Company Toronto | CoderDesign",
    description:
      "Toronto software development company. Custom web apps, mobile apps, AI automation, and SEO. Trusted by startups and enterprises across the GTA.",
    url: "https://coderdesign.com",
    siteName: "CoderDesign",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://coderdesign.com/og-image.png", width: 1200, height: 630, alt: "CoderDesign Software Development Toronto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Company Toronto | CoderDesign",
    description:
      "Toronto software development company. Custom web apps, mobile apps, AI automation, and SEO. 7 Grosvenor Street, Toronto.",
    images: ["https://coderdesign.com/og-image.png"],
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
