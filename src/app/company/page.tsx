import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "О компании — B2B-магазин промышленного оборудования",
  description: "Информация о компании: чем занимаемся, с кем и как работаем.",
};

export default function CompanyPage() {
  return (
    <Container as="main" className="py-10">
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
            нет, каждая позиция подбирается индивидуально.
          </p>
          <p>
            Работаем с юридическими лицами. Оплата на сайте не принимается, персональные данные
            через сайт не собираются. Флоу работы с клиентом: вы выбираете товар → связываетесь с
            менеджером напрямую по телефону или email со страницы «Контакты» → менеджер готовит
            коммерческое предложение (КП) и согласовывает детали → оформляем заказ у поставщика.
          </p>
        </div>
      </div>
    </Container>
  );
}
