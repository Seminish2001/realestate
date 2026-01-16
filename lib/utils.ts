import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Array<string | undefined | null | false>) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (value: number, currency: "EUR" | "ALL") => {
  return new Intl.NumberFormat("sq-AL", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
};

export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
