import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import SocialLinks from "../../widgets/social";
import LanguageSwitcher from "../../widgets/lang-switcher";
import "./index.scss";

interface SidebarProps {
  // toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const { t } = useTranslation();

  const [activeNav, setActiveNav] = useState<boolean>(false);

  const language = window.localStorage.getItem("i18nextLng") ?? "en";

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [circlePosition, setCirclePosition] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<string>("gallery");

  const toggleNav = () => {
    setActiveNav((prev) => !prev);
  };

  const handleItemClick = (
    index: number,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();

    setActiveIndex(index);
    const element = event.currentTarget;

    const elementA = event.currentTarget.querySelector("a");
    const href = elementA?.getAttribute("href") || "#home";
    const targetElement = document.querySelector(href);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }

    setCurrentPage(t("sidebar." + href.slice(1)));

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
            const index = Array.from(sections).indexOf(
              entry.target as HTMLElement
            );
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
      <Helmet>
        <title>
          {currentPage} | {t("title")}
        </title>
      </Helmet>

      <div id="menuToggle" className="block md:hidden">
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
            <a href="#prices">
              {t("sidebar.prices")}
              <ul>
                <li>{t("sidebar.pricesCards.express")}</li>
                <li>{t("sidebar.pricesCards.standard")}</li>
                <li>{t("sidebar.pricesCards.premium")}</li>
              </ul>
            </a>
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

  
      </div>

      <SocialLinks />
    </aside>
  );
};

export default Sidebar;
