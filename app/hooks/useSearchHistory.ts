import { useState } from "react";

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] =
    useState<string[]>(() => {
      if (typeof window === "undefined") return [];

      const saved =
        localStorage.getItem("searchHistory");

      return saved ? JSON.parse(saved) : [];
    });

  const updateSearchHistory = (
    keyword: string
  ) => {
    setSearchHistory((prev) => {
      const history = [
        keyword,
        ...prev.filter(
          (item) => item !== keyword
        ),
      ].slice(0, 10);

      localStorage.setItem(
        "searchHistory",
        JSON.stringify(history)
      );

      return history;
    });
  };

  return {
    searchHistory,
    updateSearchHistory,
  };
}