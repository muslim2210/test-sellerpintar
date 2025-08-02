import type { Metadata } from "next";
import "./globals.css";
import { Archivo } from 'next/font/google'
import Footer from "@/components/layout/Footer";

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // tambahkan weight yang kamu butuhkan
  display: 'swap',
  variable: '--font-archivo', // opsional, kalau mau pakai di CSS
})

export const metadata: Metadata = {
  title: "Artike App",
  description: "Test-Sellerpintar Article App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} antialiased`}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
