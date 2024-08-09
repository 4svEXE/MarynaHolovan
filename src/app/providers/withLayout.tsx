import Sidebar from "../components/layouts/sidebar";

export default function WithLayout({ children, toggleTheme }) {
  return (
    <div className="bg-white dark:bg-black h-[100vh] overflow-hidden">
      <Sidebar toggleTheme={toggleTheme} />

      <div className="flex flex-col">{children}</div>
    </div>
  );
}
