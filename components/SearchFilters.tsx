"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const cities = ["Tirana", "Durrës", "Vlorë", "Sarandë", "Shkodër", "Elbasan"];

const labels = {
  sq: {
    intent: "Qëllimi",
    type: "Tipi i pronës",
    city: "Qyteti",
    minPrice: "Çmimi min (€)",
    maxPrice: "Çmimi max (€)",
    bedrooms: "Dhoma gjumi",
    bathrooms: "Banjo",
    sizeMin: "Sipërfaqe min (m²)",
    sizeMax: "Sipërfaqe max (m²)",
    listedWithin: "Publikuar",
    sort: "Renditja",
    update: "Përditëso kërkimin",
    clear: "Pastro filtrat",
    furnished: "E mobiluar",
    newBuild: "Ndërtim i ri",
    beachfront: "Bregdet",
    parking: "Parkim",
    any: "Çdo kohë"
  },
  en: {
    intent: "Intent",
    type: "Property type",
    city: "City",
    minPrice: "Min price (€)",
    maxPrice: "Max price (€)",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    sizeMin: "Area min (m²)",
    sizeMax: "Area max (m²)",
    listedWithin: "Listed within",
    sort: "Sort",
    update: "Update search",
    clear: "Clear filters",
    furnished: "Furnished",
    newBuild: "New build",
    beachfront: "Beachfront",
    parking: "Parking",
    any: "Anytime"
  },
  it: {
    intent: "Intento",
    type: "Tipo proprietà",
    city: "Città",
    minPrice: "Prezzo min (€)",
    maxPrice: "Prezzo max (€)",
    bedrooms: "Camere",
    bathrooms: "Bagni",
    sizeMin: "Area min (m²)",
    sizeMax: "Area max (m²)",
    listedWithin: "Inserito",
    sort: "Ordina",
    update: "Aggiorna ricerca",
    clear: "Cancella filtri",
    furnished: "Arredato",
    newBuild: "Nuova costruzione",
    beachfront: "Fronte mare",
    parking: "Parcheggio",
    any: "Qualsiasi"
  }
};

export default function SearchFilters({ locale }: { locale: string }) {
  const t = labels[locale as keyof typeof labels] ?? labels.en;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const action = useMemo(() => pathname ?? `/${locale}/search`, [pathname, locale]);

  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.intent}</label>
          <select name="intent" defaultValue={searchParams.get("intent") ?? ""} className="mt-1 w-full rounded-xl border-slate-200">
            <option value="">{locale === "sq" ? "Blerje ose qira" : "Buy or rent"}</option>
            <option value="SALE">Buy</option>
            <option value="RENT">Rent</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.type}</label>
          <select name="type" defaultValue={searchParams.get("type") ?? ""} className="mt-1 w-full rounded-xl border-slate-200">
            <option value="">{locale === "sq" ? "Të gjitha" : "All"}</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="LAND">Land</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="VACATION">Vacation</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.city}</label>
          <select name="city" defaultValue={searchParams.get("city") ?? ""} className="mt-1 w-full rounded-xl border-slate-200">
            <option value="">{locale === "sq" ? "Të gjitha qytetet" : "All cities"}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.minPrice}</label>
          <input name="priceMin" defaultValue={searchParams.get("priceMin") ?? ""} className="mt-1 w-full rounded-xl border-slate-200" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.maxPrice}</label>
          <input name="priceMax" defaultValue={searchParams.get("priceMax") ?? ""} className="mt-1 w-full rounded-xl border-slate-200" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.bedrooms}</label>
          <input name="bedrooms" defaultValue={searchParams.get("bedrooms") ?? ""} className="mt-1 w-full rounded-xl border-slate-200" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.bathrooms}</label>
          <input name="bathrooms" defaultValue={searchParams.get("bathrooms") ?? ""} className="mt-1 w-full rounded-xl border-slate-200" />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.sizeMin}</label>
          <input name="sizeMin" defaultValue={searchParams.get("sizeMin") ?? ""} className="mt-1 w-full rounded-xl border-slate-200" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.sizeMax}</label>
          <input name="sizeMax" defaultValue={searchParams.get("sizeMax") ?? ""} className="mt-1 w-full rounded-xl border-slate-200" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.listedWithin}</label>
          <select name="listedWithin" defaultValue={searchParams.get("listedWithin") ?? ""} className="mt-1 w-full rounded-xl border-slate-200">
            <option value="">{t.any}</option>
            <option value="24h">24h</option>
            <option value="7d">7d</option>
            <option value="30d">30d</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">{t.sort}</label>
          <select name="sort" defaultValue={searchParams.get("sort") ?? "newest"} className="mt-1 w-full rounded-xl border-slate-200">
            <option value="newest">Newest</option>
            <option value="price-asc">Price low-high</option>
            <option value="price-desc">Price high-low</option>
            <option value="size">Largest</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="furnished" defaultChecked={searchParams.get("furnished") === "true"} className="rounded" />
          {t.furnished}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="newBuild" defaultChecked={searchParams.get("newBuild") === "true"} className="rounded" />
          {t.newBuild}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="beachfront" defaultChecked={searchParams.get("beachfront") === "true"} className="rounded" />
          {t.beachfront}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="parking" defaultChecked={searchParams.get("parking") === "true"} className="rounded" />
          {t.parking}
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft">
          {t.update}
        </button>
        <a href={`/${locale}/search`} className="text-sm text-slate-500 hover:text-slate-700">
          {t.clear}
        </a>
      </div>
    </form>
  );
}
