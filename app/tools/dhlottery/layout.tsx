import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로또 번호 생성기 - 도구 모음",
  description: "무작위로 로또 번호를 생성해주는 도구입니다. 6개의 번호를 자동으로 생성하여 로또 구매에 참고하세요.",
  keywords: "로또, 번호 생성기, 로또 번호, 무작위 번호, 복권",
  openGraph: {
    title: "로또 번호 생성기 - 도구 모음",
    description: "무작위로 로또 번호를 생성해주는 도구입니다.",
    url: "https://www.yuumi.kr/tools/dhlottery",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "로또 번호 생성기 - 도구 모음",
    description: "무작위로 로또 번호를 생성해주는 도구입니다.",
  },
};

export default function LottoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
