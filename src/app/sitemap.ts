import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.illuminex.co.uk";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },

    { url: `${baseUrl}/clients`, lastModified: new Date() },
    { url: `${baseUrl}/candidates`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/live-jobs`, lastModified: new Date() },

    { url: `${baseUrl}/sectors/construction-building-materials`, lastModified: new Date() },
    { url: `${baseUrl}/sectors/technical-commercial-sales`, lastModified: new Date() },
    { url: `${baseUrl}/sectors/bathrooms-kitchens`, lastModified: new Date() },
    { url: `${baseUrl}/sectors/education`, lastModified: new Date() },
    { url: `${baseUrl}/sectors/healthcare`, lastModified: new Date() },
  ];
}