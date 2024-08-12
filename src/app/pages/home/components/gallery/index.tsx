import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../../../components/shared/loader";
import "./index.scss";

export default function Gallery() {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState<string[]>([]);
  const [isLoader, setIsLoader] = useState(true);

  const handleScroll = (event: WheelEvent) => {
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
            const target = entry.target as HTMLElement;
            setInView((prev) => [...prev, target.dataset.index!]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = galleryRef.current?.querySelectorAll(".photo");
    elements?.forEach((element) => observer.observe(element));

    return () => elements?.forEach((element) => observer.unobserve(element));
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
    .map((_, index) => `img/gallery/${index+1}.jpeg`);

  return (
    <section className="Gallery">
      <h2 className="hidden">{t("gallery.title")}</h2>
      <h2 className="md:hidden">{t("sidebar.logo")}</h2>
      <h4 className="md:hidden">{t("sidebar.slogan")}</h4>
      <div className="loader-wrapper">
       { isLoader && (
        <div className="text-white loader-box flex items-center gap-4">
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
