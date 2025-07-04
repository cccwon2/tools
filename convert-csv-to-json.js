const fs = require("fs");
const path = require("path");

// CSV 파일 읽기
const csvPath = path.join(__dirname, "public", "lottoNum.csv");
const jsonPath = path.join(__dirname, "public", "lottoNum.json");

try {
  const csvData = fs.readFileSync(csvPath, "utf8");
  const lines = csvData.trim().split("\n");

  const lottoResults = lines.map((line) => {
    const [drwNo, drwNoDate, drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6, bnusNo] = line.split(",");

    return {
      drwNo: parseInt(drwNo),
      drwNoDate: drwNoDate,
      drwtNo1: parseInt(drwtNo1),
      drwtNo2: parseInt(drwtNo2),
      drwtNo3: parseInt(drwtNo3),
      drwtNo4: parseInt(drwtNo4),
      drwtNo5: parseInt(drwtNo5),
      drwtNo6: parseInt(drwtNo6),
      bnusNo: parseInt(bnusNo),
      returnValue: "success",
    };
  });

  const jsonData = {
    lottoResults: lottoResults,
  };

  // JSON 파일로 저장
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), "utf8");
  console.log(`✅ CSV 데이터를 JSON으로 변환 완료!`);
  console.log(`📁 저장 위치: ${jsonPath}`);
  console.log(`📊 총 ${lottoResults.length}개의 로또 결과 데이터 변환됨`);
} catch (error) {
  console.error("❌ 변환 중 오류 발생:", error.message);
}
