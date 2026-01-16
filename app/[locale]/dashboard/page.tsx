import { prisma } from "@/lib/prisma";
import { getCopy, locales } from "@/lib/i18n";
import ListingCard from "@/components/ListingCard";

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  const copy = getCopy(locale as any);

  const listings = await prisma.listing.findMany({
    where: { status: "ACTIVE" },
    include: { media: true, location: true },
    take: 3
  });

  const leadsCount = await prisma.lead.count();

  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold text-slate-900">{copy.dashboard.title}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-sm text-slate-500">Active listings</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{listings.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-sm text-slate-500">Leads this week</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{leadsCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-sm text-slate-500">Plan</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">Pro</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.dashboard.listings}</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
