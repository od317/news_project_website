// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/root layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "منصة الأخبار - آخر الأخبار والتحقيقات",
    template: "%s | منصة الأخبار",
  },
  description:
    "ابق على اطلاع بآخر الأخبار والتحقيقات الحصرية والتقارير الشاملة من صحفيين موثوقين حول العالم.",
  keywords: ["أخبار", "تحقيقات", "أخبار عاجلة", "صحافة", "تقارير"],
  authors: [{ name: "منصة الأخبار" }],
  creator: "منصة الأخبار",
  publisher: "منصة الأخبار",
  metadataBase: new URL("https://newsportal.com"),
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "https://newsportal.com",
    title: "منصة الأخبار - آخر الأخبار والتحقيقات",
    description:
      "ابق على اطلاع بآخر الأخبار والتحقيقات الحصرية والتقارير الشاملة من صحفيين موثوقين حول العالم.",
    siteName: "منصة الأخبار",
  },
  twitter: {
    card: "summary_large_image",
    title: "منصة الأخبار - آخر الأخبار والتحقيقات",
    description:
      "ابق على اطلاع بآخر الأخبار والتحقيقات الحصرية والتقارير الشاملة من صحفيين موثوقين حول العالم.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} min-h-screen bg-background text-foreground ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
