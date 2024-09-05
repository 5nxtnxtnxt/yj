"use client";

import { isLoggedIn } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedIn = await isLoggedIn();
      if (loggedIn === false) router.push("/admin/signIn");
    };
    checkLoggedIn();
  }, [router]);
  return <div className="h-screen w-screen bg-bg-white">{children}</div>;
}
