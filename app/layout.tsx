import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pallav Deshmukh — Mission Control",
  description:
    "Electronics & Telecommunication engineering student building full-stack products, intelligent systems, and applied AI projects.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Pallav Deshmukh — Mission Control",
    description:
      "Electronics & Telecommunication engineering student building full-stack products, intelligent systems, and applied AI projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
