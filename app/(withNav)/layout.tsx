import type { Metadata } from "next";
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
  // sm:text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px]
  return (
    <html lang="en" className="text-[2.5dvw] md:text-[0.9dvw]">
      <body>
        <div className="w-screen h-screen grid grid-rows-[8rem_1fr] md:grid-rows-1 md:grid-cols-[17rem_1fr]">
          <NavigationBar data={data} />
          <main className="overflow-y-auto border-r border-black">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
