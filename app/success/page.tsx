"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Status =
  | "checking"
  | "success"
  | "pending"
  | "error";

export default function SuccessPage() {
  const [status, setStatus] =
    useState<Status>("checking");

  const [message, setMessage] =
    useState(
      "Pro 활성화를 확인하는 중입니다..."
    );

  useEffect(() => {
    let cancelled = false;

    let attempts = 0;

    const maxAttempts = 10;

    const checkProStatus =
      async () => {
        if (cancelled) return;

        try {
          const response =
            await fetch("/api/me", {
              method: "GET",
              cache: "no-store",
            });

          if (!response.ok) {
            throw new Error(
              "Failed to load account."
            );
          }

          const data =
            await response.json();

          if (
            cancelled
          ) {
            return;
          }

          if (
            data?.plan === "pro"
          ) {
            setStatus("success");

            setMessage(
              "Pro 플랜이 성공적으로 활성화되었습니다."
            );

            return;
          }

          attempts += 1;

          if (
            attempts >=
            maxAttempts
          ) {
            setStatus("pending");

            setMessage(
              "결제는 완료되었지만 Pro 활성화에 약간의 시간이 필요합니다."
            );

            return;
          }

          setTimeout(
            checkProStatus,
            1500
          );
        } catch (error) {
          console.error(
            "Failed to verify Pro status:",
            error
          );

          if (
            cancelled
          ) {
            return;
          }

          attempts += 1;

          if (
            attempts >=
            maxAttempts
          ) {
            setStatus("error");

            setMessage(
              "Pro 활성화 상태를 확인하지 못했습니다. 잠시 후 다시 확인해주세요."
            );

            return;
          }

          setTimeout(
            checkProStatus,
            1500
          );
        }
      };

    void checkProStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#09090B] via-[#111827] to-[#09090B] px-6 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
        {status === "checking" && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 text-4xl">
              ⏳
            </div>

            <h1 className="mt-6 text-3xl font-extrabold">
              결제를 확인하는 중입니다
            </h1>

            <p className="mt-4 text-zinc-400">
              {message}
            </p>

            <div className="mx-auto mt-8 h-2 w-48 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500" />
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-5xl">
              🎉
            </div>

            <h1 className="mt-6 text-4xl font-extrabold">
              결제가 완료되었습니다!
            </h1>

            <p className="mt-4 text-zinc-400">
              {message}
            </p>

            <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
              <p className="text-2xl font-bold text-yellow-400">
                💎 PRO
              </p>

              <p className="mt-2 text-sm text-zinc-300">
                이제 Pro 기능을 사용할 수 있습니다.
              </p>
            </div>

            <Link
              href="/"
              className="mt-8 inline-block w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-bold transition hover:scale-[1.02]"
            >
              🚀 Benchmark AI 시작하기
            </Link>
          </>
        )}

        {status === "pending" && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 text-5xl">
              ⏱️
            </div>

            <h1 className="mt-6 text-3xl font-extrabold">
              결제가 처리되었습니다
            </h1>

            <p className="mt-4 text-zinc-400">
              {message}
            </p>

            <p className="mt-3 text-sm text-zinc-500">
              페이지를 새로고침하면 Pro 상태가
              반영될 수 있습니다.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block w-full rounded-xl bg-blue-600 px-6 py-4 font-bold transition hover:bg-blue-500"
            >
              홈으로 돌아가기
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-5xl">
              ⚠️
            </div>

            <h1 className="mt-6 text-3xl font-extrabold">
              결제 확인 중 문제가 발생했습니다
            </h1>

            <p className="mt-4 text-zinc-400">
              {message}
            </p>

            <Link
              href="/"
              className="mt-8 inline-block w-full rounded-xl bg-blue-600 px-6 py-4 font-bold transition hover:bg-blue-500"
            >
              홈으로 돌아가기
            </Link>
          </>
        )}
      </div>
    </main>
  );
}