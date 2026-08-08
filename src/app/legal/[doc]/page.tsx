import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DraftNotice } from "@/components/ui/DraftNotice";

// Список конкретных правовых документов не зафиксирован архитектурой (Project_Structure.md
// называет только примеры — "политика конфиденциальности, оферта и т.п."), поэтому роут
// принимает любой slug: известные заголовки — из этой карты, остальные — обобщённый заголовок.
const KNOWN_LEGAL_DOC_TITLES: Record<string, string> = {
  privacy: "Политика конфиденциальности",
  offer: "Публичная оферта",
};

function getLegalDocTitle(doc: string): string {
  return KNOWN_LEGAL_DOC_TITLES[doc] ?? "Правовой документ";
}

export async function generateMetadata({ params }: PageProps<"/legal/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  const title = getLegalDocTitle(doc);

  return {
    title: `${title} — B2B-магазин промышленного оборудования`,
  };
}

export default async function LegalDocPage({ params }: PageProps<"/legal/[doc]">) {
  const { doc } = await params;
  const title = getLegalDocTitle(doc);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: title }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">{title}</h1>

      <div className="mt-6 max-w-3xl">
        <DraftNotice />
        <p className="mt-6 text-primary">
          Текст документа «{title}» пока не подготовлен и будет добавлен позже.
        </p>
      </div>
    </main>
  );
}
