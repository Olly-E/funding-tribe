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
    <div className="flex w-full h-dvh overflow-hidden relative">
      <Header />
      <Sidebar />
      <div className="h-dvh overflow-y-auto flex-1 w-full pt-[58px]">
        {children}
      </div>
    </div>
  );
}
