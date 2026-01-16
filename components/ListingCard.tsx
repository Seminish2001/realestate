import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Listing, ListingMedia, Location } from "@prisma/client";

export type ListingWithMedia = Listing & { media: ListingMedia[]; location: Location };

export default function ListingCard({ listing, locale }: { listing: ListingWithMedia; locale: string }) {
  const cover = listing.media[0]?.url ?? "https://images.unsplash.com/photo-1505691938895-1758d7feb511";
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={cover}
          alt={listing.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {listing.featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        ) : null}
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-700 shadow"
          aria-label="Save listing"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <Link href={`/${locale}/listing/${listing.slug}`} className="text-lg font-semibold text-slate-900">
            {listing.title}
          </Link>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {listing.location.city}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="badge">{listing.bedrooms} bd</span>
          <span className="badge">{listing.bathrooms} ba</span>
          <span className="badge">{listing.sizeM2} m²</span>
        </div>
        <div className="text-lg font-semibold text-slate-900">
          {formatCurrency(listing.price, listing.currency)}
          {listing.intent === "RENT" ? <span className="text-sm text-slate-500"> /mo</span> : null}
        </div>
      </div>
    </article>
  );
}
