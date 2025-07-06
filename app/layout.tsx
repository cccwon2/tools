import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>도구 모음 - 유용한 웹 도구들을 한 곳에서</title>
        <meta
          name="description"
          content="로또 번호 생성기 등 유용한 도구들을 모아놓은 웹사이트입니다. 다양한 실용적인 도구를 무료로 사용해보세요."
        />
        <meta name="keywords" content="도구, 로또, 번호 생성기, 웹 도구, 유틸리티" />
        <meta name="author" content="Yuumi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.yuumi.kr/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yuumi.kr/" />
        <meta property="og:title" content="도구 모음 - 유용한 웹 도구들을 한 곳에서" />
        <meta property="og:description" content="로또 번호 생성기 등 유용한 도구들을 모아놓은 웹사이트입니다." />
        <meta property="og:image" content="https://www.yuumi.kr/og-image.jpg" />
        <meta property="og:site_name" content="도구 모음" />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.yuumi.kr/" />
        <meta property="twitter:title" content="도구 모음 - 유용한 웹 도구들을 한 곳에서" />
        <meta property="twitter:description" content="로또 번호 생성기 등 유용한 도구들을 모아놓은 웹사이트입니다." />
        <meta property="twitter:image" content="https://www.yuumi.kr/og-image.jpg" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9XM27FLSHV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9XM27FLSHV');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
