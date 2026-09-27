import Link from "next/link";
import type { ReactNode } from "react";

export type BottomNavItem = {
  label: string;
  href?: string;
  icon: ReactNode;
};

type BottomNavProps = {
  items: BottomNavItem[];
  activeHref: string;
};

const BottomNav = ({ items, activeHref }: BottomNavProps) => {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-5 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur"
    >
      <ul className="mx-auto flex max-w-md items-center justify-around gap-4">
        {items.map((item) => {
          const isActive = item.href === activeHref;
          const className = `flex min-h-12 flex-col items-center justify-center gap-1 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${
            isActive ? "text-rose-600" : "text-neutral-500 hover:text-neutral-800"
          }`;
          const content = (
            <>
              <span aria-hidden="true" className="text-2xl leading-none">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </>
          );

          return (
            <li key={item.href ?? item.label} className="flex-1">
              {item.href ? (
                <Link href={item.href} aria-current={isActive ? "page" : undefined} className={className}>
                  {content}
                </Link>
              ) : (
                <button type="button" className={className}>
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;