import ContactForm from "./components/contact-form";
import "./index.scss";

const Contacts = () => {
  return (
    <section className="Contacts">
      <div className="contact-section">
        <div className="map-container"> </div>
        <div className="contact-form-container">
          <h2>Замовити фотосесію</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
