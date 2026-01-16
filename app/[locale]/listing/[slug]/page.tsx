import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { getCopy, locales } from "@/lib/i18n";
import Gallery from "@/components/Gallery";
import LeadForm from "@/components/LeadForm";
import ListingCard from "@/components/ListingCard";
import MapView from "@/components/MapView";

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const listing = await prisma.listing.findUnique({ where: { slug: params.slug } });
  if (!listing) return {};
  return {
    title: listing.title,
    description: listing.description,
    alternates: {
      canonical: `/${params.locale}/listing/${listing.slug}`
    },
    openGraph: {
      title: listing.title,
      description: listing.description,
      url: `/${params.locale}/listing/${listing.slug}`
    }
  };
}

export default async function ListingDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  const copy = getCopy(locale as any);

  const listing = await prisma.listing.findUnique({
    where: { slug: params.slug },
    include: { media: true, location: true, owner: true }
  });

  if (!listing) {
    notFound();
  }

  const similar = await prisma.listing.findMany({
    where: {
      id: { not: listing.id },
      status: "ACTIVE",
      locationId: listing.locationId
    },
    include: { media: true, location: true },
    take: 3
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description: listing.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.location.city,
      addressCountry: "AL"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: listing.latitude,
      longitude: listing.longitude
    },
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: listing.currency
    }
  };

  return (
    <div className="container-shell py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{listing.title}</h1>
          <p className="mt-2 text-slate-600">{listing.location.city} · {listing.sizeM2} m² · {listing.bedrooms} bd</p>
        </div>

        <Gallery media={listing.media} title={listing.title} />

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{listing.intent === "RENT" ? "Rent" : "Sale"}</p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {formatCurrency(listing.price, listing.currency)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="badge">{listing.bedrooms} bd</span>
                  <span className="badge">{listing.bathrooms} ba</span>
                  <span className="badge">{listing.sizeM2} m²</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{listing.description}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-lg font-semibold text-slate-900">{copy.listing.details}</h2>
              <div className="mt-4 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
                <div>Condition: {listing.condition ?? "-"}</div>
                <div>Year built: {listing.yearBuilt ?? "-"}</div>
                <div>Floor: {listing.floor ?? "-"}</div>
                <div>Total floors: {listing.totalFloors ?? "-"}</div>
                <div>Furnished: {listing.furnished ? "Yes" : "No"}</div>
                <div>Parking: {listing.parking ? "Yes" : "No"}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-lg font-semibold text-slate-900">{copy.listing.amenities}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {listing.amenities.map((amenity) => (
                  <span key={amenity} className="badge">{amenity}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-lg font-semibold text-slate-900">{copy.listing.location}</h2>
              <div className="mt-4">
                <MapView listings={[listing]} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-lg font-semibold text-slate-900">{copy.listing.contactAgent}</h3>
              <div className="mt-3 text-sm text-slate-600">
                <p>{listing.owner.name}</p>
                <p>{listing.owner.phone ?? "+355 69 000 0000"}</p>
                <p>{listing.owner.email}</p>
                <div className="mt-3 flex gap-2">
                  <a className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white" href={`https://wa.me/${listing.owner.phone?.replace(/\D/g, "") ?? "355690000000"}`}>
                    WhatsApp
                  </a>
                  <a className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700" href={`mailto:${listing.owner.email}`}>
                    Email
                  </a>
                </div>
              </div>
            </div>

            <LeadForm listingId={listing.id} locale={locale} />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-card">
              <p className="font-semibold text-slate-900">{copy.listing.estimate}</p>
              <p className="mt-2">Estimate based on average market rates. Mortgage calculator coming soon.</p>
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.listing.similar}</h2>
            <a className="text-sm font-semibold text-brand-600" href={`/${locale}/search?city=${listing.location.city}`}>
              View more
            </a>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {similar.map((item) => (
              <ListingCard key={item.id} listing={item} locale={locale} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
