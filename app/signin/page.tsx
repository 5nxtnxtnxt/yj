"use client";

import { signIn } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const router = useRouter();
  const trySignIn = async () => {
    const userCredential = await signIn(email, pswd);
    if (!userCredential) {
      alert("이메일과 비밀번호를 확인해주세요");
      return;
    }
    router.push("/admin");
  };

  return (
    <div className="w-screen h-screen ">
      <div className="text-xl size-full relative flex items-center justify-center">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="email">
              <h4 className="text-center mb-2">email</h4>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-bg-white border border-black border-dashed rounded-md"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="pswd">
              <h4 className="text-center mb-2">password</h4>
            </label>
            <input
              type="password"
              name="pswd"
              id="pswd"
              className="bg-bg-white border border-black border-dashed rounded-md"
              onChange={(e) => {
                setPswd(e.currentTarget.value);
              }}
            />
          </div>

          <button
            className="hover:text-red-600"
            onClick={() => {
              trySignIn();
            }}
          >
            sign-in
          </button>
        </div>
      </div>
    </div>
  );
}
