import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const moderationSchema = z.object({
  listingId: z.string().min(1),
  status: z.enum(["ACTIVE", "ARCHIVED", "PENDING"]),
  featured: z.boolean().optional()
});

export async function GET() {
  const listings = await prisma.listing.findMany({
    where: { status: "PENDING" },
    include: { location: true, owner: true },
    take: 20
  });
  return NextResponse.json({ listings });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const parsed = moderationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const listing = await prisma.listing.update({
    where: { id: parsed.data.listingId },
    data: {
      status: parsed.data.status,
      featured: parsed.data.featured
    }
  });

  return NextResponse.json({ listing });
}
