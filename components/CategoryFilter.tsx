import type { ReactNode } from "react";

export type ListingCategory = {
  id: string;
  label: string;
  icon: ReactNode;
};

type CategoryFilterProps = {
  categories: ListingCategory[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
};

const CategoryFilter = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <nav
      aria-label="Categorías de alojamientos"
      className="-mx-6 overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max gap-3 py-1">
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId;

          return (
            <li key={category.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectCategory(category.id)}
                className={`flex min-h-12 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${
                  isSelected
                    ? "border-neutral-300 bg-neutral-100 text-neutral-900 shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  {category.icon}
                </span>
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryFilter;