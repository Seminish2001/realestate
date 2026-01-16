import { locales } from "@/lib/i18n";

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold text-slate-900">{locale === "sq" ? "Rreth nesh" : "About us"}</h1>
      <p className="mt-4 text-slate-600">
        {locale === "sq"
          ? "AlbaniaEstate është marketplace i pronave për Shqipërinë, me fokus te transparenca, agjentët e verifikuar dhe kërkimi inteligjent."
          : "AlbaniaEstate is Albania's premium property marketplace focused on transparency, verified agents, and smart search."}
      </p>
    </div>
  );
}
