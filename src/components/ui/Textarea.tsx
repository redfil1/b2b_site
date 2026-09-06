import type { TextareaHTMLAttributes } from "react";

// Без бизнес-логики и без обращения к lib/data — только вёрстка/пропсы (Project_Structure.md).
// Заведён под необязательное поле «Комментарий» в сводке /cart (Frontend.md, раздел 8.3);
// раньше не требовался (был нужен только отменённой форме заявки), `Select` по-прежнему
// не нужен. Рамка/скругление/фокус — как у Input.tsx (rounded-xl, Frontend.md, раздел 4.3),
// плюс минимальная высота и вертикальный ресайз.
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`min-h-24 w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-base text-primary placeholder:text-secondary transition-colors duration-200 ease-out focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
