import PanelShell, { type IconName } from "./PanelShell";

const navigation = [
  ["Çalışma Alanı", [["/panel", "dashboard", "Genel Bakış"], ["/panel/musteriler", "customers", "Müşteriler & Leadler"], ["/panel/islemler", "operations", "İşlem & Siparişler"]]],
  ["Organizasyon", [["/panel/subeler", "branches", "Şube Yönetimi"], ["/panel/personel", "staff", "Personel Yönetimi"], ["/panel/hizmetler", "services", "Ürün & Hizmetler"]]],
  ["Finans & Yönetim", [["/panel/kasa", "cash", "Gelir · Gider · Kasa"], ["/panel/raporlar", "reports", "Raporlar"], ["/panel/yetkiler", "roles", "Rol & Yetkiler"], ["/panel/ayarlar", "settings", "Sistem Ayarları"]]],
] as const;

export default function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const visibleNavigation = navigation.map(([group, items]) => [group, items.map(([href, icon, label]) => [href, icon as IconName, label] as const)] as const);
  return <PanelShell navigation={visibleNavigation} roleLabel="Süper Yönetici" brandName="NovaCRM">{children}</PanelShell>;
}
