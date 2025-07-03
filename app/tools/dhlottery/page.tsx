"use client";

import { useState } from "react";
import Link from "next/link";

export default function LottoPage() {
  const [lottoNumbersList, setLottoNumbersList] = useState<number[][]>([]);

  const getNumberColor = (number: number) => {
    if (number >= 1 && number <= 10) return "rgb(251, 196, 0)";
    if (number >= 11 && number <= 20) return "rgb(105, 200, 242)";
    if (number >= 21 && number <= 30) return "rgb(255, 114, 114)";
    if (number >= 31 && number <= 40) return "rgb(170, 170, 170)";
    if (number >= 41 && number <= 45) return "rgb(176, 216, 64)";
    return "rgb(176, 216, 64)"; // 기본값
  };

  const generateLottoNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    const sortedNumbers = numbers.sort((a, b) => a - b);

    setLottoNumbersList((prev) => {
      const newList = [sortedNumbers, ...prev];
      return newList.slice(0, 10); // 최대 10건까지만 유지
    });
  };

  const clearLottoNumbers = () => {
    setLottoNumbersList([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🎰 로또 번호 생성기</h1>
            <p className="text-gray-600 mb-4">1-45까지의 번호 중 6개를 무작위로 선택합니다</p>
            <a
              href="https://dhlottery.co.kr/gameResult.do?method=byWin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-800 underline text-sm"
            >
              🏆 동행복권 당첨번호 확인하기
            </a>
          </div>

          <div className="mb-8 space-y-3">
            <button
              onClick={generateLottoNumbers}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
            >
              번호 생성하기
            </button>
            <button
              onClick={clearLottoNumbers}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-md"
            >
              번호 초기화하기
            </button>
          </div>

          {lottoNumbersList.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                생성된 번호 ({lottoNumbersList.length}/10)
              </h2>
              <div className="space-y-4">
                {lottoNumbersList.map((numbers, listIndex) => (
                  <div key={listIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="text-sm text-gray-600 mb-2">#{listIndex + 1}</div>
                    <div className="grid grid-cols-6 gap-4">
                      {numbers.map((number, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white"
                          style={{
                            backgroundColor: getNumberColor(number),
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)",
                          }}
                        >
                          {number}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
