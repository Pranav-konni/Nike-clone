import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroCard from "../common/heroCard";
import NavButton from "../common/button";

const Trending = () => {
  const [trending, setTrend] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);
  const navigate = useNavigate();
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
          const filtered = data.filter((item) => item.trending === true);

          setTrend(filtered);
        } else {
          setTrend([]);
        }
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
        dir === "right" ? scrollLeft + scrollAmount : scrollLeft - scrollAmount;

      sliderRef.current.scrollTo({
        left: target,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="trending">
      <h2>Trending</h2>

      <div className="btn-layer">
        <NavButton direction="left" onClick={() => manualScroll("left")} />

        <NavButton direction="right" onClick={() => manualScroll("right")} />

        <div className="scroll-layer" ref={sliderRef} onScroll={handleScroll}>
          {trending.map((item, idx) => (
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
      </div>
    </section>
  );
};

export default Trending;
