import type { Metadata } from "next";
import About from "./content";

export const metadata = {
  title: "About Us - CoderDesign",
  description:
    "Learn about CoderDesign, our mission, values, and the team behind innovative development solutions.",
  keywords:
    "about CoderDesign, development agency, our team, our mission, company values",
  alternates: {
    canonical: "https://coderdesign.ai/about",
  },
};






export default function Page() {
  return <About />;
}
