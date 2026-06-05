import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../layout/navbar";
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (product) =>
            product.modelName.toLowerCase().includes(query.toLowerCase()) ||
            product.id.toLowerCase().includes(query.toLowerCase()),
        );

        setProducts(filtered);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-wrapper">
        <h2 className="search-heading">Search Results for "{query}"</h2>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="search-grid">
                {products.map((product) => (
                  <div className="search-card" key={product.id}>
                    <div className="search-image-wrapper">
                      <img
                        src={product.productImage}
                        alt={product.modelName}
                        className="search-image"
                      />
                    </div>

                    <div className="search-content">
                      <h3 className="search-title">{product.modelName}</h3>

                      <p className="search-description">
                        {product.description}
                      </p>

                      <p className="search-variant">{product.variants}</p>

                      <div className="search-bottom">
                        <p className="search-price">{product.price}</p>

                        <button className="search-btn">
                          {product.shopBtnName}
                        </button>
                        <button className="addToCart-btn">Add</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No products found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
