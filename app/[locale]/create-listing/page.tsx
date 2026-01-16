import { prisma } from "@/lib/prisma";
import { getCopy, locales } from "@/lib/i18n";
import CreateListingForm from "@/components/CreateListingForm";

export default async function CreateListingPage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  const copy = getCopy(locale as any);
  const locations = await prisma.location.findMany({ orderBy: { city: "asc" } });

  return (
    <div className="container-shell py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-900">{copy.nav.create}</h1>
        <p className="text-sm text-slate-500">Complete the wizard to publish your listing.</p>
      </div>
      <CreateListingForm
        locations={locations.map((location) => ({
          id: location.id,
          label: `${location.city}${location.area ? ` · ${location.area}` : ""}`
        }))}
        locale={locale}
      />
    </div>
  );
}
