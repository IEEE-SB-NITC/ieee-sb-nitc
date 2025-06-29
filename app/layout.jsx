import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--geist",
  subsets: ["latin"],
});

const inter = Inter({ variable: "--Inter", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--Montserrat", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IEEE SB NITC",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
