import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import RazorpayScriptLoader from "./components/RazorpayScriptLoader"; // ✅ import this

export const metadata = {
  title: "Assignment Store | NIOS | IGNOU | DU SOL",
  description: "Buy solved assignments for NIOS, IGNOU, and DU SOL. Instant delivery and best prices!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <RazorpayScriptLoader /> {/* ✅ Razorpay script moved here */}
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
