import Link from "next/link";
import Image from "next/image";
import { getCopy, locales } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import ListingCard from "@/components/ListingCard";

const cities = [
  { name: "Tirana", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  { name: "Durrës", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Vlorë", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Sarandë", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e" },
  { name: "Shkodër", image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef" },
  { name: "Elbasan", image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef" }
];

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  const copy = getCopy(locale as any);

  const [featured, recent] = await Promise.all([
    prisma.listing.findMany({
      where: { status: "ACTIVE", featured: true },
      include: { media: true, location: true },
      take: 3
    }),
    prisma.listing.findMany({
      where: { status: "ACTIVE" },
      include: { media: true, location: true },
      orderBy: { listedAt: "desc" },
      take: 6
    })
  ]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-50">
        <div className="container-shell grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="badge">Trusted Albania marketplace</div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
              {copy.home.headline}
            </h1>
            <p className="text-lg text-slate-600">{copy.home.subheadline}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/search`}
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft"
              >
                {copy.home.ctaPrimary}
              </Link>
              <Link
                href={`/${locale}/create-listing`}
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
              >
                {copy.home.ctaSecondary}
              </Link>
            </div>
            <form action={`/${locale}/search`} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:flex-row">
              <input
                name="city"
                placeholder={copy.home.searchPlaceholder}
                className="w-full rounded-xl border-slate-200"
              />
              <button type="submit" className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white">
                {copy.home.ctaPrimary}
              </button>
            </form>
          </div>
          <div className="relative h-80 overflow-hidden rounded-3xl shadow-card lg:h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
              alt="Albania real estate"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">{copy.home.featured}</h2>
          <Link href={`/${locale}/search`} className="text-sm font-semibold text-brand-600">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} locale={locale} />
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <h2 className="text-2xl font-semibold text-slate-900">{copy.home.popularCities}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link key={city.name} href={`/${locale}/search?city=${city.name}`} className="group relative h-44 overflow-hidden rounded-2xl">
              <Image src={city.image} alt={city.name} fill className="object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-lg font-semibold text-white">{city.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <h2 className="text-2xl font-semibold text-slate-900">{copy.home.recent}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recent.map((listing) => (
            <ListingCard key={listing.id} listing={listing} locale={locale} />
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="grid gap-6 rounded-3xl bg-slate-900 px-8 py-10 text-white lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold">Agjentë të verifikuar</h3>
            <p className="mt-2 text-sm text-slate-200">Profile të certifikuara, transparencë dhe reputacion i monitoruar.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Lead routing inteligjent</h3>
            <p className="mt-2 text-sm text-slate-200">Kërkesat shpërndahen sipas zonës dhe përgjigjes më të shpejtë.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Promovime dhe listing të veçuara</h3>
            <p className="mt-2 text-sm text-slate-200">Rrit shikueshmërinë me paketat Pro dhe Agency.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
