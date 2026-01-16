import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { listingFiltersSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parsed = listingFiltersSchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const filters = parsed.data;
  const page = filters.page ?? 1;
  const perPage = 12;

  const where = {
    status: "ACTIVE" as const,
    intent: filters.intent,
    type: filters.type,
    location: filters.city ? { city: filters.city } : undefined,
    price: filters.priceMin || filters.priceMax ? { gte: filters.priceMin, lte: filters.priceMax } : undefined
  };

  const [total, listings] = await Promise.all([
    prisma.listing.count({ where }),
    prisma.listing.findMany({
      where,
      include: { media: true, location: true },
      take: perPage,
      skip: (page - 1) * perPage
    })
  ]);

  return NextResponse.json({ total, listings, page, perPage });
}
