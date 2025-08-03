import type { Metadata } from "next";
import "../globals.css";
import SideBarAdmin from "@/components/layout/SideBarAdmin";


export const metadata: Metadata = {
  title: "Artike App",
  description: "Test-Sellerpintar Article App",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
  <div className="flex flex-row flex-nowrap">
    <SideBarAdmin/>
    {children}
  </div> 
  );
}
