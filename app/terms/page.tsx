import type { Metadata } from "next";
import Terms from "./content";


export const metadata: Metadata = {
  title: "Terms & Conditions - CoderDesign",
  description:
    "CoderDesign's terms and conditions. Review our service agreements, policies, and legal information.",
  keywords:
    "terms and conditions, terms of service, legal, agreements",
  alternates: {
    canonical: "https://coderdesign.com/terms",
  },
};







export default function Page() {
  return <Terms />;
}
