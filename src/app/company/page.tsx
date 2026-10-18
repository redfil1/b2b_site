import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

// ВРЕМЕННО (самокритичный аудит, 2026-09-06, см. docs/seo.md): текст страницы пока
// черновой (DraftNotice ниже) — не индексировать, пока не заменён финальным (SEO.md,
// раздел 9.1; та же мера раньше стояла на /catalog/*, снята 2026-10-18).
export const metadata: Metadata = {
  title: `О компании — ${siteConfig.name}`,
  description: "Информация о компании: чем занимаемся, с кем и как работаем.",
  robots: { index: false },
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
            Мы — B2B-интернет-магазин контрольно-измерительного и испытательного оборудования:
            осциллографы, анализаторы спектра и цепей, генераторы сигналов, источники питания и
            прецизионные измерители Tektronix, Keysight, Rohde & Schwarz, Yokogawa, UNI-T и Ceyear.
            Оборудование поставляется под заказ из Китая — собственного склада в России нет, каждая
            позиция подбирается индивидуально.
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
