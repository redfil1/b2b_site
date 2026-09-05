import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { normalizePhoneForTel } from "@/lib/utils/phone";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 bg-secondary">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold text-primary">{siteConfig.name}</span>
          {/* Контакты — из src/config/site.ts (пока временные заглушки). tel:/mailto: —
              чтобы на мобильном номер/почта открывались сразу в звонилке/почтовом клиенте
              (это не форма сбора данных и не CTA-переход, а сами контакты менеджера). */}
          <div className="text-secondary">
            <p>
              Телефон:{" "}
              <a
                href={`tel:${normalizePhoneForTel(siteConfig.contacts.phone)}`}
                className="transition-colors duration-200 ease-out hover:text-primary"
              >
                {siteConfig.contacts.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${siteConfig.contacts.email}`}
                className="transition-colors duration-200 ease-out hover:text-primary"
              >
                {siteConfig.contacts.email}
              </a>
            </p>
          </div>
        </div>

        <nav aria-label="Дополнительные ссылки" className="flex flex-col gap-2">
          <Link
            href="/delivery"
            className="text-secondary transition-colors duration-200 ease-out hover:text-primary"
          >
            Доставка и оплата
          </Link>
          {/* Список legal-документов ещё не зафиксирован (Project_Structure.md: legal/[doc]) —
              одна ссылка-заглушка на политику конфиденциальности. */}
          <Link
            href="/legal/privacy"
            className="text-secondary transition-colors duration-200 ease-out hover:text-primary"
          >
            Политика конфиденциальности
          </Link>
        </nav>
      </Container>

      <div className="border-t border-gray-200">
        <Container as="p" className="py-4 text-sm text-secondary">
          © {currentYear} {siteConfig.name}. Все права защищены.
        </Container>
      </div>
    </footer>
  );
}
