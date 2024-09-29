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
  return (
    <div className="w-screen h-[100dvw] grid grid-rows-[8rem_1fr] md:grid-rows-1 md:grid-cols-[20rem_1fr] overflow-x-hidden">
      <NavigationBar data={data} />
      <main className="overflow-y-auto">{children}</main>
    </div>
  );
}
