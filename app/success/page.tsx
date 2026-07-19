export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          🎉 결제가 완료되었습니다!
        </h1>

        <p className="text-gray-400 mb-8">
          이제 Pro 기능을 사용할 수 있습니다.
        </p>

        <a
          href="/"
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          홈으로
        </a>
      </div>
    </main>
  );
}