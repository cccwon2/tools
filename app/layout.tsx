import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>도구 모음</title>
        <meta name="description" content="유용한 도구들을 모아놓은 웹사이트" />
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
