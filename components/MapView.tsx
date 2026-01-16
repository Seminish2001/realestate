import type { Listing, Location } from "@prisma/client";

export default function MapView({ listings }: { listings: Array<Listing & { location: Location }> }) {
  const center = listings[0] ? { lat: listings[0].latitude, lng: listings[0].longitude } : { lat: 41.3275, lng: 19.8187 };
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.12}%2C${center.lat - 0.08}%2C${center.lng + 0.12}%2C${center.lat + 0.08}&layer=mapnik&marker=${center.lat}%2C${center.lng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="h-80">
        <iframe
          title="Listings map"
          src={mapUrl}
          className="h-full w-full"
          loading="lazy"
          aria-label="Map view"
        />
      </div>
      <div className="border-t border-slate-200 p-4">
        <p className="text-sm font-semibold text-slate-700">Map highlights</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {listings.slice(0, 3).map((listing) => (
            <li key={listing.id} className="flex items-center justify-between">
              <span>{listing.title}</span>
              <span className="text-xs text-slate-400">{listing.location.city}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
