import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Pearl Resort | Hôtel de Luxe 5 Étoiles - Dakar, Sénégal",
  description: "Découvrez The Pearl Resort, un hôtel de luxe 5 étoiles à Dakar. Suites élégantes, spa premium, gastronomie raffinée et vue imprenable sur l'océan Atlantique.",
  keywords: ["hôtel luxe Dakar", "resort 5 étoiles Sénégal", "spa hôtel Afrique", "séjour luxe Afrique", "The Pearl Resort"],
  authors: [{ name: "The Pearl Resort" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "The Pearl Resort | Hôtel de Luxe 5 Étoiles",
    description: "L'excellence de l'hôtellerie de luxe au cœur de l'Afrique",
    url: "https://thepearlresort.com",
    siteName: "The Pearl Resort",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pearl Resort | Hôtel de Luxe 5 Étoiles",
    description: "L'excellence de l'hôtellerie de luxe au cœur de l'Afrique",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
