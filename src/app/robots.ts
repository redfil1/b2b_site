import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// robots.txt (SEO.md, раздел 4). Отдаётся как /robots.txt. Закрывать нечего —
// приватных разделов, личного кабинета и форм сбора данных на сайте нет (CLAUDE.md).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  };
}
