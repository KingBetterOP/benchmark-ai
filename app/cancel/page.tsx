import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          결제가 취소되었습니다.
        </h1>

        <p className="text-gray-400 mb-8">
          언제든지 다시 Pro로 업그레이드할 수 있습니다.
        </p>

        <Link
          href="/"
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}