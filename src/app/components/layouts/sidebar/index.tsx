import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";
import SocialLinks from "../../widgets/social";
import ThemeSwitcher from "../../widgets/theme-switcher";
import LanguageSwitcher from "../../widgets/lang-switcher";

interface SidebarProps {
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleTheme }) => {
  const { t } = useTranslation();

  const [activeNav, setActiveNav] = useState<boolean>(false);

  const theme = JSON.parse(window.localStorage.getItem("darkTheme") ?? "false");
  const language = window.localStorage.getItem("i18nextLng") ?? "en";

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [circlePosition, setCirclePosition] = useState<number>(0);

  const toggleNav = () => {
    setActiveNav((prev) => !prev);
  };

  const handleItemClick = (
    index: number,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setActiveIndex(index);
    const element = event.currentTarget;
    toggleNav();
    setCirclePosition(element.offsetTop);
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target as HTMLElement);
            setActiveIndex(index);
            const activeElement = navItems[index] as HTMLLIElement;
            setCirclePosition(activeElement.offsetTop);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const availableLanguages = [
    { code: "en", name: "EN" },
    { code: "uk", name: "UA" },
  ];

  return (
    <aside className={`Sidebar ${activeNav ? "active" : ""}`}>
      <div id="menuToggle">
        <input
          id="checkbox"
          type="checkbox"
          onChange={toggleNav}
          checked={activeNav}
        />
        <label className="toggle" htmlFor="checkbox">
          <div className="bar bar--top"></div>
          <div className="bar bar--middle"></div>
          <div className="bar bar--bottom"></div>
        </label>
      </div>

      <div className="flex flex-col">
        <div className="logo-wrapper">
          <h1 className="logo">{t("sidebar.logo")}</h1>
          <b>{t("sidebar.slogan")}</b>
        </div>
      </div>

      <nav>
        <ul className="navigation">
          <li
            className={`nav-item ${activeIndex === 0 ? "active" : ""}`}
            onClick={(e) => handleItemClick(0, e)}
          >
            <a href="#gallery">{t("sidebar.gallery")}</a>
          </li>
          <li
            className={`nav-item ${activeIndex === 1 ? "active" : ""}`}
            onClick={(e) => handleItemClick(1, e)}
          >
            <a href="#prices">{t("sidebar.prices.title")}</a>
            <ul>
              <li>{t("sidebar.prices.express")}</li>
              <li>{t("sidebar.prices.standard")}</li>
              <li>{t("sidebar.prices.premium")}</li>
            </ul>
          </li>
          <li
            className={`nav-item ${activeIndex === 2 ? "active" : ""}`}
            onClick={(e) => handleItemClick(2, e)}
          >
            <a href="#about">{t("sidebar.about")}</a>
          </li>
          <li
            className={`nav-item ${activeIndex === 3 ? "active" : ""}`}
            onClick={(e) => handleItemClick(3, e)}
          >
            <a href="#faq">{t("sidebar.faq")}</a>
          </li>
          <li
            className={`nav-item ${activeIndex === 4 ? "active" : ""}`}
            onClick={(e) => handleItemClick(4, e)}
          >
            <a href="#contacts">{t("sidebar.contacts")}</a>
            <ul>
              <li>
                <a href="tel:+38099999999">+38099999999</a>
              </li>
            </ul>
          </li>
          <li className="sircle" style={{ top: circlePosition }}></li>
        </ul>
      </nav>

      <div className="flex flex-col gap-6">
        <LanguageSwitcher
          currentLanguage={language}
          availableLanguages={availableLanguages}
        />

        <div className="flex w-full justify-center">
          <ThemeSwitcher toggleTheme={toggleTheme} currentTheme={theme} />
        </div>
      </div>

      <SocialLinks />
    </aside>
  );
};

export default Sidebar;
