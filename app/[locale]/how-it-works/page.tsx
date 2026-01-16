import { locales } from "@/lib/i18n";

export default function HowItWorksPage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold text-slate-900">{locale === "sq" ? "Si funksionon" : "How it works"}</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          {
            title: locale === "sq" ? "Kërko" : "Search",
            body: locale === "sq" ? "Filtro prona sipas qytetit, çmimit dhe tipit." : "Filter listings by city, price, and type."
          },
          {
            title: locale === "sq" ? "Kontakto" : "Contact",
            body: locale === "sq" ? "Dërgo kërkesë me email ose WhatsApp." : "Send a lead via email or WhatsApp."
          },
          {
            title: locale === "sq" ? "Merr ofertën" : "Close",
            body: locale === "sq" ? "Agjenti të udhëheq deri në mbyllje." : "Agents guide you from visit to closing."
          }
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
