"use client";

import { useMemo, useState } from "react";
import { Check, Download, Filter, Plus, Search, X } from "lucide-react";

type ModuleConfig = {
  eyebrow: string; title: string; description: string; action: string;
  metrics: [string, string, string][];
  columns: string[];
  rows: string[][];
};

const modules: Record<string, ModuleConfig> = {
  musteriler: {
    eyebrow: "CRM", title: "Müşteriler & Leadler", description: "Tüm müşteri ilişkilerini, potansiyel fırsatları ve takip adımlarını yönetin.", action: "Yeni müşteri",
    metrics: [["Toplam müşteri", "1.284", "+%12,4"], ["Yeni lead", "96", "Bu ay"], ["Takip bekleyen", "38", "Bugün"], ["Dönüşüm", "%31,8", "+4,2 puan"]],
    columns: ["Müşteri", "İletişim", "Şube", "Sorumlu", "Son işlem", "Durum"],
    rows: [["Selin Yalçın", "selin@ornek.com", "Merkez Şube", "Mert Kaya", "21 Eyl 2026", "Yeni lead"], ["Aras Teknoloji", "0212 555 24 10", "Kadıköy Şubesi", "Ece Arslan", "20 Eyl 2026", "Aktif"], ["Bora Demir", "0532 444 18 72", "Avrupa Yakası", "Selim Ak", "19 Eyl 2026", "Takipte"], ["Mavi Yapı A.Ş.", "muhasebe@maviyapi.com", "Merkez Şube", "Mert Kaya", "18 Eyl 2026", "Aktif"], ["Defne Sağlık", "0216 228 30 40", "Kadıköy Şubesi", "Ece Arslan", "17 Eyl 2026", "Teklif verildi"]],
  },
  islemler: {
    eyebrow: "OPERASYON", title: "İşlem & Sipariş Takibi", description: "Randevu, hizmet ve siparişleri başlangıçtan tamamlanmaya kadar izleyin.", action: "Yeni işlem",
    metrics: [["Bugün", "47", "9 sırada"], ["Devam eden", "124", "3 şube"], ["Tamamlanan", "892", "Bu ay"], ["İptal oranı", "%2,1", "-0,8 puan"]],
    columns: ["İşlem no", "Müşteri", "Tür", "Şube", "Tarih", "Durum"],
    rows: [["#IS-1048", "Selin Yalçın", "Danışmanlık", "Merkez Şube", "21 Eyl · 14:30", "Planlandı"], ["#IS-1047", "Aras Teknoloji", "Kurulum", "Kadıköy Şubesi", "21 Eyl · 13:00", "Devam ediyor"], ["#IS-1046", "Bora Demir", "Bakım paketi", "Avrupa Yakası", "21 Eyl · 11:45", "Tamamlandı"], ["#IS-1045", "Mavi Yapı A.Ş.", "Sipariş", "Merkez Şube", "21 Eyl · 10:15", "Hazırlanıyor"], ["#IS-1044", "Defne Sağlık", "Keşif", "Kadıköy Şubesi", "20 Eyl · 16:30", "Tamamlandı"]],
  },
  subeler: {
    eyebrow: "ORGANİZASYON", title: "Şube Yönetimi", description: "Şubelerin performansını, ekiplerini ve operasyon durumunu tek ekrandan yönetin.", action: "Yeni şube",
    metrics: [["Aktif şube", "3", "Tümü açık"], ["Toplam personel", "42", "3 şubede"], ["Aylık işlem", "1.063", "+%8,6"], ["Toplam gelir", "₺684K", "Bu ay"]],
    columns: ["Şube", "Yönetici", "Personel", "Aylık işlem", "Aylık gelir", "Durum"],
    rows: [["Merkez Şube", "Mert Kaya", "18 kişi", "486", "₺312.400", "Aktif"], ["Kadıköy Şubesi", "Ece Arslan", "14 kişi", "351", "₺228.750", "Aktif"], ["Avrupa Yakası", "Selim Ak", "10 kişi", "226", "₺143.100", "Aktif"]],
  },
  personel: {
    eyebrow: "EKİP", title: "Personel Yönetimi", description: "Personel bilgileri, görevler, şube atamaları ve performans göstergeleri.", action: "Personel ekle",
    metrics: [["Toplam personel", "42", "3 şube"], ["Görevde", "38", "Bugün"], ["Açık görev", "18", "6 kritik"], ["Ort. performans", "%91", "+%3,2"]],
    columns: ["Personel", "Pozisyon", "Şube", "Açık görev", "Performans", "Durum"],
    rows: [["Mert Kaya", "Şube Yöneticisi", "Merkez Şube", "3", "%96", "Aktif"], ["Ece Arslan", "Satış Yöneticisi", "Kadıköy Şubesi", "4", "%94", "Aktif"], ["Selim Ak", "Operasyon Uzmanı", "Avrupa Yakası", "6", "%89", "Aktif"], ["Derya Koç", "Müşteri Temsilcisi", "Merkez Şube", "2", "%92", "İzinli"], ["Can Eren", "Finans Uzmanı", "Merkez Şube", "3", "%87", "Aktif"]],
  },
  hizmetler: {
    eyebrow: "KATALOG", title: "Ürün & Hizmet Yönetimi", description: "Satışa sunulan ürünleri, hizmet paketlerini ve şube bazlı fiyatları düzenleyin.", action: "Ürün / hizmet ekle",
    metrics: [["Aktif kayıt", "86", "12 kategori"], ["Hizmet paketi", "24", "En çok satılan"], ["Ürün", "62", "8 düşük stok"], ["Ort. kâr marjı", "%38", "+%2,4"]],
    columns: ["Ürün / Hizmet", "Kategori", "Tür", "Şubeler", "Fiyat", "Durum"],
    rows: [["Kurumsal Danışmanlık", "Profesyonel Hizmet", "Hizmet", "Tüm şubeler", "₺12.500", "Aktif"], ["Premium Bakım Paketi", "Bakım", "Paket", "Tüm şubeler", "₺4.850", "Aktif"], ["Yerinde Kurulum", "Teknik Hizmet", "Hizmet", "2 şube", "₺2.400", "Aktif"], ["Başlangıç Seti", "Ürün", "Ürün", "Tüm şubeler", "₺1.750", "Aktif"], ["Yıllık Destek", "Destek", "Abonelik", "Merkez Şube", "₺18.900", "Taslak"]],
  },
  kasa: {
    eyebrow: "FİNANS", title: "Gelir · Gider · Kasa", description: "Tüm şubelerin tahsilat, ödeme ve kasa hareketlerini anlık takip edin.", action: "Kasa hareketi",
    metrics: [["Bugünkü gelir", "₺48.920", "+%14"], ["Bugünkü gider", "₺12.480", "8 kayıt"], ["Kasa bakiyesi", "₺284.650", "3 şube"], ["Bekleyen tahsilat", "₺96.800", "14 müşteri"]],
    columns: ["İşlem", "Tür", "Şube", "Cari / Kategori", "Tarih", "Tutar"],
    rows: [["#KS-2841", "Tahsilat", "Merkez Şube", "Mavi Yapı A.Ş.", "21 Eyl · 15:40", "+ ₺18.750"], ["#KS-2840", "Gider", "Kadıköy Şubesi", "Ofis gideri", "21 Eyl · 14:10", "- ₺3.280"], ["#KS-2839", "Tahsilat", "Avrupa Yakası", "Bora Demir", "21 Eyl · 12:35", "+ ₺6.400"], ["#KS-2838", "Gider", "Merkez Şube", "Tedarik", "21 Eyl · 11:20", "- ₺8.750"], ["#KS-2837", "Tahsilat", "Kadıköy Şubesi", "Defne Sağlık", "21 Eyl · 10:05", "+ ₺12.900"]],
  },
  raporlar: {
    eyebrow: "ANALİZ", title: "Raporlar", description: "Şube, personel, müşteri ve finans performansını karşılaştırmalı inceleyin.", action: "Rapor oluştur",
    metrics: [["Net gelir", "₺481K", "+%11,2"], ["Yeni müşteri", "148", "+%18"], ["İşlem hacmi", "1.063", "+%8,6"], ["Müşteri skoru", "4,8/5", "624 yanıt"]],
    columns: ["Rapor", "Kapsam", "Dönem", "Son güncelleme", "Hazırlayan", "Durum"],
    rows: [["Şube performans özeti", "Tüm şubeler", "Eylül 2026", "Bugün 09:30", "Sistem", "Hazır"], ["Gelir-gider analizi", "Tüm şubeler", "3. çeyrek", "Dün 18:10", "Can Eren", "Hazır"], ["Müşteri dönüşüm raporu", "Satış ekibi", "Eylül 2026", "20 Eyl", "Ece Arslan", "Hazır"], ["Personel performansı", "Tüm ekipler", "Ağustos 2026", "1 Eyl", "Mert Kaya", "Arşiv"]],
  },
  yetkiler: {
    eyebrow: "GÜVENLİK", title: "Rol & Yetkilendirme", description: "Kullanıcıların görebileceği şubeleri ve erişebileceği modülleri yönetin.", action: "Yeni rol",
    metrics: [["Aktif kullanıcı", "42", "5 rol"], ["Süper yönetici", "2", "Tam erişim"], ["Şube yöneticisi", "3", "Şube bazlı"], ["Son giriş", "2 dk önce", "Mert Kaya"]],
    columns: ["Rol", "Kullanıcı", "Şube erişimi", "Modül erişimi", "Son değişiklik", "Durum"],
    rows: [["Süper Yönetici", "2 kullanıcı", "Tüm şubeler", "Tüm modüller", "18 Eyl 2026", "Aktif"], ["Şube Yöneticisi", "3 kullanıcı", "Atanan şube", "7 modül", "16 Eyl 2026", "Aktif"], ["Satış Personeli", "14 kullanıcı", "Atanan şube", "4 modül", "12 Eyl 2026", "Aktif"], ["Finans Personeli", "5 kullanıcı", "Tüm şubeler", "3 modül", "8 Eyl 2026", "Aktif"], ["Operasyon", "18 kullanıcı", "Atanan şube", "4 modül", "5 Eyl 2026", "Aktif"]],
  },
  ayarlar: {
    eyebrow: "YÖNETİM", title: "Sistem Ayarları", description: "İşletme profili, bildirimler, numaralandırma ve güvenlik tercihleri.", action: "Değişiklikleri kaydet",
    metrics: [["İşletme", "NovaCRM", "Aktif"], ["Varsayılan şube", "Merkez", "İstanbul"], ["Bildirim kuralı", "12", "9 aktif"], ["Oturum süresi", "8 saat", "Güvenli"]],
    columns: ["Ayar grubu", "Açıklama", "Değer", "Kapsam", "Son değişiklik", "Durum"],
    rows: [["İşletme profili", "Marka ve iletişim bilgileri", "NovaCRM", "Global", "18 Eyl 2026", "Yapılandırıldı"], ["Bildirimler", "E-posta ve panel bildirimleri", "9 aktif kural", "Tüm şubeler", "17 Eyl 2026", "Aktif"], ["Numaralandırma", "Müşteri ve işlem kodları", "Otomatik", "Global", "12 Eyl 2026", "Aktif"], ["Güvenlik", "Oturum ve parola politikası", "Güçlü", "Global", "10 Eyl 2026", "Aktif"]],
  },
};

