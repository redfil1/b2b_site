import Image from "next/image";
import { getManufacturers } from "@/lib/data/manufacturers";

// Блок «Производители» на главной — Frontend.md, раздел 4.3.4 (не отдельный роут,
// Architecture.md, раздел 2). Ссылок на страницы производителей нет.
//
// Пока ни у одного производителя не заполнен `logo` (тестовые данные, см.
// lib/data/manufacturers.ts) — показываем названия строкой, а не сеткой плашек-заглушек
// (Frontend.md, раздел 8.10: ряд серых плашек на мобильном читался как сломанные
// картинки). Как только появятся реальные файлы логотипов — рендерится прежняя сетка
// `next/image`, менять компонент не нужно.
export function ManufacturerLogos() {
  const manufacturers = getManufacturers();

  if (manufacturers.length === 0) {
    return null;
  }

  const hasLogos = manufacturers.some((manufacturer) => manufacturer.logo);

  return (
    <section aria-label="Производители" className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-primary md:text-3xl">Производители</h2>

      {hasLogos ? (
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
      ) : (
        <p className="text-secondary">
          Работаем с: {manufacturers.map((manufacturer) => manufacturer.name).join(" · ")}
        </p>
      )}
    </section>
  );
}
