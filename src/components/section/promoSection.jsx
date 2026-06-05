import { useState, useEffect } from "react";
import HeroCard from "../common/heroCard";

const PromoSection = ({ endpoint, sectionClass }) => {
  const [promoData, setPromoData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPromoData(data[0]);
        } else if (data && !Array.isArray(data)) {
          setPromoData(data);
        }
      })
      .catch((err) => console.error(`Error loading ${endpoint}:`, err));
  }, [endpoint]);

  if (!promoData) return null;

  return (
    <section className={sectionClass}>
      <div className="card-layer">
        <HeroCard data={promoData} isStatic={true} />
      </div>
    </section>
  );
};

export default PromoSection;
