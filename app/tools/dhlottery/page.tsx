"use client";

import { useState, useEffect } from "react";
import LottoBall from "../../components/LottoBall";
import lottoData from "../../../public/lottoNum.json";

interface LottoResult {
  totSellamnt: number;
  returnValue: string;
  drwNoDate: string;
  firstWinamnt: number;
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
  drwNo: number;
  firstPrzwnerCo: number;
  firstAccumamnt: number;
}

export default function LottoPage() {
  const [lottoNumbersList, setLottoNumbersList] = useState<number[][]>([]);
  const [latestLottoResult, setLatestLottoResult] = useState<LottoResult | null>(null);
  const [isLoadingLatest, setIsLoadingLatest] = useState(false);

  const generateLottoNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(n)) numbers.push(n);
    }
    setLottoNumbersList((prev) => [[...numbers.sort((a, b) => a - b)], ...prev].slice(0, 10));
  };

  const clearLottoNumbers = () => setLottoNumbersList([]);

  const getCurrentDrawNumber = () => {
    const baseDate = new Date("2025-06-28T21:00:00+09:00");
    const baseDrawNo = 1178;
    const now = new Date();

    const thisSaturday = new Date(now);
    thisSaturday.setDate(now.getDate() + (6 - now.getDay()));
    thisSaturday.setHours(21, 0, 0, 0);

    let weeksDiff = Math.floor((thisSaturday.getTime() - baseDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    if (now < thisSaturday) weeksDiff -= 1;

    return baseDrawNo + weeksDiff;
  };

  const fetchLatestLottoResult = async () => {
    setIsLoadingLatest(true);
    try {
      const currentDrawNo = getCurrentDrawNumber();
      const res = await fetch(`/api/lotto?drwNo=${currentDrawNo}`);
      const data = await res.json();
      if (data.returnValue === "success") {
        setLatestLottoResult(data);
      } else {
        const resPrev = await fetch(`/api/lotto?drwNo=${currentDrawNo - 1}`);
        const dataPrev = await resPrev.json();
        if (dataPrev.returnValue === "success") {
          setLatestLottoResult(dataPrev);
        }
      }
    } catch (err) {
      console.error("로또 결과 불러오기 실패:", err);
    } finally {
      setIsLoadingLatest(false);
    }
  };

  // 최근 10회 자주 나온 번호 + 홀짝 3:3 생성 함수
  const generatePatternLottoNumbers = () => {
    // 최근 10회 데이터 추출
    const recent10 = lottoData.lottoResults.slice(0, 10);
    // 번호별 빈도 계산
    const freq: Record<number, number> = {};
    for (const round of recent10) {
      for (let i = 1; i <= 6; i++) {
        const n = round[`drwtNo${i}`];
        freq[n] = (freq[n] || 0) + 1;
      }
    }
    // 빈도순 정렬 (내림차순)
    const sorted = Object.entries(freq)
      .map(([num, count]) => ({ num: Number(num), count }))
      .sort((a, b) => b.count - a.count || a.num - b.num);
    // 상위 20개 번호 후보군(홀/짝 분리)
    const topNums = sorted.slice(0, 20).map((v) => v.num);
    const even = topNums.filter((n) => n % 2 === 0);
    const odd = topNums.filter((n) => n % 2 === 1);
    // 홀짝 3:3 랜덤 추출
    const pickRandom = (arr: number[], cnt: number) => {
      const copy = [...arr];
      const res: number[] = [];
      while (res.length < cnt && copy.length > 0) {
        const idx = Math.floor(Math.random() * copy.length);
        res.push(copy[idx]);
        copy.splice(idx, 1);
      }
      return res;
    };
    const pickOdd = pickRandom(odd, 3);
    const pickEven = pickRandom(even, 3);
    const result = [...pickOdd, ...pickEven].sort((a, b) => a - b);
    setLottoNumbersList((prev) => [result, ...prev].slice(0, 10));
  };

  useEffect(() => {
    fetchLatestLottoResult();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 space-y-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">🎰 로또 번호 생성기</h1>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">1~45 중 중복 없는 6개 번호 무작위 추첨</p>
            <a
              href="https://dhlottery.co.kr/gameResult.do?method=byWin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              🏆 동행복권 당첨번호 확인하기
            </a>
          </div>

          {/* 최신 당첨번호 */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">🎯 최신 당첨번호</h2>
            {isLoadingLatest ? (
              <p className="text-gray-500">로딩 중...</p>
            ) : latestLottoResult ? (
              <>
                <div className="flex justify-center flex-wrap items-center" style={{ gap: "10px" }}>
                  {[
                    latestLottoResult.drwtNo1,
                    latestLottoResult.drwtNo2,
                    latestLottoResult.drwtNo3,
                    latestLottoResult.drwtNo4,
                    latestLottoResult.drwtNo5,
                    latestLottoResult.drwtNo6,
                  ].map((num, i) => (
                    <LottoBall key={i} number={num} size="lg" />
                  ))}
                  <span className="text-xl font-bold text-black">+</span>
                  <LottoBall number={latestLottoResult.bnusNo} size="lg" />
                </div>
                <div className="text-sm text-gray-500">
                  {latestLottoResult.drwNo}회차 ({latestLottoResult.drwNoDate})
                </div>
              </>
            ) : (
              <p className="text-gray-500">당첨번호를 불러올 수 없습니다</p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex flex-row gap-4 bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-2xl shadow-inner border border-blue-200 mb-2 w-full max-w-2xl mx-auto items-stretch justify-center">
            <button
              onClick={generateLottoNumbers}
              className="flex-1 min-w-[160px] max-w-xs flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md border-2 border-blue-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-300 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-purple-300 px-4"
            >
              <span className="text-2xl">🎲</span>
              <span>무작위 번호</span>
            </button>
            <button
              onClick={generatePatternLottoNumbers}
              className="flex-1 min-w-[160px] max-w-xs flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-3 rounded-lg shadow-md border-2 border-green-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-green-300 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-lime-300 px-4"
            >
              <span className="text-2xl">⭐️</span>
              <span>최근 10회 + 홀짝 3:3</span>
            </button>
            <button
              onClick={clearLottoNumbers}
              className="flex-1 min-w-[160px] max-w-xs flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-lg shadow-md border-2 border-pink-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-pink-300 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-red-300 px-4"
            >
              <span className="text-2xl">♻️</span>
              <span>초기화</span>
            </button>
          </div>

          {/* 생성된 번호 리스트 */}
          {lottoNumbersList.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700 text-center">
                생성된 번호 ({lottoNumbersList.length}/10)
              </h3>
              {lottoNumbersList.map((row, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="text-xs text-gray-400 mb-2">#{idx + 1}</div>
                  <div className="flex flex-wrap justify-center" style={{ gap: "10px" }}>
                    {row.map((num, i) => (
                      <LottoBall key={i} number={num} size="md" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
