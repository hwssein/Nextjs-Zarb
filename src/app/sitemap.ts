import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = process.env.BASE_URL ?? "https://zarbbeat.vercel.app";

  const myStaticRoutes = ["", "/all-musics", "/login", "player"];

  const routes = myStaticRoutes.map((item) => ({
    url: `${BASE_URL}${item}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
