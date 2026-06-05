import React from 'react';
import { Link, useLocation } from 'react-router';

export interface NavItem {
  key: string;
  href: string;
  label: string;
}

export interface ManufacturingNavProps {
  lang: 'en' | 'ru' | 'zh';
  items: NavItem[];
}

export function ManufacturingNav({ lang, items }: ManufacturingNavProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      aria-label="Manufacturing sections"
      className="mb-10 border-b border-gray-200 overflow-x-auto"
    >
      <ul className="flex gap-1 min-w-max pb-2">
        {items.map((item) => {
          const base = `/${lang}/manufacturing`;
          const isActive =
            item.key === 'overview'
              ? pathname === base || pathname === base + '/'
              : pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.key}>
              <Link
                to={item.href}
                className={`
                  block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
