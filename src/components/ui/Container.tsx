import type { ElementType, HTMLAttributes } from "react";

// Примитив-обёртка под стандартный контейнер страницы (Frontend.md, раздел 4.3:
// "max-w-7xl mx-auto px-4 md:px-6 lg:px-8"). Снимает дублирование этих классов
// по страницам (Architecture.md, 2.2). Только пропсы и вёрстка, без данных.
// `as` задаёт тег: обычно "main" на странице, "div"/"p" внутри layout.
const CONTAINER_CLASSNAME = "mx-auto max-w-7xl px-4 md:px-6 lg:px-8";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export function Container({ as: Component = "div", className = "", ...props }: ContainerProps) {
  return <Component className={`${CONTAINER_CLASSNAME} ${className}`.trim()} {...props} />;
}
