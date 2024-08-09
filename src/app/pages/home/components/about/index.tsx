import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

const About: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="About">
      <h2>{t("about.title")}</h2>
      <div className="grid-wrapper">
        {[
          {
            title: t("about.items.0.title"),
            text: t("about.items.0.text"),
          },
          {
            text: t("about.items.1.text"),
          },
          {
            text: t("about.items.2.text"),
          },
          {
            text: t("about.items.3.text"),
          },
          {
            text: t("about.items.4.text"),
          },
          {
            text: t("about.items.5.text"),
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`grid-item ${activeIndex === index ? "active" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {item.title && <h4>{item.title}</h4>}
            <p className="description">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
