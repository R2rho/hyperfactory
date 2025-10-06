import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "HyperFactory - AI-Powered Smart Factory Platform",
  description: "HyperFactory by Vertec: AI-powered smart factory platform for SMB manufacturers. Phased modernization, vendor-neutral backbone, measurable ROI. Transform your manufacturing operations with cutting-edge AI technology.",
  keywords: "smart factory, manufacturing, AI, automation, Industry 4.0, IoT, digital transformation",
  authors: [{ name: "Vertec" }],
  creator: "Vertec",
  publisher: "Vertec",
  robots: "index, follow",
  openGraph: {
    title: "HyperFactory - AI-Powered Smart Factory Platform",
    description: "Transform your factory into an intelligent, connected production system with HyperFactory.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperFactory - AI-Powered Smart Factory Platform",
    description: "Transform your factory into an intelligent, connected production system with HyperFactory.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Custom Fonts from CDN */}
        <link href="https://fonts.cdnfonts.com/css/alliance-no1" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/apercu-mono-pro" rel="stylesheet" />
        {/* Preconnect to CDN fonts for performance */}
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        {/* Viewport meta tag for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
