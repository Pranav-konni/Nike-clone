import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroCard from "../common/heroCard";

const AdminCategory = () => {
  const params = useParams();

  const categorySlug =
    params.categorySlug || params.categoryName || params.slug;

  const [loading, setLoading] = useState(true);

  const [categoryData, setCategoryData] = useState(null);

  const [products, setProducts] = useState([]);

  const [heroForm, setHeroForm] = useState({
    prdtName: "",
    bgImage: "",
    themeColor: "#ffffff",
  });

  const [promotionForm, setPromotionForm] = useState({
    collabImage: "",
    collabName: "",
    Quote: "",
    buttonName: "",
    themeColor: "#000000",
  });

  const [productForm, setProductForm] = useState({
    productImage: "",
    modelName: "",
    description: "",
    variants: "",
    qty: 0,
    price: "",
    shopBtnName: "Shop Now",
    themeColor: "#000000",

    trending: false,
    topSeller: false,
    featured: false,

    featuredType: "",
  });

  const [exploreForm, setExploreForm] = useState({
    title: "",
    subtitle: "",
    bgImage: "",
    linkUrl: "",
    buttonText: "Explore More",
    themeColor: "#ffffff",
  });

  const [editProductId, setEditProductId] = useState(null);

  const [editExploreIndex, setEditExploreIndex] = useState(null);

  const CATEGORY_API = "http://localhost:5000/categories";

  const PRODUCT_API = "http://localhost:5000/products";

  const fetchCategory = async () => {
    try {
      setLoading(true);

      const response = await fetch(CATEGORY_API);

      const data = await response.json();

      const normalizedSlug = categorySlug?.trim().toLowerCase();

      const foundCategory = data.find(
        (item) => item.slug?.trim().toLowerCase() === normalizedSlug
      );

      if (foundCategory) {
        setCategoryData(foundCategory);

        setHeroForm({
          prdtName: foundCategory.hero?.prdtName || "",
          bgImage: foundCategory.hero?.bgImage || "",
          themeColor: foundCategory.hero?.themeColor || "#ffffff",
        });

        setPromotionForm({
          collabImage: foundCategory.promotion?.collabImage || "",
          collabName: foundCategory.promotion?.collabName || "",
          Quote: foundCategory.promotion?.Quote || "",
          buttonName: foundCategory.promotion?.buttonName || "Shop Now",
          themeColor: foundCategory.promotion?.themeColor || "#000000",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCT_API);

      const data = await response.json();

      const filteredProducts = data.filter(
        (item) => item.category === categorySlug
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [categorySlug]);

  const updateCategory = async (updatedCategory) => {
    try {
      await fetch(`${CATEGORY_API}/${updatedCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      setCategoryData(updatedCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;

    setHeroForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePromotionChange = (e) => {
    const { name, value } = e.target;

    setPromotionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleExploreChange = (e) => {
    const { name, value } = e.target;

    setExploreForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHeroImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setHeroForm((prev) => ({
        ...prev,
        bgImage: `/images/${file.name}`,
      }));
    }
  };

  const handlePromotionImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPromotionForm((prev) => ({
        ...prev,
        collabImage: `/images/${file.name}`,
      }));
    }
  };

  const handleProductImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProductForm((prev) => ({
        ...prev,
        productImage: `/images/${file.name}`,
      }));
    }
  };

  const handleExploreImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setExploreForm((prev) => ({
        ...prev,
        bgImage: `/images/${file.name}`,
      }));
    }
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();

    const updatedCategory = {
      ...categoryData,
      hero: heroForm,
    };

    await updateCategory(updatedCategory);
  };

  const handlePromotionSubmit = async (e) => {
    e.preventDefault();

    const updatedCategory = {
      ...categoryData,
      promotion: promotionForm,
    };

    await updateCategory(updatedCategory);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...productForm,
      category: categorySlug,
    };

    try {
      if (editProductId) {
        await fetch(`${PRODUCT_API}/${editProductId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            id: editProductId,
          }),
        });
      } else {
        await fetch(PRODUCT_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      resetProductForm();

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExploreSubmit = async (e) => {
    e.preventDefault();

    const updatedExplore = [...(categoryData.explore || [])];

    if (editExploreIndex !== null) {
      updatedExplore[editExploreIndex] = {
        ...exploreForm,
        id: updatedExplore[editExploreIndex].id,
      };
    } else {
      updatedExplore.push({
        ...exploreForm,
        id: Date.now().toString(),
      });
    }

    const updatedCategory = {
      ...categoryData,
      explore: updatedExplore,
    };

    await updateCategory(updatedCategory);

    resetExploreForm();
  };

  const handleEditProduct = (item) => {
    setEditProductId(item.id);

    setProductForm({
      productImage: item.productImage || "",
      modelName: item.modelName || "",
      description: item.description || "",
      variants: item.variants || "",
      qty: item.qty || 0,
      price: item.price || "",
      shopBtnName: item.shopBtnName || "Shop Now",
      themeColor: item.themeColor || "#000000",

      trending: item.trending || false,
      topSeller: item.topSeller || false,
      featured: item.featured || false,

      featuredType: item.featuredType || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`${PRODUCT_API}/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditExplore = (item, index) => {
    setExploreForm({
      title: item.title || "",
      subtitle: item.subtitle || "",
      bgImage: item.bgImage || "",
      linkUrl: item.linkUrl || "",
      buttonText: item.buttonText || "",
      themeColor: item.themeColor || "#ffffff",
    });

    setEditExploreIndex(index);
  };

  const handleDeleteExplore = async (index) => {
    const updatedExplore = categoryData.explore.filter(
      (_, i) => i !== index
    );

    const updatedCategory = {
      ...categoryData,
      explore: updatedExplore,
    };

    await updateCategory(updatedCategory);
  };

  const resetProductForm = () => {
    setEditProductId(null);

    setProductForm({
      productImage: "",
      modelName: "",
      description: "",
      variants: "",
      qty: 0,
      price: "",
      shopBtnName: "Shop Now",
      themeColor: "#000000",

      trending: false,
      topSeller: false,
      featured: false,

      featuredType: "",
    });
  };

  const resetExploreForm = () => {
    setEditExploreIndex(null);

    setExploreForm({
      title: "",
      subtitle: "",
      bgImage: "",
      linkUrl: "",
      buttonText: "Explore More",
      themeColor: "#ffffff",
    });
  };

  if (loading) {
    return <div className="admin-category-manager">Loading...</div>;
  }

  if (!categoryData) {
    return <div className="admin-category-manager">Category Not Found</div>;
  }

  return (
    <div className="admin-category-manager">
      <header className="category-header">
        <h2>{categoryData.title}</h2>
      </header>

      <section className="category-section">
        <div className="section-title">
          <h3>Hero Banner</h3>
        </div>

        <div className="category-grid">
          <form className="category-form" onSubmit={handleHeroSubmit}>
            <input
              type="text"
              name="prdtName"
              placeholder="Hero Title"
              value={heroForm.prdtName}
              onChange={handleHeroChange}
            />

            <input type="file" onChange={handleHeroImage} />

            <button className="shop-now-btn" type="submit">
              UPDATE HERO
            </button>
          </form>

          <div className="preview-wrapper">
            <HeroCard data={heroForm} isStatic={true} />
          </div>
        </div>
      </section>

      <section className="category-section">
        <div className="section-title">
          <h3>Promotion Banner</h3>
        </div>

        <div className="category-grid">
          <form className="category-form" onSubmit={handlePromotionSubmit}>
            <input
              type="text"
              name="collabName"
              placeholder="Promotion Title"
              value={promotionForm.collabName}
              onChange={handlePromotionChange}
            />

            <input
              type="text"
              name="Quote"
              placeholder="Quote"
              value={promotionForm.Quote}
              onChange={handlePromotionChange}
            />

            <input
              type="text"
              name="buttonName"
              placeholder="Button Name"
              value={promotionForm.buttonName}
              onChange={handlePromotionChange}
            />

            <input type="file" onChange={handlePromotionImage} />

            <button className="shop-now-btn" type="submit">
              UPDATE PROMOTION
            </button>
          </form>

          <div className="preview-wrapper">
            <HeroCard data={promotionForm} isStatic={true} />
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="section-title">
          <h3>Products</h3>
        </div>

        <div className="category-grid">
          <form className="category-form" onSubmit={handleProductSubmit}>
            <input
              type="text"
              name="modelName"
              placeholder="Product Name"
              value={productForm.modelName}
              onChange={handleProductChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={productForm.description}
              onChange={handleProductChange}
            />

            <input
              type="text"
              name="variants"
              placeholder="Variants"
              value={productForm.variants}
              onChange={handleProductChange}
            />

            <input
              type="number"
              name="qty"
              placeholder="Quantity"
              value={productForm.qty}
              onChange={handleProductChange}
            />

            <input
              type="text"
              name="price"
              placeholder="Price"
              value={productForm.price}
              onChange={handleProductChange}
            />

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={productForm.featured}
                  onChange={handleProductChange}
                />
                Shop Activity
              </label>

              <label>
                <input
                  type="checkbox"
                  name="topSeller"
                  checked={productForm.topSeller}
                  onChange={handleProductChange}
                />
                Top Seller
              </label>

              <label>
                <input
                  type="checkbox"
                  name="trending"
                  checked={productForm.trending}
                  onChange={handleProductChange}
                />
                Trending
              </label>
            </div>

            {productForm.featured && (
              <select
                name="featuredType"
                value={productForm.featuredType}
                onChange={handleProductChange}
              >
                <option value="">Select Featured Type</option>

                <option value="running">Running</option>

                <option value="football">Football</option>

                <option value="basketball">Basketball</option>

                <option value="sports">Sports</option>

                <option value="casual">Casual</option>
              </select>
            )}

            <input type="file" onChange={handleProductImage} />

            <div className="form-action-buttons">
              <button
                className={`shop-now-btn ${
                  editProductId ? "update-mode-btn" : "add-mode-btn"
                }`}
                type="submit"
              >
                {editProductId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
              </button>

              {editProductId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetProductForm}
                >
                  CANCEL
                </button>
              )}
            </div>
          </form>

          <div className="preview-wrapper">
            <HeroCard
              data={{
                ...productForm,
                shopBtnName: editProductId
                  ? productForm.shopBtnName
                  : "",
              }}
              isStatic={true}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Type</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.modelName}</td>

                  <td>{item.qty}</td>

                  <td>
                    {item.featured &&
                      `Shop Activity (${item.featuredType}) `}
                    {item.topSeller && "Top Seller "}
                    {item.trending && "Trending "}
                  </td>

                  <td>{item.price}</td>

                  <td>
                    <button
                      className="shop-now-btn"
                      onClick={() => handleEditProduct(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="shop-now-btn"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="product-section">
        <div className="section-title">
          <h3>Explore More</h3>
        </div>

        <div className="category-grid">
          <form className="category-form" onSubmit={handleExploreSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Explore Title"
              value={exploreForm.title}
              onChange={handleExploreChange}
            />

            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={exploreForm.subtitle}
              onChange={handleExploreChange}
            />

            <input
              type="text"
              name="linkUrl"
              placeholder="Link URL"
              value={exploreForm.linkUrl}
              onChange={handleExploreChange}
            />

            <input
              type="text"
              name="buttonText"
              placeholder="Button Text"
              value={exploreForm.buttonText}
              onChange={handleExploreChange}
            />

            <input type="file" onChange={handleExploreImage} />

            <div className="form-action-buttons">
              <button
                className={`shop-now-btn ${
                  editExploreIndex !== null
                    ? "update-mode-btn"
                    : "add-mode-btn"
                }`}
                type="submit"
              >
                {editExploreIndex !== null
                  ? "UPDATE EXPLORE"
                  : "ADD EXPLORE"}
              </button>

              {editExploreIndex !== null && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetExploreForm}
                >
                  CANCEL
                </button>
              )}
            </div>
          </form>

          <div className="preview-wrapper">
            <HeroCard
              data={{
                prdtName: exploreForm.title,
                bgImage: exploreForm.bgImage,
                buttonName:
                  editExploreIndex !== null
                    ? exploreForm.buttonText
                    : "",
                themeColor: exploreForm.themeColor,
              }}
              isStatic={true}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categoryData.explore?.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.title}</td>

                  <td>{item.linkUrl}</td>

                  <td>
                    <button
                      className="shop-now-btn"
                      onClick={() => handleEditExplore(item, index)}
                    >
                      Edit
                    </button>

                    <button
                      className="shop-now-btn"
                      onClick={() => handleDeleteExplore(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminCategory;