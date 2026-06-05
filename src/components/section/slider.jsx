import { useState, useEffect, useRef } from "react";
import HeroCard from "../common/heroCard";
import NavButton from "../common/button";
import HeroLogo from "../../assets/images/jordanLogo2.png";
import { NavLink } from "react-router-dom";

const HeroSlider = () => {
  const [banners, setBanners] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch(" http://localhost:5000/banner")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setBanners(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("could not load data", err));
  }, []);

  useEffect(() => {
    if (banners && banners.length > 0) {
      const interval = setInterval(() => {
        manualScroll("right");
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);
  const handleScroll = () => {
    if (sliderRef.current) setScrollPos(sliderRef.current.scrollLeft);
  };

  const manualScroll = (dir) => {
    if (sliderRef.current) {
      const { scrollLeft, offsetWidth, scrollWidth } = sliderRef.current;
      let target;

      if (dir === "right") {
        target =
          scrollLeft + offsetWidth >= scrollWidth - 10
            ? 0
            : scrollLeft + offsetWidth;
      } else {
        target =
          scrollLeft <= 10
            ? scrollWidth - offsetWidth
            : scrollLeft - offsetWidth;
      }

      sliderRef.current.scrollTo({
        left: target,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section className="hero-slider">
        <NavButton direction="left" onClick={() => manualScroll("left")} />

        <NavButton direction="right" onClick={() => manualScroll("right")} />
        <div className="slider-track" ref={sliderRef} onScroll={handleScroll}>
          {banners &&
            banners.map((item, idx) => (
              <HeroCard
                key={item.id || idx}
                data={item}
                index={idx}
                scrollPos={scrollPos}
                containerWidth={
                  sliderRef.current?.offsetWidth || window.innerWidth
                }
              />
            ))}
        </div>
      </section>
      <section className="banner-foot">
        <div className="container">
          <div className="sub-container">
            <div className="heroLogo">
              <img src={HeroLogo} alt="jordan-Logo" />
            </div>
            <div className="hero-btn">
              <ul className="btn-nav-link">
                <li>
                  <NavLink to="/newArrival">New Arrival</NavLink>
                </li>
                <li>
                  <NavLink to="/jordanSport">Jordan Sport</NavLink>
                </li>
                <li>
                  <NavLink to="/community">Purpose & Community</NavLink>
                </li>
                <li>
                  <NavLink to="/shoes">Shoes</NavLink>
                </li>
                <li>
                  <NavLink to="/accessories">Accessories</NavLink>
                </li>
                <li>
                  <NavLink to="/clothing">Clothing</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSlider;
