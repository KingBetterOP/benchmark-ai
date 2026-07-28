import { useEffect, useState } from "react";

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] =
    useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");

    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

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