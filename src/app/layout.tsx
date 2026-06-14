import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FloatingParticles from '@/components/FloatingParticles';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poorfolio of Sup", 
  description: "Asthetic buh buh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {/* 1. Gọi Component hạt lơ lửng ở đây để nó phủ làm hình nền */}
        <FloatingParticles />

        {/* 2. Nội dung chính của các trang web */}
        {children}
      </body>
    </html>
  );
}