// Рендер JSON-LD как <script type="application/ld+json"> с телом-объектом (SEO.md,
// раздел 8). Символ "<" в сериализованном payload заменяется на его юникод-эскейп —
// защита от XSS-инъекции через строковые поля (рекомендация Next.js, docs/guides/json-ld).
// Отдельную типизацию/библиотеку (schema-dts) не подключаем. Без бизнес-логики и
// обращения к данным — только пропсы и вёрстка (Project_Structure.md).
export interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
