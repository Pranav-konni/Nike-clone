import { useState, useEffect, useRef } from "react";
import HeroCard from "../common/heroCard";
import NavButton from "../common/button";

const TopSeller = () => {
  const [topseller, setTopseller] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTopseller(data.filter((item) => item.topSeller));
        }
      })
      .catch((err) => {
        console.error("Could not load data", err);
      });
  }, []);

  const handleScroll = () => {
    if (sliderRef.current) {
      setScrollPos(sliderRef.current.scrollLeft);
    }
  };

  const manualScroll = (dir) => {
    if (!sliderRef.current) return;

    const { scrollLeft, clientWidth } = sliderRef.current;

    const amount = clientWidth * 0.8;

    sliderRef.current.scrollTo({
      left: dir === "right" ? scrollLeft + amount : scrollLeft - amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="topSeller">
      <h2>Top Seller</h2>

      <div className="btn-layer">
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
          {topseller.map((item, idx) => (
            <HeroCard
              key={item.id || idx}
              data={item}
              index={idx}
              scrollPos={scrollPos}
              containerWidth={sliderRef.current?.offsetWidth ?? 0}
              isStatic={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSeller;