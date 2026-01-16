import { PrismaClient, ListingIntent, ListingStatus, ListingType, Currency, RoleName } from "@prisma/client";

const prisma = new PrismaClient();

const locations = [
  { country: "Albania", region: "Tirana", city: "Tirana", area: "Blloku", slug: "tirana-blloku" },
  { country: "Albania", region: "Durrës", city: "Durrës", area: "Plazh", slug: "durres-plazh" },
  { country: "Albania", region: "Vlorë", city: "Vlorë", area: "Lungomare", slug: "vlore-lungomare" },
  { country: "Albania", region: "Sarandë", city: "Sarandë", area: "Ksamil", slug: "sarande-ksamil" },
  { country: "Albania", region: "Shkodër", city: "Shkodër", area: "Qendra", slug: "shkoder-qendra" },
  { country: "Albania", region: "Elbasan", city: "Elbasan", area: "Qendra", slug: "elbasan-qendra" }
];

const listingsSeed = [
  {
    title: "Apartament modern 2+1 në Bllok",
    description: "Apartament i mobiluar me stil premium, afër shesheve kryesore dhe kafeneve.",
    type: ListingType.APARTMENT,
    intent: ListingIntent.SALE,
    price: 165000,
    currency: Currency.EUR,
    priceAll: 18200000,
    sizeM2: 96,
    bedrooms: 2,
    bathrooms: 2,
    floor: 5,
    totalFloors: 9,
    yearBuilt: 2017,
    condition: "Excellent",
    furnished: true,
    newBuild: true,
    beachfront: false,
    parking: true,
    amenities: ["Ashensor", "Ballkon", "Siguri 24/7", "Kondicioner"],
    address: "Rruga Ibrahim Rugova, Tirana",
    showAddress: "approximate",
    latitude: 41.3191,
    longitude: 19.8196,
    status: ListingStatus.ACTIVE,
    featured: true
  },
  {
    title: "Vilë familjare pranë detit në Durrës",
    description: "Vilë 3 kate me oborr privat dhe akses të shpejtë në plazh.",
    type: ListingType.HOUSE,
    intent: ListingIntent.SALE,
    price: 340000,
    currency: Currency.EUR,
    priceAll: 37600000,
    sizeM2: 210,
    bedrooms: 4,
    bathrooms: 3,
    floor: 1,
    totalFloors: 3,
    yearBuilt: 2015,
    condition: "Very good",
    furnished: true,
    newBuild: false,
    beachfront: true,
    parking: true,
    amenities: ["Oborr", "Garazh", "Pamje deti", "Sistem sigurie"],
    address: "Rruga Taulantia, Durrës",
    showAddress: "approximate",
    latitude: 41.3146,
    longitude: 19.4500,
    status: ListingStatus.ACTIVE,
    featured: true
  },
  {
    title: "Penthouse me pamje panoramike në Vlorë",
    description: "Penthouse luksoz me tarracë të gjerë në Lungomare.",
    type: ListingType.APARTMENT,
    intent: ListingIntent.RENT,
    price: 1800,
    currency: Currency.EUR,
    priceAll: 200000,
    sizeM2: 130,
    bedrooms: 3,
    bathrooms: 2,
    floor: 9,
    totalFloors: 10,
    yearBuilt: 2020,
    condition: "Excellent",
    furnished: true,
    newBuild: true,
    beachfront: true,
    parking: false,
    amenities: ["Tarracë", "Pamje deti", "Fitnes", "Recepsion"],
    address: "Lungomare, Vlorë",
    showAddress: "exact",
    latitude: 40.4522,
    longitude: 19.4897,
    status: ListingStatus.ACTIVE,
    featured: false
  },
  {
    title: "Apartament pushimi në Ksamil",
    description: "Apartament 1+1 ideal për sezonin veror, pranë plazheve të Ksamilit.",
    type: ListingType.VACATION,
    intent: ListingIntent.RENT,
    price: 700,
    currency: Currency.EUR,
    priceAll: 77000,
    sizeM2: 58,
    bedrooms: 1,
    bathrooms: 1,
    floor: 2,
    totalFloors: 4,
    yearBuilt: 2018,
    condition: "Excellent",
    furnished: true,
    newBuild: false,
    beachfront: true,
    parking: true,
    amenities: ["Ballkon", "Kuzhinë", "Wifi", "Parking"],
    address: "Ksamil, Sarandë",
    showAddress: "approximate",
    latitude: 39.7681,
    longitude: 19.9993,
    status: ListingStatus.ACTIVE,
    featured: false
  },
  {
    title: "Ambient komercial në qendër të Shkodrës",
    description: "Ambient për zyra ose dyqan me sipërfaqe të hapur dhe dritare të mëdha.",
    type: ListingType.COMMERCIAL,
    intent: ListingIntent.RENT,
    price: 1200,
    currency: Currency.EUR,
    priceAll: 132000,
    sizeM2: 95,
    bedrooms: 0,
    bathrooms: 1,
    floor: 1,
    totalFloors: 2,
    yearBuilt: 2012,
    condition: "Good",
    furnished: false,
    newBuild: false,
    beachfront: false,
    parking: true,
    amenities: ["Hapësirë e hapur", "Akses rrugor", "Fasada e xhamtë"],
    address: "Qendra, Shkodër",
    showAddress: "exact",
    latitude: 42.0683,
    longitude: 19.5126,
    status: ListingStatus.ACTIVE,
    featured: false
  },
  {
    title: "Truall ndërtimi në Elbasan",
    description: "Truall 600m² me akses rrugor dhe dokumentacion të rregullt.",
    type: ListingType.LAND,
    intent: ListingIntent.SALE,
    price: 68000,
    currency: Currency.EUR,
    priceAll: 7520000,
    sizeM2: 600,
    bedrooms: 0,
    bathrooms: 0,
    floor: null,
    totalFloors: null,
    yearBuilt: null,
    condition: "N/A",
    furnished: false,
    newBuild: false,
    beachfront: false,
    parking: false,
    amenities: ["Dokumente të rregullta", "Akses rrugor"],
    address: "Lagjja 28 Nëntori, Elbasan",
    showAddress: "approximate",
    latitude: 41.1125,
    longitude: 20.0828,
    status: ListingStatus.ACTIVE,
    featured: false
  }
];

