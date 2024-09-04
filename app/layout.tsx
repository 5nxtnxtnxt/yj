import type { Metadata } from "next";
import "./globals.css";
import Info from "@/components/info";

export const metadata: Metadata = {
  title: "예진으로부터",
  description: "from yejin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="text-[8px] sm:text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px]"
    >
      <body>
        <Info></Info>
        {children}
      </body>
    </html>
  );
}
