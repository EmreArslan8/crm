"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3, BriefcaseBusiness, Building2, CalendarCheck, CircleDollarSign,
  LayoutDashboard, LogOut, Menu, PackageOpen, Settings, ShieldCheck,
  UserRoundCog, UsersRound, X, type LucideIcon,
} from "lucide-react";

export type IconName = "dashboard" | "customers" | "operations" | "branches" | "staff" | "services" | "cash" | "reports" | "settings" | "roles";
type NavItem = readonly [href: string, icon: IconName, label: string];
type NavGroup = readonly [group: string, items: readonly NavItem[]];

const icons: Record<IconName, LucideIcon> = {
  dashboard: LayoutDashboard, customers: UsersRound, operations: CalendarCheck,
  branches: Building2, staff: UserRoundCog, services: PackageOpen,
  cash: CircleDollarSign, reports: BarChart3, settings: Settings, roles: ShieldCheck,
};

function NavIcon({ name }: { name: IconName }) {
  const Icon = icons[name];
  return <Icon size={17} strokeWidth={1.8} className="nav-icon" aria-hidden="true" />;
}

export default function PanelShell({ children, navigation, roleLabel, brandName }: { children: React.ReactNode; navigation: readonly NavGroup[]; roleLabel: string; brandName: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [branch, setBranch] = useState("Tüm Şubeler");
  const pathname = usePathname();

  useEffect(() => { setIsNavigating(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { window.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [menuOpen]);

  function closeMenu() { setMenuOpen(false); }
  return <div className="layout">
    {isNavigating && <div className="route-progress" role="progressbar" aria-label="Sayfa yükleniyor" />}
    {menuOpen && <button className="sidebar-backdrop" aria-label="Menüyü kapat" onClick={closeMenu} />}
    <aside className={`sidebar${menuOpen ? " open" : ""}`}>
      <div className="brand"><span className="logo-mark"><BriefcaseBusiness size={15} /></span> {brandName}<button className="sidebar-close" type="button" aria-label="Menüyü kapat" onClick={closeMenu}><X className="ic" /></button></div>
      <div className="workspace-chip"><span>Demo çalışma alanı</span><b>Merkez Operasyon</b></div>
      {navigation.map(([group, items]) => <div className="nav-group" key={group}><div className="lab">{group}</div><nav>{items.map(([href, icon, label]) => { const active = href === "/panel" ? pathname === href : pathname.startsWith(href); return <Link className={active ? "active" : undefined} aria-current={active ? "page" : undefined} href={href} key={href} onClick={() => { setIsNavigating(true); closeMenu(); }}><NavIcon name={icon} /><span>{label}</span></Link>; })}</nav></div>)}
      <div className="foot"><button className="sidebar-logout" type="button" onClick={() => { document.cookie = "novacrm_role=; path=/; max-age=0"; window.location.assign("/login"); }}><LogOut className="sidebar-logout-icon" size={15} strokeWidth={1.9} /> Rol değiştir / çıkış</button><span>CRM demo · v1.0</span></div>
    </aside>
    <div className="main">
      <header className="appbar">
        <button className="menu-btn" type="button" aria-label="Menüyü aç" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Menu className="ic" /></button>
        <div className="appbar-title"><div className="crumb">{brandName} / İşletme Yönetimi</div></div>
        <div className="spacer" />
        <label className="branch-filter"><Building2 size={14} /><select value={branch} onChange={(event) => setBranch(event.target.value)} aria-label="Şube seç"><option>Tüm Şubeler</option><option>Merkez Şube</option><option>Kadıköy Şubesi</option><option>Avrupa Yakası</option></select></label>
        <span className="pill role-pill">{roleLabel}</span>
      </header>
      <div className="page-body">{children}</div>
    </div>
  </div>;
}
