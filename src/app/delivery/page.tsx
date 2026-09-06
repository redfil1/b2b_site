import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

// ВРЕМЕННО (самокритичный аудит, 2026-09-06, см. docs/seo.md): текст страницы пока
// черновой (DraftNotice ниже) — та же логика, что уже применена к /catalog/*
// (SEO.md, раздел 9): не индексировать, пока не заменён финальным.
export const metadata: Metadata = {
  title: "Доставка и оплата — B2B-магазин промышленного оборудования",
  description: "Условия доставки и оплаты.",
  robots: { index: false },
};

export default function DeliveryPage() {
  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Доставка и оплата" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Доставка и оплата</h1>

      <div className="mt-6 max-w-3xl">
        <DraftNotice />

        <div className="mt-6 flex flex-col gap-6 text-primary">
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-primary">Доставка</h2>
            {/* Обязательная оговорка про Китай и производственный цикл — та же формулировка,
                что зафиксирована для PDF КП (Commercial-offer.md, раздел 4, пункт 6). */}
            <p>
              Все товары поставляются под заказ из Китая — собственного склада в России нет.
              Ориентировочный срок поставки для конкретной позиции указывается диапазоном (мин–макс
              дней) в коммерческом предложении.
            </p>
            <p>
              Точный срок зависит от производственного цикла у поставщика, таможенного оформления и
              логистики и фиксируется в договоре только после подтверждения заказа поставщиком.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-primary">Оплата</h2>
            <p>
              Оплата на сайте не принимается. Условия оплаты согласовываются с менеджером
              индивидуально после согласования коммерческого предложения.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
