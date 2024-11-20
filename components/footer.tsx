"use client";

import useMediaQuery from "@/hook/useMediaQuery";

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <footer className="md:col-span-2 w-full h-56 border-border-black md:border-t">
      {isMobile ? "" : ""}
    </footer>
  );
}
