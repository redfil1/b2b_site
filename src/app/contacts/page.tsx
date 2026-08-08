import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Контакты — B2B-магазин промышленного оборудования",
  description: "Контактные данные для связи с менеджером.",
};

export default function ContactsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Контакты" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Контакты</h1>

      <div className="mt-6 max-w-xl">
        <DraftNotice />

        {/* Заглушка — реальные реквизиты компании ещё не переданы. Значения совпадают
            с временными данными в components/layout/Footer.tsx, чтобы не расходились. */}
        <dl className="mt-6 flex flex-col gap-3 text-primary">
          <div>
            <dt className="text-sm text-secondary">Телефон</dt>
            <dd>+7 (000) 000-00-00 (временная заглушка)</dd>
          </div>
          <div>
            <dt className="text-sm text-secondary">Email</dt>
            <dd>info@example.com (временная заглушка)</dd>
          </div>
          <div>
            <dt className="text-sm text-secondary">Юридический адрес и реквизиты</dt>
            <dd>Будут добавлены позже.</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
