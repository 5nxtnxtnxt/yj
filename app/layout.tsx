import type { Metadata } from "next";
import "./globals.css";
import Info from "@/components/info";
import { getProjectData } from "@/firebase/firestore";
import NavigationBar from "@/components/navigationBar";

export const metadata: Metadata = {
  title: "예진으로부터",
  description: "from yejin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getProjectData(true);
  return (
    <html
      lang="en"
      className="text-[8px] sm:text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px]"
    >
      <body>
        <Info></Info>
        <div className="w-screen h-screen grid grid-rows-[100px_1fr] md:grid-cols-[320px_1fr]">
          <NavigationBar data={data} />
          <main className="overflow-y-auto border-r border-black">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
