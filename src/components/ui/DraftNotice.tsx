// Баннер-примечание для страниц с временным контентом (Architecture.md: статичные
// страницы вроде /company, /contacts, /delivery, /legal/[doc] пока не наполнены
// финальным текстом). Без пропсов — сообщение одно и то же на всех страницах.
export function DraftNotice() {
  return (
    <div
      role="note"
      className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
    >
      Текст черновой, требует проверки перед публикацией.
    </div>
  );
}
