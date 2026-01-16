import { locales } from "@/lib/i18n";

export default function GuidesPage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";

  const guides = [
    {
      title: locale === "sq" ? "Si të financosh blerjen" : "How to finance your purchase",
      body: locale === "sq" ? "Krahaso bankat lokale dhe kostot e hipotekës." : "Compare local banks and mortgage costs."
    },
    {
      title: locale === "sq" ? "Zgjedhja e zonës" : "Choosing the right neighborhood",
      body: locale === "sq" ? "Analizo aksesin, shërbimet dhe shkollat." : "Evaluate access, amenities, and schools."
    },
    {
      title: locale === "sq" ? "Çfarë të pyesësh agjentin" : "Questions to ask agents",
      body: locale === "sq" ? "Transparencë për dokumentacionin dhe pagesat." : "Ask about legal docs and fees."
    }
  ];

  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold text-slate-900">{locale === "sq" ? "Guidat" : "Guides"}</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {guides.map((guide) => (
          <article key={guide.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-slate-900">{guide.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{guide.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
