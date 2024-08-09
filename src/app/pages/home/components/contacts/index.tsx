import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ContactForm from "./components/contact-form";
import "leaflet/dist/leaflet.css";
import "./index.scss";

const Contacts = () => {
  return (
    <section className="Contacts">
      <div className="contact-section">
        <div className="map-container">
          <MapContainer
            center={[50.7681, 15.1062]}
            zoom={16}
            scrollWheelZoom={true}
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png" />
            <Marker position={[50.7671, 15.0562]}>
              <Popup>Ми знаходимося тут.</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="contact-form-container">
          <h2>Замовити фотосесію</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
