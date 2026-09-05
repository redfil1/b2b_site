import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { buttonClassName, type ButtonVariant } from "@/components/ui/Button";

// Ссылка, оформленная как кнопка (переход, а не submit — <button> внутри <a> невалиден
// по HTML). Переиспользует классы/варианты Button вместо повторения их в каждом месте,
// где нужна ссылка-кнопка (not-found.tsx, error.tsx и т.п. — Project_Structure.md:
// components/ui без бизнес-логики, только пропсы и вёрстка).
export interface LinkButtonProps
  extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  variant?: ButtonVariant;
}

export function LinkButton({ variant = "primary", className = "", ...props }: LinkButtonProps) {
  return <Link className={buttonClassName(variant, className)} {...props} />;
}
