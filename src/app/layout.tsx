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
  title: "Hotel Keur Gui | Hôtel de Luxe 5 Étoiles - Dakar, Sénégal",
  description: "Découvrez Hotel Keur Gui, un hôtel de luxe 5 étoiles à Dakar. L'excellence de l'hospitalité sénégalaise avec des suites élégantes, spa premium et vue sur l'océan Atlantique.",
  keywords: ["hôtel luxe Dakar", "hôtel 5 étoiles Sénégal", "Keur Gui", "spa hôtel Afrique", "séjour luxe Sénégal"],
  authors: [{ name: "Hotel Keur Gui" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Hotel Keur Gui | Hôtel de Luxe 5 Étoiles",
    description: "L'excellence de l'hospitalité sénégalaise au cœur de Dakar",
    url: "https://hotelkeurgui.com",
    siteName: "Hotel Keur Gui",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Keur Gui | Hôtel de Luxe 5 Étoiles",
    description: "L'excellence de l'hospitalité sénégalaise au cœur de Dakar",
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
