import React from "react";
import Sidebar from "../components/layouts/sidebar";
import PagesNav from "../components/widgets/pages-nav";

interface WithLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
}

const sections = [
  'gallery',
  'prices',
  'about',
  'faq',
  'contacts',
]

export default function WithLayout({ children, toggleTheme }: WithLayoutProps) {
  return (
    <div className="bg-white dark:bg-black h-[100vh] overflow-hidden">
      <Sidebar toggleTheme={toggleTheme} />
      <PagesNav sections={sections} />

      <div className="flex flex-col">{children}</div>
    </div>
  );
}
