import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로또 번호 생성기",
  description: "1-45까지의 번호 중 6개를 무작위로 선택하는 로또 번호 생성기입니다.",
};

export default function LottoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
