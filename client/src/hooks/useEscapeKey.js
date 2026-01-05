import { useEffect, useRef } from "react";

const useEscapeKey = (onEscape) => {
  const callbackRef = useRef(onEscape);

  useEffect(() => {
    callbackRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        callbackRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
};

export default useEscapeKey;