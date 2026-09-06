import { Input } from "@/components/ui/Input";

// Инлайн-поиск по каталогу (Architecture.md, раздел 2): одно текстовое поле, по сабмиту —
// обычная GET-навигация на /search?q=<запрос>, без клиентского состояния. Один компонент
// на два места — шапка (Header.tsx) и сама страница результатов (/search, Frontend.md,
// раздел 8.4), чтобы поведение формы не расходилось. Отдельного клиентского фильтра в
// проекте нет — вся логика поиска на странице /search.
export interface SearchFormProps {
  className?: string;
  /** Предзаполненное значение поля — на /search подставляется текущий запрос `q`,
   *  чтобы его можно было уточнить, не возвращаясь к шапке. */
  defaultValue?: string;
}

export function SearchForm({ className = "", defaultValue }: SearchFormProps) {
  return (
    <form action="/search" role="search" className={className}>
      <Input
        type="search"
        name="q"
        defaultValue={defaultValue}
        aria-label="Поиск по каталогу"
        placeholder="Поиск по каталогу"
      />
    </form>
  );
}
