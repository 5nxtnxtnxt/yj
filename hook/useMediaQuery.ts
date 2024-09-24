import { useState, useEffect } from "react";

export default function useMediaQuery(query: string) {
  const [match, setMatch] = useState<boolean>();

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => {
      setMatch(mediaQueryList.matches);
    };

    updateMatch();

    mediaQueryList.addEventListener("change", updateMatch);
    return () => {
      mediaQueryList.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return match;
}
