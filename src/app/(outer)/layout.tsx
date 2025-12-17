import { Metadata } from "next";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

export const metadata: Metadata = {
  title: "Dashboard | Plural Health",
  description: "Building better healthcare",
};

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
