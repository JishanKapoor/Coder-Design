import type { Metadata } from "next";
import Contact from "./content";

export const metadata = {
  title: "Contact Coder Design | NYC Development Agency | (437) 239-2448",
  description:
    "Contact Coder Design NY at 17 State Street. Full-stack, AI/ML, and SEO services. Call (437) 239-2448 or email hello@coderdesign.com",
  keywords:
    "contact Coder Design, NYC development agency contact, New York web development, 17 State Street NYC, Manhattan development agency, contact software agency New York",
  alternates: {
    canonical: "https://coderdesign.com/contact",
  },
};







export default function Page() {
  return <Contact />;
}
