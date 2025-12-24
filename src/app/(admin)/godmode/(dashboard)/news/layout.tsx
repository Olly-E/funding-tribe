import { Suspense } from "react";

export const metadata = {
  title: "",
  description: "",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Suspense fallback={<div></div>}>{children}</Suspense>
    </div>
  );
}
