import { notFound } from "next/navigation";
import CrmModulePage from "../CrmModulePage";

const modules = new Set(["musteriler", "islemler", "subeler", "personel", "hizmetler", "kasa", "yetkiler"]);

export function generateStaticParams() {
  return [...modules].map((module) => ({ module }));
}

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  if (!modules.has(module)) notFound();
  return <CrmModulePage moduleKey={module} />;
}
