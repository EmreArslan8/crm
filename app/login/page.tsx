"use client";

import { BriefcaseBusiness, Building2, Calculator, Crown, ShieldCheck, TrendingUp, UserRoundCog } from "lucide-react";

const people = [
  { role: "super_admin", name: "Emre Arslan", title: "Süper Yönetici", branch: "Tüm şubeler", initials: "EA", icon: Crown, tone: "blue" },
  { role: "admin", name: "Mert Kaya", title: "Admin", branch: "Tüm şubeler", initials: "MK", icon: ShieldCheck, tone: "navy" },
  { role: "branch_manager", name: "Ece Arslan", title: "Şube Yöneticisi", branch: "Kadıköy Şubesi", initials: "EÇ", icon: Building2, tone: "green" },
  { role: "sales", name: "Selin Ak", title: "Satış Personeli", branch: "Merkez Şube", initials: "SA", icon: TrendingUp, tone: "amber" },
  { role: "finance", name: "Can Eren", title: "Finans Personeli", branch: "Tüm şubeler", initials: "CE", icon: Calculator, tone: "violet" },
];

export default function LoginPage() {
  function login(role: string) {
    document.cookie = `novacrm_role=${role}; path=/; max-age=86400; SameSite=Lax`;
    window.location.assign("/panel");
  }
  return <main className="role-login">
    <header className="role-login-head"><div className="login-brand dark"><span><BriefcaseBusiness size={18} /></span> NovaCRM</div><span className="demo-label">İNTERAKTİF UI DEMO</span></header>
    <section className="role-intro"><p className="eyebrow">ROL BAZLI ERİŞİM</p><h1>Paneli kimin gözünden<br />incelemek istersiniz?</h1><p>Her kullanıcı yalnızca görev alanına ait modülleri görür. Bir demo personeli seçerek devam edin.</p></section>
    <section className="role-grid">{people.map((person) => { const Icon = person.icon; return <button className="role-card" key={person.role} onClick={() => login(person.role)}><span className={`role-avatar ${person.tone}`}>{person.initials}</span><span className="role-copy"><b>{person.name}</b><span><Icon size={13} /> {person.title}</span><small>{person.branch}</small></span><span className="role-enter">Panele gir <b>→</b></span></button>; })}</section>
    <footer className="role-footer"><span><UserRoundCog size={14} /> Yetkiler seçilen role göre otomatik uygulanır.</span><span>Mock veri · Gerçek kullanıcı bilgisi içermez</span></footer>
  </main>;
}

