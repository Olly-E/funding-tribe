import { Inter } from "next/font/google";
import "react-phone-number-input/style.css";
import type { Metadata } from "next";
import "./react-date-picker.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Plural Health",
  description: "Building better healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="">{children}</div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
