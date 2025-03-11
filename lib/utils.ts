import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseUrl = (): string => {
  const siteUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://medical-dash-gamma.vercel.app";

  return siteUrl;
};
