import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";  // Import Head from next/head
import React from "react";
import { Toaster } from "sonner"

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GSIM",
  description: "Good Shepherd Institute Of Music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <React.StrictMode>{children}</React.StrictMode> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
