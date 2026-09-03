export const cleanText = (text) => text?.trim().replace(/\s+/g, " ");

export const clean = (text, fallback) => cleanText(text) ?? fallback ?? "";

export const decodeEntities = (text) => {
  if (!text) return text;
  if (typeof window === "undefined") {
    return text
      .replace(/&apos;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
  const doc = new window.DOMParser().parseFromString(text, "text/html");
  return doc.documentElement.textContent;
};
