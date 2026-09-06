import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { siteConfig } from "@/config/site";

// ВРЕМЕННО (самокритичный аудит, 2026-09-06, см. docs/seo.md): текст страницы пока
// черновой (DraftNotice ниже) — та же логика, что уже применена к /catalog/*
// (SEO.md, раздел 9): не индексировать, пока не заменён финальным.
export const metadata: Metadata = {
  title: `Услуги — ${siteConfig.name}`,
  description:
    "Подбор и поставка промышленного оборудования из Китая, консультации по подбору техники.",
  robots: { index: false },
};

export default function ServicesPage() {
  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Услуги" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Услуги</h1>

      <div className="mt-6 max-w-3xl">
        <DraftNotice />

        {/* Факты — только из CLAUDE.md (описание проекта и флоу работы с клиентом),
            ничего сверх этого не добавлено. */}
        <div className="mt-6 flex flex-col gap-6 text-primary">
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-primary">
              Подбор и поставка оборудования из Китая
            </h2>
            <p>
              Поставляем промышленное и специализированное оборудование под заказ из Китая:
              газоанализаторы, контрольно-измерительные приборы (КИП), лабораторное оборудование и
              спецтехнику. Собственного склада в России нет — каждая позиция подбирается и
              заказывается индивидуально.
            </p>
            <p>
              Вы выбираете товар в каталоге и связываетесь с менеджером. Менеджер готовит
              коммерческое предложение, согласовывает характеристики, сроки и условия у поставщика и
              оформляет заказ.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-primary">
              Консультации по подбору техники под задачу
            </h2>
            <p>
              Помогаем определить подходящее оборудование под конкретную задачу и условия
              эксплуатации: какие характеристики важны, чем отличаются доступные варианты и что
              указать в запросе на коммерческое предложение.
            </p>
            <p>
              Консультация возможна до выбора конкретной позиции в каталоге — по телефону или email
              со страницы «Контакты».
            </p>
          </section>
        </div>

        {/* CTA — как на карточке товара: ссылка на /contacts, без форм и без сбора данных
            (юридическое решение, см. docs/architecture.md). */}
        <Link
          href="/contacts"
          className="mt-8 inline-flex items-center justify-center rounded-2xl bg-brand-800 px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-600"
        >
          Связаться с менеджером
        </Link>
      </div>
    </Container>
  );
}
