import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/hooks/providers";


export const metadata: Metadata = {
  title: "Pokémons",
  description: "Pokemon Universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[url('/images/noise2.svg')] bg-no-repeat bg-cover min-h-screen bg-fixed">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
