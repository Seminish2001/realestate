"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingCreateSchema } from "@/lib/validations";
import type { z } from "zod";

const schema = listingCreateSchema;

type ListingFormValues = z.infer<typeof schema>;

type LocationOption = { id: string; label: string };

export default function CreateListingForm({ locations, locale }: { locations: LocationOption[]; locale: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ListingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      type: "APARTMENT",
      intent: "SALE",
      price: 0,
      currency: "EUR",
      address: "",
      showAddress: "approximate",
      latitude: 41.3275,
      longitude: 19.8187,
      sizeM2: 0,
      bedrooms: 1,
      bathrooms: 1,
      furnished: false,
      newBuild: false,
      beachfront: false,
      parking: false,
      locationId: locations[0]?.id ?? ""
    }
  });

  const onSubmit = async (values: ListingFormValues) => {
    setStatus("idle");
    const response = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-slate-900">Step 1: Basics</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Title</label>
            <input {...register("title")} className="mt-2 w-full rounded-xl border-slate-200" />
            {errors.title ? <p className="text-xs text-red-500">{errors.title.message}</p> : null}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Type</label>
            <select {...register("type")} className="mt-2 w-full rounded-xl border-slate-200">
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
              <option value="LAND">Land</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="VACATION">Vacation</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Intent</label>
            <select {...register("intent")} className="mt-2 w-full rounded-xl border-slate-200">
              <option value="SALE">Sale</option>
              <option value="RENT">Rent</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Price</label>
            <input type="number" {...register("price")} className="mt-2 w-full rounded-xl border-slate-200" />
            {errors.price ? <p className="text-xs text-red-500">{errors.price.message}</p> : null}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Currency</label>
            <select {...register("currency")} className="mt-2 w-full rounded-xl border-slate-200">
              <option value="EUR">EUR</option>
              <option value="ALL">ALL</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Location</label>
            <select {...register("locationId")} className="mt-2 w-full rounded-xl border-slate-200">
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea {...register("description")} rows={5} className="mt-2 w-full rounded-xl border-slate-200" />
            {errors.description ? <p className="text-xs text-red-500">{errors.description.message}</p> : null}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-slate-900">Step 2: Specs</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-slate-700">Size (m²)</label>
            <input type="number" {...register("sizeM2")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Bedrooms</label>
            <input type="number" {...register("bedrooms")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Bathrooms</label>
            <input type="number" {...register("bathrooms")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Floor</label>
            <input type="number" {...register("floor")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Total floors</label>
            <input type="number" {...register("totalFloors")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Year built</label>
            <input type="number" {...register("yearBuilt")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Address</label>
            <input {...register("address")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Address visibility</label>
            <select {...register("showAddress")} className="mt-2 w-full rounded-xl border-slate-200">
              <option value="exact">Exact</option>
              <option value="approximate">Approximate</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Latitude</label>
            <input type="number" step="0.0001" {...register("latitude")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Longitude</label>
            <input type="number" step="0.0001" {...register("longitude")} className="mt-2 w-full rounded-xl border-slate-200" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-slate-900">Step 3: Amenities</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" {...register("furnished")} className="rounded" /> Furnished
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" {...register("newBuild")} className="rounded" /> New build
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" {...register("beachfront")} className="rounded" /> Beachfront
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" {...register("parking")} className="rounded" /> Parking
          </label>
        </div>
        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700">Amenities (comma separated)</label>
          <input
            {...register("amenities", {
              setValueAs: (value) =>
                typeof value === "string"
                  ? value.split(",").map((item: string) => item.trim()).filter(Boolean)
                  : []
            })}
            className="mt-2 w-full rounded-xl border-slate-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft"
      >
        {isSubmitting ? "Submitting..." : locale === "sq" ? "Publiko listing" : "Publish listing"}
      </button>
      {status === "success" ? (
        <p className="text-sm text-emerald-600">Listing submitted for review.</p>
      ) : null}
      {status === "error" ? <p className="text-sm text-red-500">Something went wrong.</p> : null}
    </form>
  );
}
