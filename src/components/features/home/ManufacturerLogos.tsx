import Image from "next/image";
import { getManufacturers } from "@/lib/data/manufacturers";

// Полоса логотипов производителей на главной — Frontend.md, раздел 4.3.4.
// Раздел «Производители» больше не отдельный роут (Architecture.md, раздел 2).
// Логотипы — через next/image из public/images/manufacturers/ (сейчас тестовые
// PNG-заглушки, см. lib/data/manufacturers.ts). Ссылок на страницы производителей нет.
export function ManufacturerLogos() {
  const manufacturers = getManufacturers();

  if (manufacturers.length === 0) {
    return null;
  }

  return (
    <section aria-label="Производители" className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-primary md:text-3xl">Производители</h2>
      <ul className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {manufacturers.map((manufacturer) => (
          <li
            key={manufacturer.slug}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-6"
          >
            {manufacturer.logo ? (
              <Image
                src={manufacturer.logo}
                alt={manufacturer.name}
                width={240}
                height={100}
                className="h-12 w-auto object-contain opacity-80 transition-opacity duration-200 ease-out hover:opacity-100"
              />
            ) : (
              <span className="text-sm font-semibold text-secondary">{manufacturer.name}</span>
            )}
            <span className="text-xs text-secondary">{manufacturer.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
