import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Контакты — ${siteConfig.name}`,
  description: "Контактные данные для связи с менеджером.",
};

export default function ContactsPage() {
  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Контакты" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Контакты</h1>

      <div className="mt-6 max-w-xl">
        <DraftNotice />

        {/* Контакты — из src/config/site.ts (пока временные заглушки), один источник
            с Header/Footer, чтобы значения не расходились. */}
        <dl className="mt-6 flex flex-col gap-3 text-primary">
          <div>
            <dt className="text-sm text-secondary">Телефон</dt>
            <dd>{siteConfig.contacts.phone}</dd>
          </div>
          <div>
            <dt className="text-sm text-secondary">Email</dt>
            <dd>{siteConfig.contacts.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-secondary">Юридический адрес и реквизиты</dt>
            <dd>Будут добавлены позже.</dd>
          </div>
        </dl>
      </div>
    </Container>
  );
}
