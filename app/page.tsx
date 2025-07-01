import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 flex items-center justify-center p-8">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">🛠️ 도구 모음</h1>
          <p className="text-gray-600 mb-8">유용한 도구들을 사용해보세요</p>

          <div className="space-y-4">
            <Link
              href="/tools"
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md transform hover:scale-105"
            >
              🎰 로또 번호 생성기
            </Link>

            {/* 향후 추가될 도구들을 위한 공간 */}
            <div className="text-gray-400 text-sm mt-6">더 많은 도구들이 곧 추가될 예정입니다!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
