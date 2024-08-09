import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../../../components/shared/loader";
import "./index.scss";

export default function Gallery() {
  const { t } = useTranslation();
  const galleryRef = useRef(null);
  const [inView, setInView] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  // Обробник прокрутки
  const handleScroll = (event) => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView((prev) => [...prev, entry.target.dataset.index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = galleryRef.current.querySelectorAll(".photo");
    elements.forEach((element) => observer.observe(element));

    return () => elements.forEach((element) => observer.unobserve(element));
  }, []);

  // Remove loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoader(false);
    }, 6000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); 

  const imagesSrc = new Array(80)
    .fill(0)
    .map((_, index) => `src/assets/gallery/${1}.png`);

  return (
    <section className="Gallery">
      <h2 className="hidden">{t("gallery.title")}</h2>
      <div className="loader-wrapper">
       { isLoader && (
        <div className="text-white flex items-center gap-4">
          {t("gallery.loaderMessage")} <Loader/>
        </div>
       )}
      </div>
      <div className="grid-wrapper" ref={galleryRef}>
        {imagesSrc.map((src, index) => (
          <div
            key={index}
            data-index={index}
            className={`photo ${inView.includes(index.toString()) ? 'animated show' : ''}`}
            style={{ 
              backgroundImage: `url(${src})`,
              animationDelay: `${index < 13? index * 0.1 + 5 : 1}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}
