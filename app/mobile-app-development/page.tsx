import type { Metadata } from "next";
import MobileAppDevelopment from "./content";

export const metadata = {
  title: "Mobile App Development NYC | iOS & Android Apps - Coder Design",
  description:
    "Award-winning mobile app development in NY. Build iOS & Android apps with React Native, Flutter, Swift, Kotlin. Call (437) 239-2448.",
  keywords:
    "mobile app development NYC, iOS developers New York, Android app development Manhattan, React Native NYC, Flutter developers New York, app development company NYC, mobile app agency Manhattan, Brooklyn app developers",
  alternates: {
    canonical: "https://coderdesign.com/mobile-app-development",
  },
};


export default function Page() {
  return <MobileAppDevelopment />;
}
