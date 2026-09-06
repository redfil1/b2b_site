import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { getLegalDocTitle } from "@/lib/constants/legalDocs";

export async function generateMetadata({ params }: PageProps<"/legal/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  const title = getLegalDocTitle(doc);

  if (!title) {
    return { title: "Документ не найден", robots: { index: false } };
  }

  // ВРЕМЕННО (самокритичный аудит, 2026-09-06, см. docs/seo.md): текст документа
  // пока черновой (DraftNotice ниже) — не индексировать, пока не заменён финальным.
  return {
    title: `${title} — B2B-магазин промышленного оборудования`,
    robots: { index: false },
  };
}

export default async function LegalDocPage({ params }: PageProps<"/legal/[doc]">) {
  const { doc } = await params;
  const title = getLegalDocTitle(doc);

  if (!title) {
    notFound();
  }

  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: title }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">{title}</h1>

      <div className="mt-6 max-w-3xl">
        <DraftNotice />
        <p className="mt-6 text-primary">
          Текст документа «{title}» пока не подготовлен и будет добавлен позже.
        </p>
      </div>
    </Container>
  );
}
