import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlbaniaEstate",
  description: "Premium real-estate marketplace for Albania",
  metadataBase: new URL("https://albaniaestate.example")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
