import type { Metadata } from "next";
import FullStackEngineering from "./content";

export const metadata: Metadata = {
  title: "Full-Stack Development Services NYC | React, Node.js, Python - Coder Design",
  description:
    "Top full-stack development agency in NY. Expert React, Next.js, Node.js, Python & Django developers. Call (437) 239-2448.",
  keywords:
    "full-stack development NYC, React developers New York, Node.js development Manhattan, Python Django NYC, Next.js agency New York, web application development NYC, scalable software New York, enterprise development Manhattan",
  alternates: {
    canonical: "https://coderdesign.com/full-stack-engineering",
  },
};

export default function Page() {
  return <FullStackEngineering />;
}
