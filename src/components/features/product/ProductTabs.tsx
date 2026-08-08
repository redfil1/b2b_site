"use client";

import { useState, type ReactNode } from "react";

// Вкладки Описание/Характеристики/Комплектация/Документы (Frontend.md, раздел 4.3.2) —
// переключение требует клиентского состояния, поэтому это единственный клиентский
// компонент среди новых страниц каталога/карточки товара.
export interface ProductTab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface ProductTabsProps {
  tabs: ProductTab[];
}

export function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Информация о товаре"
        className="flex flex-wrap gap-2 border-b border-gray-200"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab?.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-base font-semibold transition-colors duration-200 ease-out ${
                isActive
                  ? "border-brand-800 text-brand-800"
                  : "border-transparent text-secondary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-6">
        {activeTab?.content}
      </div>
    </div>
  );
}
