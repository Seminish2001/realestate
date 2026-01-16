import { z } from "zod";

export const listingFiltersSchema = z.object({
  intent: z.enum(["SALE", "RENT"]).optional(),
  type: z.enum(["APARTMENT", "HOUSE", "LAND", "COMMERCIAL", "VACATION"]).optional(),
  city: z.string().optional(),
  priceMin: z.coerce.number().int().nonnegative().optional(),
  priceMax: z.coerce.number().int().nonnegative().optional(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  sizeMin: z.coerce.number().int().nonnegative().optional(),
  sizeMax: z.coerce.number().int().nonnegative().optional(),
  furnished: z.coerce.boolean().optional(),
  newBuild: z.coerce.boolean().optional(),
  beachfront: z.coerce.boolean().optional(),
  parking: z.coerce.boolean().optional(),
  listedWithin: z.enum(["24h", "7d", "30d"]).optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "size", "relevance"]).optional(),
  page: z.coerce.number().int().positive().optional()
});

export const leadSchema = z.object({
  listingId: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().min(10)
});

export const favoriteSchema = z.object({
  listingId: z.string().min(1),
  userId: z.string().min(1)
});

export const listingCreateSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(50),
  type: z.enum(["APARTMENT", "HOUSE", "LAND", "COMMERCIAL", "VACATION"]),
  intent: z.enum(["SALE", "RENT"]),
  price: z.coerce.number().int().positive(),
  currency: z.enum(["EUR", "ALL"]),
  address: z.string().min(5),
  showAddress: z.enum(["exact", "approximate", "hidden"]),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  sizeM2: z.coerce.number().int().positive(),
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  floor: z.coerce.number().int().optional(),
  totalFloors: z.coerce.number().int().optional(),
  yearBuilt: z.coerce.number().int().optional(),
  condition: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  furnished: z.coerce.boolean().optional(),
  newBuild: z.coerce.boolean().optional(),
  beachfront: z.coerce.boolean().optional(),
  parking: z.coerce.boolean().optional(),
  locationId: z.string().min(1)
});

export type ListingFilters = z.infer<typeof listingFiltersSchema>;
