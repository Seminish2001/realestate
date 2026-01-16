import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const listings = await prisma.listing.findMany({ select: { slug: true } });
  const locales = ["sq", "en", "it"];

  const routes = locales.flatMap((locale) => [
    { url: `/${locale}`, lastModified: new Date() },
    { url: `/${locale}/search`, lastModified: new Date() },
    { url: `/${locale}/about`, lastModified: new Date() },
    { url: `/${locale}/how-it-works`, lastModified: new Date() },
    { url: `/${locale}/agents`, lastModified: new Date() },
    { url: `/${locale}/guides`, lastModified: new Date() }
  ]);

  const listingRoutes = listings.flatMap((listing) =>
    locales.map((locale) => ({
      url: `/${locale}/listing/${listing.slug}`,
      lastModified: new Date()
    }))
  );

  return [...routes, ...listingRoutes];
}
