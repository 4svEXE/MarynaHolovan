import React from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

const Prices: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="Prices ">
      <h2>{t("prices.title")}</h2>

      <div className="grid-wrapper grid-cols-1 md:grid-cols-3">
        <div className="price-card">
          <div className="card-body">
            <h4>{t("prices.express.title")}</h4>
            <img src="img/prices/1.jpeg" alt={t("prices.express.alt")} />
            <div className="b-wrapper">
              <b>{t("prices.express.price")}</b>
            </div>
            <p>
              <ol>
                <li>{t("prices.express.duration")}</li>
                <li>{t("prices.express.photos")}</li>
              </ol>
            </p>
          </div>

          <div className="hidden md:flex justify-between gap-7 mt-4 ">
            <a href="#contacts" className="custom-button w-full">
              {t("prices.order")}
            </a>
          </div>
        </div>

        <div className="price-card">
          <div className="card-body">
            <h4>{t("prices.standard.title")}</h4>
            <img src="img/prices/2.jpeg" alt={t("prices.standard.alt")} />
            <div className="b-wrapper">
              <b>{t("prices.standard.price")}</b>
            </div>
            <p>
              <ol>
                <li>{t("prices.standard.duration")}</li>
                <li>{t("prices.standard.photos")}</li>
                <li>{t("prices.standard.prints")}</li>
              </ol>
            </p>
          </div>

          <div className="hidden md:flex justify-between gap-7 mt-4 ">
            <a href="#contacts" className="custom-button w-full">
              {t("prices.order")}
            </a>
          </div>
        </div>

        <div className="price-card">
          <div className="card-body">
            <h4>{t("prices.premium.title")}</h4>
            <img src="img/prices/3.jpeg" alt={t("prices.premium.alt")} />
            <div className="b-wrapper">
              <b>{t("prices.premium.price")}</b>
            </div>
            <p>
              <ol>
                <li>{t("prices.premium.duration")}</li>
                <li>{t("prices.premium.photos")}</li>
                <li>{t("prices.premium.prints")}</li>
              </ol>
            </p>
          </div>

          <div className="hidden md:flex justify-between gap-7 mt-4 ">
            <a href="#contacts" className="custom-button w-full">
              {t("prices.order")}
            </a>
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-between gap-7 mt-4 ">
        <a href="#contacts" className="custom-button w-full">
          {t("prices.order")}
        </a>
        <a href="#contacts" className="custom-button w-full">
          {t("prices.gift")}
        </a>
      </div>
    </section>
  );
};

export default Prices;
