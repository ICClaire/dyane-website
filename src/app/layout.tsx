import type { Metadata } from "next";
import { Pinyon_Script, DM_Sans, Josefin_Sans } from "next/font/google";
import "./globals.css";

const pinyonScript = Pinyon_Script({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "chan.inked | Fine Line Tattoo Artist",
  description:
    "Delicate fine-line tattoo art inspired by botanicals, florals, and minimalist beauty. Based in Paris, available for bookings worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pinyonScript.variable} ${dmSans.variable} ${josefinSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
