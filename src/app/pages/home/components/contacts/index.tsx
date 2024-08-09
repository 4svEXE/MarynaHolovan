import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.scss";
import ContactForm from './components/contact-form';

const Contacts = () => {
  return (
    <section className="Contacts">
      <div className="contact-section">
        <div className="map-container">
          <MapContainer
            center={[50.7681, 15.1062]}
            zoom={14}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
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
