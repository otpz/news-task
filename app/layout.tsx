import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Home",
  description: "Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen h-auto">
      <body className="w-full h-auto min-h-screen flex flex-col items-center justify-center flex-grow">
        <div className="w-full min-h-screen h-full flex flex-col items-center flex-grow">
          <Navbar/>
          {children}
          <Toaster />
          <Footer/>
        </div>
      </body>
    </html>
  );
}
