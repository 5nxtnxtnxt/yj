import type { Metadata } from "next";
import { getProjectData } from "@/firebase/firestore";
import NavigationBar from "@/components/navigationBar";
import Image from "next/image";

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
    <div className="w-screen h-[100dvh] grid grid-cols-1 grid-rows-[6rem_1fr] md:grid-rows-1 md:grid-cols-[20rem_1fr] overflow-x-hidden">
      <NavigationBar data={data} />
      <main className="overflow-y-auto">
        {children}
        <div className="w-full h-[27rem] flex items-center justify-center">
          <div className="max-md:hidden flex flex-col gap-[1.875rem] items-center">
            <Image
              alt="logo"
              width={320}
              height={320}
              src="/로고.svg"
              className="w-36"
            />
            <h4 className="text-base">
              Copyright© 2024. fromyejin. All rights reserved.
            </h4>
          </div>
          <div className="md:hidden flex flex-col items-center uppercase">
            <h4>Copyright© 2024. fromyejin.</h4>
            <h4>All rights reserved.</h4>
          </div>
        </div>
      </main>
    </div>
  );
}
