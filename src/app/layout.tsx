import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import GlobalContextProvider from "../../ContextApi";
import "./globals.css";
import ClerkWrapper from "./components/ClerkWrapper";

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
      <ClerkWrapper>
        <GlobalContextProvider>
          <body
            className={poppins.className}
          >
            {children}
          </body>
        </GlobalContextProvider>
      </ClerkWrapper>
    </html>
  );
}
