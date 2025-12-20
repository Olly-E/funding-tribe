import { Metadata } from "next";

import Sidebar from "../../../features/dashboard/components/Sidebar";
import Header from "@/app/features/dashboard/components/Header";

export const metadata: Metadata = {
  title: "Admin",
  description: "",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen overflow-hidden relative">
      <Header />
      <Sidebar />
      <div className="h-screen overflow-y-auto flex-1 w-full pt-[88px]">
        {children}
      </div>
    </div>
  );
}
