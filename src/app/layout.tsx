import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TVIC",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "svg" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
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
      >
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              backgroundColor: "#0d0d0d", // deep dark background
              color: "#FFA500", // orange text
              border: "1px solid #FFA500", // subtle orange border
              fontWeight: 500,
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
