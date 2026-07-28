import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Helper function — put this above your component or in a utils file
export function stripHtml(html:any) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")      // remove all HTML tags
    .replace(/&nbsp;/g, " ")       // common HTML entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export function truncateText(text:any, maxLength = 80) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}