import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { MailComposeMenu } from "@/components/ui/MailComposeMenu";
import { siteConfig } from "@/config/site";
import { getProductBySlug } from "@/lib/data/products";
import { buildMailLinks, buildMailMenuItems } from "@/lib/utils/mailLinks";
import { normalizePhoneForTel } from "@/lib/utils/phone";

// ВРЕМЕННО (самокритичный аудит, 2026-09-06, см. docs/seo.md): текст страницы (в т.ч.
// «юридический адрес и реквизиты» ниже) пока черновой (DraftNotice) — та же логика,
// что уже применена к /catalog/* (SEO.md, раздел 9): не индексировать, пока не
// заменён финальным.
export const metadata: Metadata = {
  title: `Контакты — ${siteConfig.name}`,
  description: "Контактные данные для связи с менеджером.",
  robots: { index: false },
};

export default async function ContactsPage(props: PageProps<"/contacts">) {
  const { product: productParam } = await props.searchParams;

  // Переход с карточки товара (?product=<slug>, см. catalog/[category]/[slug]/page.tsx) —
  // подтягиваем название через getProductBySlug(), а не выводим сырой параметр как есть:
  // так подсказка не ломается на произвольном/битом значении в URL и не отдаёт клиенту
  // слаг вместо человекочитаемого названия.
  const productSlug = typeof productParam === "string" ? productParam : undefined;
  const product = productSlug ? getProductBySlug(productSlug) : undefined;

  // Переход с карточки товара — сразу даём письмо с готовыми темой и телом (Frontend.md,
  // раздел 8.1): раньше под подсказкой был только общий mailto: без темы/текста, и клиент
  // сам вспоминал, о каком товаре пишет. model/sku добавляются в тело только если
  // заполнены у позиции (тот же принцип, что в строке сводки корзины).
  const productMailItems = product
    ? buildMailMenuItems(
        buildMailLinks({
          to: siteConfig.contacts.email,
          subject: `Запрос КП: ${product.title}${product.sku ? ` — арт. ${product.sku}` : ""}`,
          body: [
            `Здравствуйте! Интересует товар: ${product.title}.`,
            ...(product.model ? [`Модель: ${product.model}`] : []),
            ...(product.sku ? [`Артикул: ${product.sku}`] : []),
            "",
            "Прошу подготовить коммерческое предложение.",
            "",
          ].join("\n"),
        }),
      )
    : undefined;

  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Контакты" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Контакты</h1>

      <div className="mt-6 max-w-xl">
        <DraftNotice />

        {product && productMailItems && (
          <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl border border-brand-800 bg-brand-800/5 px-4 py-3">
            <p className="text-primary">
              Вы интересуетесь товаром: {product.title}. Можно написать менеджеру письмом с уже
              заполненными темой и текстом или связаться по телефону/почте ниже.
            </p>
            <MailComposeMenu label="Написать об этом товаре" items={productMailItems} />
          </div>
        )}

        {/* Контакты — из src/config/site.ts (пока временные заглушки), один источник
            с Header/Footer, чтобы значения не расходились. tel:/mailto: — чтобы номер/
            почта открывались сразу в звонилке/почтовом клиенте (это не форма сбора
            данных и не CTA-переход, а сами контакты менеджера). */}
        <dl className="mt-6 flex flex-col gap-3 text-primary">
          <div>
            <dt className="text-sm text-secondary">Телефон</dt>
            <dd>
              <a
                href={`tel:${normalizePhoneForTel(siteConfig.contacts.phone)}`}
                className="transition-colors duration-200 ease-out hover:text-brand-800"
              >
                {siteConfig.contacts.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-secondary">Email</dt>
            <dd>
              <a
                href={`mailto:${siteConfig.contacts.email}`}
                className="transition-colors duration-200 ease-out hover:text-brand-800"
              >
                {siteConfig.contacts.email}
              </a>
            </dd>
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
