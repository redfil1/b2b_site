import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between md:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold text-primary">
            B2B-магазин промышленного оборудования
          </span>
          {/* Временная заглушка — реальные реквизиты компании ещё не переданы. */}
          <div className="text-secondary">
            <p>Телефон: +7 (000) 000-00-00 (временная заглушка)</p>
            <p>Email: info@example.com (временная заглушка)</p>
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
      </div>

      <div className="border-t border-gray-200">
        <p className="mx-auto max-w-7xl px-4 py-4 text-sm text-secondary md:px-6 lg:px-8">
          © {currentYear} B2B-магазин промышленного оборудования. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
