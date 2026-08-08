import type { InputHTMLAttributes } from "react";

// Без бизнес-логики и без обращения к lib/data — только вёрстка/пропсы (Project_Structure.md).
// Скругление rounded-xl (14px, Frontend.md, раздел 4.3).
export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-base text-primary placeholder:text-secondary transition-colors duration-200 ease-out focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
