import Link from "next/link";
import { ArrowUpRight, CalendarClock, CircleCheck, Plus, TrendingUp, UsersRound } from "lucide-react";

const activity = [
  ["Yeni müşteri kaydı", "Selin Yalçın", "Merkez Şube", "4 dk önce", "Yeni"],
  ["Hizmet işlemi tamamlandı", "Aras Teknoloji", "Kadıköy Şubesi", "18 dk önce", "Tamamlandı"],
  ["Tahsilat alındı", "Mavi Yapı A.Ş.", "Merkez Şube", "42 dk önce", "₺18.750"],
  ["Takip görüşmesi planlandı", "Bora Demir", "Avrupa Yakası", "1 sa önce", "Planlandı"],
];

export default function PanelPage() {
  return <section className="dashboard-shell">
    <div className="dashboard-hero">
      <div><p className="crumb">21 Eylül 2026 · Pazartesi</p><h1>İşletmenin nabzı burada.</h1><p>Şubeler, müşteriler ve finansal hareketler tek çalışma alanında.</p></div>
      <div className="hero-actions"><Link href="/panel/musteriler" className="btn btn-ghost"><UsersRound size={15} /> Müşterileri gör</Link><button className="btn btn-primary"><Plus size={15} /> Yeni işlem</button></div>
    </div>
    <div className="stats crm-stats">
      <div className="card stat"><div className="stat-top"><span className="k">Aktif müşteri</span><UsersRound size={17} /></div><div className="v">1.284</div><div className="trend up"><TrendingUp size={13} /> %12,4 bu ay</div></div>
      <div className="card stat"><div className="stat-top"><span className="k">Bugünkü işlem</span><CalendarClock size={17} /></div><div className="v accent">47</div><div className="sub">9 işlem sırada</div></div>
      <div className="card stat"><div className="stat-top"><span className="k">Aylık gelir</span><TrendingUp size={17} /></div><div className="v">₺684.250</div><div className="trend up">Hedefin %82&apos;si</div></div>
      <div className="card stat"><div className="stat-top"><span className="k">Dönüşüm oranı</span><CircleCheck size={17} /></div><div className="v">%31,8</div><div className="trend up">+4,2 puan</div></div>
    </div>
    <div className="dashboard-grid">
      <div className="card card-pad activity-card">
        <div className="section-head"><div><p className="eyebrow">CANLI AKIŞ</p><h3>Son hareketler</h3></div><span className="live-dot">Canlı</span></div>
        <div className="activity-list">{activity.map(([title, customer, branch, time, status]) => <div className="activity-row" key={title + customer}><span className="activity-mark" /><div><b>{title}</b><span>{customer} · {branch}</span></div><div className="activity-meta"><span className="badge st-ready">{status}</span><small>{time}</small></div></div>)}</div>
        <Link href="/panel/islemler" className="text-link">Tüm hareketleri görüntüle <ArrowUpRight size={14} /></Link>
      </div>
      <div className="card card-pad branch-card">
        <p className="eyebrow">ŞUBE PERFORMANSI</p><h3>Bu ayın görünümü</h3>
        <div className="branch-bars">
          <div><span><b>Merkez Şube</b><em>₺312.400</em></span><i style={{ width: "91%" }} /></div>
          <div><span><b>Kadıköy Şubesi</b><em>₺228.750</em></span><i style={{ width: "72%" }} /></div>
          <div><span><b>Avrupa Yakası</b><em>₺143.100</em></span><i style={{ width: "49%" }} /></div>
        </div>
        <div className="mini-summary"><span><small>Açık görev</small><b>18</b></span><span><small>Bekleyen tahsilat</small><b>₺96.800</b></span></div>
      </div>
    </div>
  </section>;
}
