import { useState, useEffect } from "react";
import HeroCard from "../common/heroCard";

const PromoFour = () => {
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/offers")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setOffer(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("could not load data", err));
  }, []);

  return (
    <section className="offer-layer">
      <div className="card-layer">
        {offer &&
          offer.map((item, idx) => (
            <HeroCard
              key={item.id || idx}
              data={item}
              index={idx}
              isStatic={true}
            />
          ))}
      </div>
    </section>
  );
};

export default PromoFour;
