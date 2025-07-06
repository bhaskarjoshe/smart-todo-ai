"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navLinkClass = (href: string) =>
    `hover:underline ${pathname === href ? "text-blue-400 font-semibold" : ""}`;

  return (
    <header className="bg-gray-800 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Smart Todo</h1>
        <nav className="space-x-6">
          <Link href="/" className={navLinkClass("/")}>
            Dashboard
          </Link>
          <Link href="/tasks/add" className={navLinkClass("/tasks/add")}>
            Add Task
          </Link>
          <Link href="/context" className={navLinkClass("/context")}>
            Context
          </Link>
        </nav>
      </div>
    </header>
  );
}
