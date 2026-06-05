import { useState, useEffect } from "react";

const About = () => {
  const aboutLogo = "/images/NikeLogoo.png";
  const location = "/images/location.png";
  const [about, setAbout] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/aboutLogo")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setAbout(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error("could not load data", err));
  }, []);

  return (
    <section className="about-layer">
      <div className="container">
        <div className="logo-layer">
          <img src={aboutLogo} alt="about-nike-logo" />
        </div>

        {/* about content layer */}

        <div className="about-products">
          <div className="featured-section">
            <h4>Featured</h4>
            <p>
              <a href="#">Air force 1</a>
            </p>
            <p>
              <a href="#">Jordan 1</a>
            </p>
            <p>
              <a href="#">Air max Dn</a>
            </p>
            <p>
              <a href="#">Vomero</a>
            </p>
          </div>

          <div className="shoes-section">
            <h4>Shoes</h4>
            <p>
              <a href="#">All shoes</a>
            </p>
            <p>
              <a href="#">Jordan shoes</a>
            </p>
            <p>
              <a href="#">Running shoes</a>
            </p>
            <p>
              <a href="#">Basketball shoes</a>
            </p>
          </div>
          <div className="clothing-section">
            <h4>Clothing</h4>
            <p>
              <a href="#">All clothing</a>
            </p>
            <p>
              <a href="#">Top & T-shirt</a>
            </p>
            <p>
              <a href="#">Shorts</a>
            </p>
            <p>
              <a href="#">Hoodie & Pullover</a>
            </p>
          </div>
          <div className="shoes-section">
            <h4>Kids</h4>
            <p>
              <a href="#">Infant & Toddler shoes</a>
            </p>
            <p>
              <a href="#">Kids shoes</a>
            </p>
            <p>
              <a href="#">Kids basket ball shoes</a>
            </p>
            <p>
              <a href="#">Kids running shoes</a>
            </p>
          </div>
        </div>

        <div className="about-company">
          <div className="resource-section">
            <h4>Resources</h4>
            <p>
              <a href="#">Gift cards</a>
            </p>
            <p>
              <a href="#">Corporate sales</a>
            </p>
            <p>
              <a href="#">Find a store</a>
            </p>
            <p>
              <a href="#">Membership</a>
            </p>
            <p>
              <a href="#">Nike journal</a>
            </p>
            <p>
              <a href="#">Site feedback</a>
            </p>
          </div>
          <div className="help-section">
            <h4>Help</h4>
            <p>
              <a href="#">Get help</a>
            </p>
            <p>
              <a href="#">Order status</a>
            </p>
            <p>
              <a href="#">Shipping delivery</a>
            </p>
            <p>
              <a href="#">Returns</a>
            </p>
            <p>
              <a href="#">Order cancellation</a>
            </p>
            <p>
              <a href="#">Payment option</a>
            </p>
            <p>
              <a href="#">Gift card balance</a>
            </p>
            <p>
              <a href="#">Contact us</a>
            </p>
          </div>
          <div className="company-section">
            <h4>Company</h4>
            <p>
              <a href="#">About Nike</a>
            </p>
            <p>
              <a href="#">News</a>
            </p>
            <p>
              <a href="#">Carrers</a>
            </p>
            <p>
              <a href="#">Investor</a>
            </p>
            <p>
              <a href="#">Purpose</a>
            </p>
            <p>
              <a href="#">Sustainability</a>
            </p>
            <p>
              <a href="#">Accessibility</a>
            </p>
          </div>
          <div className="promotioAndDiscount-section">
            <h4>Promotion & discount</h4>
            <p>
              <a href="#">Student</a>
            </p>
            <p>
              <a href="#">Military</a>
            </p>
            <p>
              <a href="#">Teacher</a>
            </p>
            <p>
              <a href="#">First Responder and Medical Professionals</a>
            </p>
            <p>
              <a href="#">Birthday</a>
            </p>
          </div>
        </div>
        <div className="location-section">
          <img src={location} alt="location-Icon" />
          <p>India</p>
        </div>
      </div>
    </section>
  );
};

export default About;
