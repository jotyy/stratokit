import type { GlobalProvider } from "@ladle/react";
import "../src/globals.css";
import React, { useEffect } from "react";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  useEffect(() => {
    if (globalState.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [globalState.theme]);

  return <>{children}</>;
};
