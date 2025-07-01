import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>도구 모음</title>
        <meta name="description" content="유용한 도구들을 모아놓은 웹사이트" />
      </head>
      <body>{children}</body>
    </html>
  );
}
