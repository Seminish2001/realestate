import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { favoriteSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const rate = rateLimit(request.ip ?? "unknown", 20, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = favoriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const favorite = await prisma.favorite.create({ data: parsed.data });
  return NextResponse.json({ favorite }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const parsed = favoriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await prisma.favorite.delete({
    where: {
      userId_listingId: {
        userId: parsed.data.userId,
        listingId: parsed.data.listingId
      }
    }
  });

  return NextResponse.json({ ok: true });
}
