import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaCRM — İşletme Yönetim Paneli",
  description: "Çok şubeli CRM ve işletme yönetim paneli demosu",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
