import PanelShell, { type IconName, type RoleKey } from "./PanelShell";

const all: readonly RoleKey[] = ["super_admin", "admin", "branch_manager", "sales", "finance"];
const managers: readonly RoleKey[] = ["super_admin", "admin", "branch_manager"];
const admins: readonly RoleKey[] = ["super_admin", "admin"];

const navigation = [
  ["Çalışma Alanı", [["/panel", "dashboard", "Genel Bakış", all], ["/panel/musteriler", "customers", "Müşteriler & Leadler", ["super_admin", "admin", "branch_manager", "sales"]], ["/panel/islemler", "operations", "İşlem & Siparişler", ["super_admin", "admin", "branch_manager", "sales"]]]],
  ["Organizasyon", [["/panel/subeler", "branches", "Şube Yönetimi", admins], ["/panel/personel", "staff", "Personel Yönetimi", managers], ["/panel/hizmetler", "services", "Ürün & Hizmetler", managers]]],
  ["Finans & Yönetim", [["/panel/kasa", "cash", "Gelir · Gider · Kasa", ["super_admin", "admin", "finance"]], ["/panel/raporlar", "reports", "Raporlar", ["super_admin", "admin", "branch_manager", "finance"]], ["/panel/yetkiler", "roles", "Rol & Yetkiler", ["super_admin"]], ["/panel/ayarlar", "settings", "Sistem Ayarları", admins]]],
] as const;

export default function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const typedNavigation = navigation.map(([group, items]) => [group, items.map(([href, icon, label, roles]) => [href, icon as IconName, label, roles as readonly RoleKey[]] as const)] as const);
  return <PanelShell navigation={typedNavigation} brandName="NovaCRM">{children}</PanelShell>;
}

