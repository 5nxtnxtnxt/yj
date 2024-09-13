"use client";

import { isLoggedIn } from "@/firebase/auth";
import { addData } from "@/firebase/firestore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const [nowLoggedIn, setNowLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const loggedIn = await isLoggedIn();
  //     if (loggedIn === false) router.push("/signin");
  //     else setNowLoggedIn(true);
  //   };
  //   checkLoggedIn();
  // }, [router]);
  const [str, setStr] = useState("");
  return (
    <div className="h-screen w-screen bg-bg-white">
      <form>
        <textarea
          name="test"
          id=""
          value={str}
          onChange={(e) => setStr(e.target.value)}
        ></textarea>
        <a
          onClick={() => {
            console.log(str);
            addData(str);
          }}
        >
          button
        </a>
      </form>
      {/* {nowLoggedIn && children} */}
    </div>
  );
}
