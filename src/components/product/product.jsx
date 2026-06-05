import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        return res.json();
      })
      .then((data) => {
        setProduct(data);

        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem("nikeCart")) || [];

    const existingProduct = existingCart.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) => {
        if (
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        ) {
          return {
            ...item,
            cartQty: item.cartQty + 1,
          };
        }

        return item;
      });
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          selectedSize,
          selectedColor,
          cartQty: 1,
        },
      ];
    }

    localStorage.setItem(
      "nikeCart",
      JSON.stringify(updatedCart)
    );

    navigate("/cart");
  };

  if (loading) {
    return <div className="product-loading">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="product-loading">
        Product not found
      </div>
    );
  }

  return (
    <section className="product-page">
      <div className="product-container">
        <div className="product-gallery">
          <div className="main-image">
            <img
              src={product.image || product.productImage}
              alt={product.name || product.modelName}
            />
          </div>

          <div className="thumbnail-row">
            {product.gallery?.map((img, index) => (
              <div className="thumb" key={index}>
                <img src={img} alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        <div className="product-details">
          <p className="brand">Nike</p>

          <h1>
            {product.name || product.modelName}
          </h1>

          <p className="category">
            {product.category}
          </p>

          <h2 className="price">
            ₹
            {Number(product.price).toLocaleString(
              "en-IN"
            )}
          </h2>

          <p className="description">
            {product.description}
          </p>

          {/* COLOR SECTION */}

          <div className="color-wrapper">
            <h3>Select Color</h3>

            <div className="colors">
              {product.colors?.map((color, index) => (
                <button
                  key={index}
                  className={`color-btn ${
                    selectedColor === color
                      ? "active-color"
                      : ""
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() =>
                    setSelectedColor(color)
                  }
                ></button>
              ))}
            </div>
          </div>

          {/* SIZE SECTION */}

          <div className="size-wrapper">
            <h3>Select Size</h3>

            <div className="sizes">
              {product.sizes?.map((size, index) => (
                <button
                  key={index}
                  className={
                    selectedSize === size
                      ? "active-size"
                      : ""
                  }
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="cart-btn"
              onClick={addToCart}
            >
              Add To Cart
            </button>

            <button
              className="buy-btn"
              onClick={addToCart}
            >
              Buy Now
            </button>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;