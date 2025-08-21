

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../components/redux/ReduxProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CV Maker",
  description: "Create your professional CV easily",
  icons: {
    icon: "/cvicon.svg",
    shortcut: "/cvicon.svg",
    apple: "/cvicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
 
      <ReduxProvider>
        {children}
      </ReduxProvider>
      </body>
    </html>
  );
}
