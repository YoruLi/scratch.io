import React from "react";

export default function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = React.useState(
    typeof window !== "undefined"
      ? () => window.matchMedia(mediaQuery)?.matches
      : false
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const md = window.matchMedia(mediaQuery);

      const handleResize = (event: MediaQueryListEvent) => {
        setIsMatch(event.matches);
      };

      md.addEventListener("change", handleResize);

      return () => {
        md.removeEventListener("change", handleResize);
      };
    }
  }, [mediaQuery]);

  return isMatch;
}
