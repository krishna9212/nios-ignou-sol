import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

// Load fonts with subsets
const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Assignment Store | NIOS | IGNOU | DU SOL",
  description: "Buy solved assignments for NIOS, IGNOU, and DU SOL. Instant delivery and best prices!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
      <CartProvider>
        <Navbar />

        <main>{children}</main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
