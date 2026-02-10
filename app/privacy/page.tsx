import type { Metadata } from "next";
import Privacy from "./content";

export const metadata: Metadata = {
  title: "Privacy Policy - CoderDesign",
  description:
    "CoderDesign's privacy policy. Learn how we collect, use, and protect your personal information.",
  keywords:
    "privacy policy, data protection, GDPR, privacy",
  alternates: {
    canonical: "https://coderdesign.com/privacy",
  },
};







export default function Page() {
  return <Privacy />;
}
