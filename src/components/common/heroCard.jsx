import { useNavigate } from "react-router-dom";
const HeroCard = ({
  data,
  scrollPos = 0,
  index = 0,
  containerWidth = 0,
  isStatic = false,
}) => {
  const navigate = useNavigate();
  const relativeScroll = isStatic ? 0 : scrollPos - index * containerWidth;
  const textMove = relativeScroll * 0.4;
  const productMove = relativeScroll * -0.7;

  return (
    <div className={`heroCard ${isStatic ? "staticCard" : "dynamicCard"}`}>
      {isStatic ? (
        <div className="static-content">
          <div className="image">
            {data?.bgImage && (
              <img src={data?.bgImage} alt={data?.prdtName || "featured"} />
            )}

            {data?.collabImage && <img src={data?.collabImage} alt="collab" />}

            {data?.productImage && <img src={data.productImage} />}
          </div>

          <div className="promo1-text" style={{ color: data?.themeColor }}>
            <h1>{data?.offerText}</h1>
            <h2>{data?.collabName || data?.prdtName}</h2>
            <h3>{data?.modelName}</h3>
            <p>{data?.subtitle || data?.Quote || data?.description}</p>
            <p>{data?.variants}</p>
            <p>{data?.price}</p>

            {(data?.buttonName || data?.ctaText) && (
              <button className="shop-btn">
                {data?.buttonName || data?.ctaText}
              </button>
            )}

            <div className="prom-shop-btn">
              {data?.shopBtnName && (
                <button
                  className="shop-now-btn"
                  onClick={() =>
                    navigate(`/product/${data.productId || data.id}`)
                  }
                >
                  {data?.shopBtnName}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="dynamic-layer"
          style={{ backgroundImage: `url(${data?.bgImage})` }}
        >
          <div
            className="text-layer"
            style={{ transform: `translateX(${textMove}px)` }}
          >
            <h2 style={{ color: data?.themeColor }}>{data?.collabName}</h2>
          </div>

          <div
            className="product-layer"
            style={{
              transform: `translate(${productMove}px) rotate(-10deg)`,
            }}
          >
            <img src={data?.productImage} alt="product" />
          </div>

          <div
            className="info-layer"
            style={{ transform: `translateX(${textMove}px)` }}
          >
            <p>{data?.subtitle}</p>
            <button
              className="shop-btn"
              onClick={() => navigate(`/product/${data.productId || data.id}`)}
            >
              {data?.ctaText}
            </button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCard;
