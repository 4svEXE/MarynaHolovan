import React from "react";
import Sidebar from "../components/layouts/sidebar";

interface WithLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
}

export default function WithLayout({ children, toggleTheme }: WithLayoutProps) {
  return (
    <div className="bg-white dark:bg-black h-[100vh] overflow-hidden">
      <Sidebar toggleTheme={toggleTheme} />

      <div className="flex flex-col">{children}</div>
    </div>
  );
}
