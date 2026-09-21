import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PanelShell, { type IconName } from "./PanelShell";

type RoleKey = "super_admin" | "admin" | "branch_manager" | "sales" | "finance";

const navigation = [
  ["Çalışma Alanı", [["/panel", "dashboard", "Genel Bakış"], ["/panel/musteriler", "customers", "Müşteriler & Leadler"], ["/panel/islemler", "operations", "İşlem & Siparişler"]]],
  ["Organizasyon", [["/panel/subeler", "branches", "Şube Yönetimi"], ["/panel/personel", "staff", "Personel Yönetimi"], ["/panel/hizmetler", "services", "Ürün & Hizmetler"]]],
  ["Finans & Yönetim", [["/panel/kasa", "cash", "Gelir · Gider · Kasa"], ["/panel/raporlar", "reports", "Raporlar"], ["/panel/yetkiler", "roles", "Rol & Yetkiler"], ["/panel/ayarlar", "settings", "Sistem Ayarları"]]],
] as const;

const access: Record<RoleKey, string[]> = {
  super_admin: ["/panel", "/panel/musteriler", "/panel/islemler", "/panel/subeler", "/panel/personel", "/panel/hizmetler", "/panel/kasa", "/panel/raporlar", "/panel/yetkiler", "/panel/ayarlar"],
  admin: ["/panel", "/panel/musteriler", "/panel/islemler", "/panel/subeler", "/panel/personel", "/panel/hizmetler", "/panel/kasa", "/panel/raporlar", "/panel/ayarlar"],
  branch_manager: ["/panel", "/panel/musteriler", "/panel/islemler", "/panel/personel", "/panel/hizmetler", "/panel/raporlar"],
  sales: ["/panel", "/panel/musteriler", "/panel/islemler"],
  finance: ["/panel", "/panel/kasa", "/panel/raporlar"],
};

const labels: Record<RoleKey, string> = {
  super_admin: "Süper Yönetici",
  admin: "Admin",
  branch_manager: "Şube Yöneticisi",
  sales: "Satış Personeli",
  finance: "Finans Personeli",
};

export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const roleValue = (await cookies()).get("novacrm_role")?.value as RoleKey | undefined;
  if (!roleValue || !access[roleValue]) redirect("/login");
  const allowed = access[roleValue];
  const visibleNavigation = navigation
    .map(([group, items]) => [group, items.filter(([href]) => allowed.includes(href)).map(([href, icon, label]) => [href, icon as IconName, label] as const)] as const)
    .filter(([, items]) => items.length);
  return <PanelShell navigation={visibleNavigation} roleLabel={labels[roleValue]} brandName="NovaCRM">{children}</PanelShell>;
}

