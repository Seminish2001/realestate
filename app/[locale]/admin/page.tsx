import { prisma } from "@/lib/prisma";
import { getCopy, locales } from "@/lib/i18n";

export default async function AdminPage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  const copy = getCopy(locale as any);
  const pending = await prisma.listing.findMany({
    where: { status: "PENDING" },
    include: { location: true },
    take: 5
  });

  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold text-slate-900">{copy.admin.title}</h1>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-slate-900">{copy.admin.pending}</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          {pending.length === 0 ? (
            <p>No pending listings.</p>
          ) : (
            pending.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">{listing.title}</p>
                  <p className="text-xs text-slate-500">{listing.location.city}</p>
                </div>
                <button className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">Approve</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
