import { useTranslation } from "react-i18next";
import ContactForm from "./components/contact-form";
import "./index.scss";

const Contacts = () => {
  const { t } = useTranslation();
  return (
    <section className="Contacts">
      <div className="contact-section">
        <div className="map-container"> </div>
        <div className="contact-form-container">
          <h2>{t('contacts.title')}</h2>
          <p className="opacity-50 px-3 mb-3">{t('contacts.description')}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
