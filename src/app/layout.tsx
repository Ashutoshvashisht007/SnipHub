import type { Metadata } from "next";
import {ClerkProvider} from '@clerk/nextjs'
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "SnipHub",
  description: "A platform for sharing and discovering code snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={poppins.className}
        >
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
