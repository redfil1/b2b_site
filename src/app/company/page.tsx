import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "О компании — B2B-магазин промышленного оборудования",
  description: "Информация о компании: чем занимаемся, с кем и как работаем.",
};

export default function CompanyPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "О компании" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">О компании</h1>

      <div className="mt-6 max-w-3xl">
        <DraftNotice />

        {/* Факты — только из CLAUDE.md (описание проекта), ничего сверх этого не добавлено. */}
        <div className="mt-6 flex flex-col gap-4 text-primary">
          <p>
            Мы — B2B-интернет-магазин промышленного и специализированного оборудования:
            газоанализаторы, контрольно-измерительные приборы (КИП), лабораторное оборудование и
            спецтехника. Оборудование поставляется под заказ из Китая — собственного склада в России
            нет, каждая позиция оформляется индивидуально по заявке.
          </p>
          <p>
            Работаем с юридическими лицами. Оплата на сайте не принимается. Флоу работы с клиентом:
            вы выбираете товар и оставляете заявку → мы формируем коммерческое предложение (КП) в
            PDF → согласовываем детали с менеджером → оформляем заказ у поставщика.
          </p>
        </div>
      </div>
    </main>
  );
}
