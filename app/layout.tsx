import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  title: "ClockSync - Sync Clocks, Schedule Easy",
  description: "The simplest way to coordinate meetings across time zones. Share a link, and everyone sees their local time. No accounts, no downloads, no complexity.",
  keywords: ["timezone", "scheduling", "meetings", "remote teams", "time coordination", "clock sync"],
  authors: [{ name: "Vinod Jangid", url: "https://github.com/vinodjangid07" }],
  creator: "Vinod Jangid",
  openGraph: {
    title: "ClockSync - Sync Clocks, Schedule Easy",
    description: "The simplest way to coordinate meetings across time zones. Share a link, and everyone sees their local time.",
    url: "https://clocksync.netlify.app",
    siteName: "ClockSync",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "ClockSync - Time Zone Coordination Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClockSync - Sync Clocks, Schedule Easy",
    description: "The simplest way to coordinate meetings across time zones. Share a link, and everyone sees their local time.",
    images: ["/preview.png"],
    creator: "@vinodjangid07",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-zinc-50`}
      >
        <div className="min-h-screen w-full flex items-center justify-center px-6">
          <div className="w-full max-w-4xl">{children}</div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