async function main() {
  await prisma.listingMedia.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.savedSearch.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();
  await prisma.agency.deleteMany();
  await prisma.plan.deleteMany();

  const agency = await prisma.agency.create({
    data: {
      name: "AlbaPrime Realty",
      slug: "albaprime",
      city: "Tirana",
      phone: "+355 69 777 8888",
      website: "https://albaprime.example"
    }
  });

  const agent = await prisma.user.create({
    data: {
      name: "Arta Dervishi",
      email: "arta@albaprime.al",
      phone: "+355 69 123 4567",
      role: RoleName.AGENT,
      agencyId: agency.id
    }
  });

  const createdLocations = await Promise.all(
    locations.map((location) => prisma.location.create({ data: location }))
  );

  for (const [index, listing] of listingsSeed.entries()) {
    const location = createdLocations[index % createdLocations.length];
    const created = await prisma.listing.create({
      data: {
        ...listing,
        slug: `${listing.title.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
        ownerId: agent.id,
        agencyId: agency.id,
        locationId: location.id
      }
    });

    await prisma.listingMedia.createMany({
      data: [
        {
          listingId: created.id,
          url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
          alt: created.title,
          position: 0
        },
        {
          listingId: created.id,
          url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
          alt: `${created.title} interior`,
          position: 1
        }
      ]
    });
  }

  await prisma.plan.createMany({
    data: [
      { name: "Free", priceMonthly: 0, currency: Currency.EUR, listingLimit: 3, featuredAddOnPrice: 15 },
      { name: "Pro", priceMonthly: 49, currency: Currency.EUR, listingLimit: 15, featuredAddOnPrice: 12 },
      { name: "Agency", priceMonthly: 149, currency: Currency.EUR, listingLimit: 100, featuredAddOnPrice: 9 }
    ]
  });

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
