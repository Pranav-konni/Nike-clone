import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("nikeCart")) || [];

    const updatedCart = storedCart.map((item) => ({
      ...item,
      cartQty: item.cartQty || 1,
    }));

    setCartItems(updatedCart);

    localStorage.setItem(
      "nikeCart",
      JSON.stringify(updatedCart)
    );
  }, []);

  const updateQty = (id, action, selectedSize) => {
    const updatedCart = cartItems.map((item) => {
      if (
        item.id === id &&
        item.selectedSize === selectedSize
      ) {
        const updatedQty =
          action === "increase"
            ? item.cartQty + 1
            : item.cartQty > 1
              ? item.cartQty - 1
              : 1;

        return {
          ...item,
          cartQty: updatedQty,
        };
      }

      return item;
    });

    setCartItems(updatedCart);

    localStorage.setItem(
      "nikeCart",
      JSON.stringify(updatedCart)
    );
  };

  const removeProduct = (id, selectedSize) => {
    const filteredCart = cartItems.filter(
      (item) =>
        !(
          item.id === id &&
          item.selectedSize === selectedSize
        )
    );

    setCartItems(filteredCart);

    localStorage.setItem(
      "nikeCart",
      JSON.stringify(filteredCart)
    );
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.cartQty;
  }, 0);

  const deliveryCharge = subtotal > 0 ? 199 : 0;

  const total = subtotal + deliveryCharge;

  return (
    <div className="cart-page">
      <div className="cart-navbar">
        <div
          className="logo-section"
          onClick={() => navigate("/")}
        >
          <img src="/images/nikeLogo.png" alt="Nike" />
        </div>

        <div className="nav-actions">
          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <div className="cart-wrapper">
        <div className="cart-header">
          <div>
            <h1>Shopping Cart</h1>

            <p>
              {cartItems.length} Item
              {cartItems.length !== 1 && "s"}
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img
              src="/images/nikeLogo.png"
              alt="empty"
            />

            <h2>Your Cart is Empty</h2>

            <p>
              Looks like you haven't added
              anything yet.
            </p>

            <Link to="/" className="shop-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-products">
              {cartItems.map((item) => (
                <div
                  className="cart-card"
                  key={`${item.id}-${item.selectedSize}`}
                >
                  <div className="cart-image">
                    <img
                      src={
                        item.image ||
                        item.productImage ||
                        item.bgImage
                      }
                      alt={
                        item.name ||
                        item.modelName
                      }
                    />
                  </div>

                  <div className="cart-content">
                    <div className="product-details">
                      <h2>
                        {item.name ||
                          item.modelName}
                      </h2>

                      <p>{item.description}</p>

                      <span>{item.variants}</span>

                      <p>
                        Size:{" "}
                        {item.selectedSize ||
                          "N/A"}
                      </p>

                      <h3>
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </h3>
                    </div>

                    <div className="cart-controls">
                      <div className="qty-box">
                        <button
                          onClick={() =>
                            updateQty(
                              item.id,
                              "decrease",
                              item.selectedSize
                            )
                          }
                        >
                          -
                        </button>

                        <span>
                          {item.cartQty}
                        </span>

                        <button
                          onClick={() =>
                            updateQty(
                              item.id,
                              "increase",
                              item.selectedSize
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeProduct(
                            item.id,
                            item.selectedSize
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>

                <span>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>

                <span>
                  ₹
                  {deliveryCharge.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Total</span>

                <span>
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <button className="checkout-btn">
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;