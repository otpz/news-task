import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { getAuthUser, verifySession } from "./_lib/dal";

export const metadata: Metadata = {
  title: "Home",
  description: "Next App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getAuthUser();
  const session = await verifySession();
  const isAdmin = session?.userRoleId === 1;

  return (
    <html lang="en" className="min-h-screen h-auto">
      <body className="w-full h-auto min-h-screen flex flex-col items-center justify-center flex-grow">
        <div className="w-full min-h-screen h-full flex flex-col items-center flex-grow">
          <Navbar user={user} isAdmin={isAdmin}/>
          {children}
          <Toaster />
          <Footer/>
        </div>
      </body>
    </html>
  );
}
