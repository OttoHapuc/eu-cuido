import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/organisms/Navbar";
import { ModalProvider } from "@/context/ModalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eu Cuido",
  description: "Agendamento de horas para cuiados de idioso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-theme="blue"
      >
        <AuthProvider>
          <ModalProvider>
            <Navbar />
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
