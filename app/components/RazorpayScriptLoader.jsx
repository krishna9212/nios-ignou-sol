"use client"; // <-- important

import Script from "next/script";

export default function RazorpayScriptLoader() {
  return (
    <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="afterInteractive"
      onLoad={() => console.log("✅ Razorpay script loaded")}
    />
  );
}
