import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Корневая OG-картинка сайта по умолчанию (SEO.md, раздел 7). Next сам добавляет
// og:image / twitter:image со ссылкой на неё во все страницы; пер-сегментные
// OG-картинки не заводим. Генерируется кодом через next/og, без внешних файлов;
// статически оптимизируется на этапе сборки.

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Токены дизайн-системы (Frontend.md, раздел 4.1): акцент brand-800 на светлом фоне,
// текст — основной/вторичный. Кислотных цветов и тяжёлых тёмных фонов бриф запрещает.
const BRAND_800 = "#1e3a8a";
const TEXT_PRIMARY = "#111827";
const TEXT_SECONDARY = "#6b7280";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderTop: `20px solid ${BRAND_800}`,
        padding: "96px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 60,
          fontWeight: 700,
          color: TEXT_PRIMARY,
          lineHeight: 1.15,
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 36,
          fontSize: 30,
          color: TEXT_SECONDARY,
          lineHeight: 1.4,
        }}
      >
        {siteConfig.description}
      </div>
    </div>,
    { ...size },
  );
}
