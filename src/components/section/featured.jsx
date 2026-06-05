import { useState, useEffect, useRef } from "react";
import HeroCard from "../common/heroCard";
import NavButton from "../common/button";

const Featured = () => {
  const [feature, setFeature] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/featured")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        return res.json();
      })
      .then((data) => {
        setFeature(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("could not load data", err);
      });
  }, []);

  const handleScroll = () => {
    if (sliderRef.current) {
      setScrollPos(sliderRef.current.scrollLeft);
    }
  };

  const manualScroll = (dir) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;

      const scrollAmount = clientWidth * 0.8;

      const target =
        dir === "right"
          ? scrollLeft + scrollAmount
          : scrollLeft - scrollAmount;

      sliderRef.current.scrollTo({
        left: target,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="feature">
      <h2>Featured</h2>

      <NavButton
        direction="left"
        onClick={() => manualScroll("left")}
      />

      <NavButton
        direction="right"
        onClick={() => manualScroll("right")}
      />

      <div
        className="scroll-layer"
        ref={sliderRef}
        onScroll={handleScroll}
      >
        {feature.map((item, idx) => (
          <HeroCard
            key={item.id || idx}
            data={item}
            index={idx}
            scrollPos={scrollPos}
            containerWidth={
              sliderRef.current?.offsetWidth || window.innerWidth
            }
            isStatic={true}
          />
        ))}
      </div>
    </section>
  );
};

export default Featured;