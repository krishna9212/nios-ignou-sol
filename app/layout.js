import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import RazorpayScriptLoader from "./components/RazorpayScriptLoader";

export const metadata = {
  title: "Assignment Store | NIOS | IGNOU | DU SOL",
  description: "Buy solved assignments for NIOS, IGNOU, and DU SOL. Instant delivery and best prices!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense script added correctly */}
        <script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5101220421827112"
        crossorigin="anonymous">
        </script>
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <RazorpayScriptLoader />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
