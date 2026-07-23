"use client";

import { benchmarkService } from "../lib/benchmarkService";

type SearchOptions = {
  keyword: string;
  order: string;
  excludeShorts: boolean;
  min10Minutes: boolean;
  last30Days: boolean;

  onStep: (step: string) => void;
  onProgress: (progress: number) => void;
};

export async function executeBenchmarkSearch({
  keyword,
  order,
  excludeShorts,
  min10Minutes,
  last30Days,
  onStep,
  onProgress,
}: SearchOptions) {
  return benchmarkService({
    keyword,
    order,
    excludeShorts,
    min10Minutes,
    last30Days,
    onStep,
    onProgress,
  });
}