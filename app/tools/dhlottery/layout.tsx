import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로또 번호 생성기",
  description: "1-45까지의 번호 중 6개를 무작위로 선택하는 로또 번호 생성기입니다.",
  keywords: ["로또", "로또 번호", "로또 생성기", "동행복권", "랜덤 번호", "로또 추첨", "로또 번호 생성"],
  openGraph: {
    title: "로또 번호 생성기",
    description: "1-45까지의 번호 중 6개를 무작위로 선택하는 로또 번호 생성기입니다.",
    url: "https://www.yuumi.kr/tools/dhlottery",
    siteName: "유미 도구",
    images: [
      {
        url: "https://www.yuumi.kr/og-image.png", // 실제 이미지로 교체 필요
        width: 1200,
        height: 630,
        alt: "로또 번호 생성기 미리보기 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function LottoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
