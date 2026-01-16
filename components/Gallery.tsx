import Image from "next/image";
import type { ListingMedia } from "@prisma/client";

export default function Gallery({ media, title }: { media: ListingMedia[]; title: string }) {
  const images = media.length ? media : [{ id: "fallback", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", alt: title, listingId: "", position: 0, createdAt: new Date() }];

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <div className="relative h-64 overflow-hidden rounded-2xl lg:col-span-2 lg:h-full">
        <Image src={images[0].url} alt={images[0].alt ?? title} fill className="object-cover" />
      </div>
      <div className="grid gap-3">
        {images.slice(1, 4).map((image) => (
          <div key={image.id} className="relative h-32 overflow-hidden rounded-2xl">
            <Image src={image.url} alt={image.alt ?? title} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
