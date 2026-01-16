"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema } from "@/lib/validations";
import { trackEvent } from "@/lib/analytics";
import type { z } from "zod";

const schema = leadSchema;

type LeadFormValues = z.infer<typeof schema>;

export default function LeadForm({ listingId, locale }: { listingId: string; locale: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      listingId,
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = async (values: LeadFormValues) => {
    setStatus("idle");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("error");
      trackEvent({ name: "lead_submit_failed", properties: { listingId } });
      return;
    }

    setStatus("success");
    trackEvent({ name: "lead_submitted", properties: { listingId } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <input type="hidden" {...register("listingId")} value={listingId} />
      <div>
        <label className="text-sm font-semibold text-slate-700">Name</label>
        <input
          {...register("name")}
          className="mt-2 w-full rounded-xl border-slate-200"
          placeholder={locale === "sq" ? "Emri dhe mbiemri" : "Full name"}
        />
        {errors.name ? <p className="mt-1 text-xs text-red-500">{errors.name.message}</p> : null}
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700">Email</label>
        <input
          {...register("email")}
          className="mt-2 w-full rounded-xl border-slate-200"
          placeholder="name@email.com"
        />
        {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email.message}</p> : null}
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700">Phone / WhatsApp</label>
        <input
          {...register("phone")}
          className="mt-2 w-full rounded-xl border-slate-200"
          placeholder="+355 69 000 0000"
        />
        {errors.phone ? <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p> : null}
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700">Message</label>
        <textarea
          {...register("message")}
          className="mt-2 w-full rounded-xl border-slate-200"
          rows={4}
          placeholder={locale === "sq" ? "Përshkruani kërkesën tuaj" : "Tell us your preferences"}
        />
        {errors.message ? <p className="mt-1 text-xs text-red-500">{errors.message.message}</p> : null}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft"
      >
        {isSubmitting ? "Sending..." : locale === "sq" ? "Dërgo kërkesën" : "Send request"}
      </button>
      {status === "success" ? <p className="text-sm text-emerald-600">Request sent successfully.</p> : null}
      {status === "error" ? <p className="text-sm text-red-500">Something went wrong.</p> : null}
    </form>
  );
}
