import type { Metadata } from "next";
import { RecruiterCV } from "@/components/recruiter/RecruiterCV";

export const metadata: Metadata = { title: "Recruiter view — Ibad Ullah Zuberi" };

export default function RecruiterPage() {
  return <RecruiterCV />;
}
