"use client";

import { useState } from "react";

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
  if (typeof window === "undefined") return "en";

  return localStorage.getItem("language") ?? "en";
});

  

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return {
    language,
    setLanguage: changeLanguage,
  };
}