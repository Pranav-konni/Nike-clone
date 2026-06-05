import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/navbar";
import HeroCard from "../components/common/HeroCard";
import Footer from "../components/layout/Footer";
import NavButton from "../components/common/button";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const [categoryData, setCategoryData] = useState(null);

  const featuredRef = useRef(null);
  const trendingRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, productRes] = await Promise.all([
          fetch("http://localhost:5000/categories"),
          fetch("http://localhost:5000/products"),
        ]);

        const categories = await catRes.json();
        const products = await productRes.json();

        const foundCategory = categories.find(
          (item) => item.slug === categoryName,
        );

        if (!foundCategory) {
          setCategoryData(null);
          return;
        }

        const filteredProducts = Array.isArray(products)
          ? products.filter((p) => p.category === categoryName)
          : [];

        const featured =
          foundCategory.featured && foundCategory.featured.length > 0
            ? foundCategory.featured
            : filteredProducts
                .filter((p) => p.featured)
                .map((p) => ({
                  id: p.id,

                  bgImage: p.image || p.productImage || "/images/bannerBG.png",

                  prdtName:
                    p.activityName || p.modelName || p.name || "ACTIVITY",

                  buttonName: p.shopBtnName || "Shop Now",

                  themeColor: p.themeColor || "#ffffff",

                  featuredType: p.featuredType || "",
                }));

        const trending =
          foundCategory.trending && foundCategory.trending.length > 0
            ? foundCategory.trending.map((t) => ({
                ...t,

                bgImage: t.bgImage || t.productImage || "/images/bannerBG.png",

                price: t.price
                  ? `₹${Number(
                      String(t.price).replace(/[^0-9.]/g, ""),
                    ).toLocaleString("en-IN")}`
                  : "₹1,499",
              }))
            : filteredProducts
                .filter((p) => p.trending || p.topSeller)
                .map((p) => ({
                  id: p.id,

                  bgImage: p.image || p.productImage || "/images/bannerBG.png",

                  modelName: p.name || p.modelName,

                  description:
                    p.description || p.categoryDetails || "Premium Performance",

                  variants:
                    p.variants ||
                    `${p.colors ? p.colors + " Colors" : "3 Colors"}`,

                  qty: p.qty || 0,

                  price: p.price
                    ? `₹${Number(
                        String(p.price).replace(/[^0-9.]/g, ""),
                      ).toLocaleString("en-IN")}`
                    : "₹1,499",

                  shopBtnName: p.shopBtnName || "Shop Now",

                  themeColor: p.themeColor || "#000000",

                  topSeller: p.topSeller || false,

                  trending: p.trending || false,
                }));

        const topSeller = filteredProducts.filter((p) => p.topSeller);

        let leftBannerFallback = trending[0] || filteredProducts[0];

        let rightBannerFallback = topSeller[0] || filteredProducts[1];

        if (foundCategory.explore && foundCategory.explore.length > 0) {
          if (foundCategory.explore[0]) {
            leftBannerFallback = {
              prdtName: foundCategory.explore[0].title,

              buttonName: foundCategory.explore[0].buttonText || "Explore More",

              bgImage:
                foundCategory.explore[0].bgImage || "/images/bannerBG.png",

              themeColor: foundCategory.explore[0].themeColor || "#ffffff",
            };
          }

          if (foundCategory.explore[1]) {
            rightBannerFallback = {
              prdtName: foundCategory.explore[1].title,

              buttonName: foundCategory.explore[1].buttonText || "Explore More",

              bgImage:
                foundCategory.explore[1].bgImage || "/images/bannerBG.png",

              themeColor: foundCategory.explore[1].themeColor || "#ffffff",
            };
          }
        }

        setCategoryData({
          hero: {
            prdtName: foundCategory.hero?.prdtName || foundCategory.title,

            bgImage: foundCategory.hero?.bgImage || "/images/bannerBG.png",

            themeColor: foundCategory.hero?.themeColor || "#fff",
          },

          featured,

          promotion: {
            collabName:
              foundCategory.promotion?.collabName ||
              `${foundCategory.title} Deals`,

            collabImage:
              foundCategory.promotion?.collabImage || "/images/txj.png",

            Quote: foundCategory.promotion?.Quote || "Best Picks for You",

            buttonName: foundCategory.promotion?.buttonName || "Shop Now",

            themeColor: foundCategory.promotion?.themeColor || "#000000",
          },

          trending,

          bottomBanner: {
            leftBanner: leftBannerFallback,
            rightBanner: rightBannerFallback,
          },
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [categoryName]);

  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;

      const scrollAmount = clientWidth * 0.9;

      const target =
        direction === "right"
          ? scrollLeft + scrollAmount
          : scrollLeft - scrollAmount;

      ref.current.scrollTo({
        left: target,
        behavior: "smooth",
      });
    }
  };

  if (!categoryData) {
    return <div className="loading">Loading...</div>;
  }

  const { hero, featured, promotion, trending, bottomBanner } = categoryData;

  return (
    <main className="category-page">
      <section className="navbar-section">
        <Navbar />
      </section>

      <section className="hero-section">
        <HeroCard data={hero} isStatic={true} />
      </section>

      <section className="featured-section">
        <div className="section-head">
          <div className="activiy-header">
            <h1>Shop By Activity</h1>
          </div>

          <div className="nav-controls">
            <NavButton
              direction="left"
              onClick={() => handleScroll(featuredRef, "left")}
            />

            <NavButton
              direction="right"
              onClick={() => handleScroll(featuredRef, "right")}
            />
          </div>
        </div>

        <div className="featured-grid scroll-layout" ref={featuredRef}>
          {featured?.map((item, index) => (
            <HeroCard key={item.id || index} data={item} isStatic={true} />
          ))}
        </div>
      </section>

      <section className="promotion-section">
        <HeroCard data={promotion} isStatic={true} />
      </section>

      <section className="trending-section">
        <div className="section-head">
          <h2 className="section-title">Best Sellers</h2>

          <div className="nav-controls">
            <NavButton
              direction="left"
              onClick={() => handleScroll(trendingRef, "left")}
            />

            <NavButton
              direction="right"
              onClick={() => handleScroll(trendingRef, "right")}
            />
          </div>
        </div>

        <div className="trending-grid scroll-layout" ref={trendingRef}>
          {trending?.map((item, index) => (
            <HeroCard key={item.id || index} data={item} isStatic={true} />
          ))}
        </div>
      </section>

      <section className="bottom-banner-section">
        <div className="bottom-banner-header">
          <h2>More Explore</h2>
        </div>

        <div className="bottom-grid">
          <HeroCard
            data={bottomBanner?.leftBanner || promotion}
            isStatic={true}
          />

          <HeroCard
            data={bottomBanner?.rightBanner || promotion}
            isStatic={true}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CategoryPage;