export default function CrmModulePage({ moduleKey }: { moduleKey: string }) {
  const page = modules[moduleKey] ?? modules.musteriler;
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const rows = useMemo(() => page.rows.filter((row) => row.some((value) => value.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr")))), [page.rows, query]);

  return <section className="module-page">
    <div className="module-head">
      <div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.description}</p></div>
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}><Plus size={15} /> {page.action}</button>
    </div>
    <div className="stats module-stats">{page.metrics.map(([label, value, note]) => <div className="card stat" key={label}><span className="k">{label}</span><strong className="v">{value}</strong><span className="sub">{note}</span></div>)}</div>
    <div className="card data-card">
      <div className="data-toolbar"><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kayıtlarda ara..." /></label><div><button className="btn btn-ghost"><Filter size={14} /> Filtrele</button><button className="btn btn-ghost"><Download size={14} /> Dışa aktar</button></div></div>
      <div className="tbl-wrap"><table className="tbl crm-table"><thead><tr>{page.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={row.join("-")} className="clickable">{row.map((value, cellIndex) => <td key={page.columns[cellIndex]}>{cellIndex === row.length - 1 ? <span className="badge st-ready">{value}</span> : cellIndex === 0 ? <b>{value}</b> : value}</td>)}</tr>)}</tbody></table></div>
      <div className="table-foot"><span>{rows.length} kayıt gösteriliyor</span><span>Demo verileri</span></div>
    </div>
    {modalOpen && <div className="modal-bg open" onMouseDown={() => setModalOpen(false)}><div className="modal crm-modal" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">YENİ KAYIT</p><h3>{page.action}</h3></div><button className="icon-btn" onClick={() => setModalOpen(false)}><X size={18} /></button></div><div className="form-grid-demo"><div className="field"><label className="lbl">Ad / Başlık</label><input className="input" placeholder="Kayıt adını girin" /></div><div className="field"><label className="lbl">Şube</label><select className="input"><option>Merkez Şube</option><option>Kadıköy Şubesi</option><option>Avrupa Yakası</option></select></div><div className="field wide"><label className="lbl">Açıklama</label><textarea className="input" rows={4} placeholder="Kısa bir not ekleyin..." /></div></div><div className="modal-actions"><button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Vazgeç</button><button className="btn btn-primary" onClick={() => setModalOpen(false)}><Check size={15} /> Demo kaydı oluştur</button></div></div></div>}
  </section>;
}

