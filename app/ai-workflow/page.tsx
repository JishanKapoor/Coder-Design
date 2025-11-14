import type { Metadata } from "next";
import AIWorkflowDetail from "./content";

export const metadata = {
  title: "AI & Machine Learning Services NYC | Custom AI Solutions - Coder Design",
  description:
   "Top AI & ML agency in New York offering custom models, chatbots, computer vision, and predictive analytics. Enterprise solutions built for NYC businesses.",
  keywords:
    "AI development NYC, machine learning New York, AI agency Manhattan, chatbot development NYC, computer vision New York, predictive analytics NYC, AI automation New York, ML solutions Manhattan, artificial intelligence NYC",
  alternates: {
    canonical: "https://coderdesign.com/ai-workflow",
  },
};



export default function Page() {
  return <AIWorkflowDetail />;
}
