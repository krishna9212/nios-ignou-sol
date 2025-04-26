import React from 'react';
import Head from 'next/head'; // Import Head from next/head
import Sol from "@/app/components/Sol";

export const metadata = {
  title: "Solved SOL DU Assignments 2025 | Download TMA & Practical Files | SOL DU",
  description:
    "Download 100% solved SOL DU assignments for various programs. Updated TMAs and practical files for 2025. Fast delivery, high scoring, and ready-to-submit format.",
  keywords: [
    "SOL DU assignments",
    "SOL DU Class 10th TMA",
    "SOL DU Class 12th practical",
    "buy SOL DU solved assignments",
    "SOL DU solved TMA 2025",
    "SOL DU assignments 2025",
    "SOL DU practical file",
    "SOL DU TMA answers",
    "SOL DU 2025 TMA download",
    "SOL DU TMA with answer pdf",
    "ready-made SOL DU assignments",
  ],
};

const Page = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
      </Head>
      <Sol />
    </>
  );
};

export default Page;
