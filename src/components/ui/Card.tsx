import type { HTMLAttributes } from "react";

// Без бизнес-логики и без обращения к lib/data — только вёрстка/пропсы (Project_Structure.md).
// Базовая обёртка с рамкой/тенью/радиусом (Frontend.md, раздел 4.4): rounded-2xl (16px),
// только shadow-sm — тяжёлые тени (shadow-xl и т.п.) явно запрещены брифом.
export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
      {...props}
    />
  );
}
