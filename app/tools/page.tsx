"use client";

import { useState } from "react";
import Link from "next/link";

export default function LottoPage() {
  const [lottoNumbers, setLottoNumbers] = useState<number[]>([]);

  const generateLottoNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    setLottoNumbers(numbers.sort((a, b) => a - b));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🎰 로또 번호 생성기</h1>
            <p className="text-gray-600">1-45까지의 번호 중 6개를 무작위로 선택합니다</p>
          </div>

          <div className="mb-8">
            <button
              onClick={generateLottoNumbers}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
            >
              번호 생성하기
            </button>
          </div>

          {lottoNumbers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">생성된 번호</h2>
              <div className="grid grid-cols-6 gap-2">
                {lottoNumbers.map((number, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                  >
                    {number}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
