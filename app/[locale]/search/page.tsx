import type { Metadata } from "next";
import { getCopy, locales } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { listingFiltersSchema } from "@/lib/validations";
import ListingCard from "@/components/ListingCard";
import SearchFilters from "@/components/SearchFilters";
import MapView from "@/components/MapView";

export const metadata: Metadata = {
  title: "Search listings"
};

const PER_PAGE = 6;

export default async function SearchPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  const copy = getCopy(locale as any);
  const parsed = listingFiltersSchema.safeParse(searchParams);
  const filters = parsed.success ? parsed.data : {};
  const page = filters.page ?? 1;
  const view = typeof searchParams.view === "string" ? searchParams.view : "map";

  const listedSince = (() => {
    if (filters.listedWithin === "24h") return new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (filters.listedWithin === "7d") return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (filters.listedWithin === "30d") return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return undefined;
  })();

  const where = {
    status: "ACTIVE" as const,
    intent: filters.intent,
    type: filters.type,
    price: filters.priceMin || filters.priceMax ? { gte: filters.priceMin, lte: filters.priceMax } : undefined,
    bedrooms: filters.bedrooms ? { gte: filters.bedrooms } : undefined,
    bathrooms: filters.bathrooms ? { gte: filters.bathrooms } : undefined,
    sizeM2: filters.sizeMin || filters.sizeMax ? { gte: filters.sizeMin, lte: filters.sizeMax } : undefined,
    furnished: filters.furnished ? true : undefined,
    newBuild: filters.newBuild ? true : undefined,
    beachfront: filters.beachfront ? true : undefined,
    parking: filters.parking ? true : undefined,
    listedAt: listedSince ? { gte: listedSince } : undefined,
    location: filters.city ? { city: filters.city } : undefined
  };

  const orderBy = (() => {
    switch (filters.sort) {
      case "price-asc":
        return { price: "asc" as const };
      case "price-desc":
        return { price: "desc" as const };
      case "size":
        return { sizeM2: "desc" as const };
      default:
        return { listedAt: "desc" as const };
    }
  })();

  const [total, listings] = await Promise.all([
    prisma.listing.count({ where }),
    prisma.listing.findMany({
      where,
      include: { media: true, location: true },
      orderBy,
      take: PER_PAGE,
      skip: (page - 1) * PER_PAGE
    })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const baseParams = Object.fromEntries(
    Object.entries(searchParams)
      .filter(([key, value]) => key !== "page" && value !== undefined)
      .map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );

  return (
    <div className="container-shell py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{copy.search.title}</h1>
          <p className="text-sm text-slate-500">{total} {copy.search.results}</p>
        </div>

        <SearchFilters locale={locale} />

        <div className="flex items-center justify-end gap-2">
          <a
            className={`rounded-full border px-4 py-1 text-xs font-semibold ${view === "list" ? "bg-brand-600 text-white" : "text-slate-600"}`}
            href={`/${locale}/search?${new URLSearchParams({ ...baseParams, view: "list" })}`}
          >
            {copy.search.list}
          </a>
          <a
            className={`rounded-full border px-4 py-1 text-xs font-semibold ${view !== "list" ? "bg-brand-600 text-white" : "text-slate-600"}`}
            href={`/${locale}/search?${new URLSearchParams({ ...baseParams, view: "map" })}`}
          >
            {copy.search.map}
          </a>
        </div>

        <div className={`grid gap-8 ${view === "map" ? "lg:grid-cols-[2fr,1fr]" : ""}`}>
          <div className="space-y-6">
            {listings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
                {copy.search.empty}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} locale={locale} />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              <span>Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <a
                  className={`rounded-full border px-3 py-1 ${page <= 1 ? "cursor-not-allowed text-slate-300" : "text-slate-600"}`}
                  href={`/${locale}/search?${new URLSearchParams({ ...baseParams, page: String(Math.max(1, page - 1)) })}`}
                >
                  Previous
                </a>
                <a
                  className={`rounded-full border px-3 py-1 ${page >= totalPages ? "cursor-not-allowed text-slate-300" : "text-slate-600"}`}
                  href={`/${locale}/search?${new URLSearchParams({ ...baseParams, page: String(Math.min(totalPages, page + 1)) })}`}
                >
                  Next
                </a>
              </div>
            </div>
          </div>

          {view === "map" ? (
            <div>
              <MapView listings={listings} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
