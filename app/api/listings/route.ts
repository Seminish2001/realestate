import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { listingCreateSchema, listingFiltersSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { toSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parsed = listingFiltersSchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const filters = parsed.data;
  const listings = await prisma.listing.findMany({
    where: {
      status: "ACTIVE",
      intent: filters.intent,
      type: filters.type,
      location: filters.city ? { city: filters.city } : undefined,
      price: filters.priceMin || filters.priceMax ? { gte: filters.priceMin, lte: filters.priceMax } : undefined
    },
    include: { media: true, location: true },
    take: 20
  });

  return NextResponse.json({ listings });
}

export async function POST(request: NextRequest) {
  const rate = rateLimit(request.ip ?? "unknown", 5, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = listingCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const listing = await prisma.listing.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      intent: data.intent,
      price: data.price,
      currency: data.currency,
      address: data.address,
      showAddress: data.showAddress,
      latitude: data.latitude,
      longitude: data.longitude,
      sizeM2: data.sizeM2,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      floor: data.floor,
      totalFloors: data.totalFloors,
      yearBuilt: data.yearBuilt,
      condition: data.condition,
      amenities: data.amenities ?? [],
      furnished: data.furnished ?? false,
      newBuild: data.newBuild ?? false,
      beachfront: data.beachfront ?? false,
      parking: data.parking ?? false,
      slug: `${toSlug(data.title)}-${Date.now()}`,
      ownerId: (await prisma.user.findFirst())?.id ?? (await prisma.user.create({
        data: { name: "Guest Agent", email: `guest-${Date.now()}@example.com` }
      })).id,
      locationId: data.locationId,
      status: "PENDING"
    }
  });

  return NextResponse.json({ listing }, { status: 201 });
}
