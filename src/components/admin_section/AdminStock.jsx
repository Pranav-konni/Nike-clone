import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroCard from "../common/heroCard";

const AdminCategory = () => {
  const params = useParams();

  const categorySlug =
    params.categorySlug || params.categoryName || params.slug;

  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);

  const [heroForm, setHeroForm] = useState({
    collabName: "",
    subtitle: "",
    bgImage: "",
    productImage: "",
    buttonName: "",
    ctaText: "",
    themeColor: "#ffffff",
  });

  const [promotionForm, setPromotionForm] = useState({
    collabImage: "",
    collabName: "",
    Quote: "",
    buttonName: "",
    themeColor: "#ffffff",
  });

  const [featuredForm, setFeaturedForm] = useState({
    bgImage: "",
    prdtName: "",
    buttonName: "",
    themeColor: "#ffffff",
  });

  const [trendingForm, setTrendingForm] = useState({
    productImage: "",
    modelName: "",
    description: "",
    variants: "",
    price: "",
    shopBtnName: "",
    themeColor: "#ffffff",
  });

  const [stocksForm, setStocksForm] = useState({
    productName: "",
    sku: "",
    category: "",
    quantity: "",
    status: "In Stock",
  });

  const [editFeaturedIndex, setEditFeaturedIndex] = useState(null);
  const [editTrendingIndex, setEditTrendingIndex] = useState(null);
  const [editStockIndex, setEditStockIndex] = useState(null);

  const API_URL = "http://localhost:5000/categories";

  const fetchCategory = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      const normalizedSlug = categorySlug?.trim().toLowerCase();

      const foundCategory = data.find(
        (item) => item.slug?.trim().toLowerCase() === normalizedSlug,
      );

      if (foundCategory) {
        setCategoryData(foundCategory);

        setHeroForm(foundCategory.hero || {});
        setPromotionForm(foundCategory.promotion || {});
      } else {
        setCategoryData(null);
      }
    } catch (error) {
      console.error(error);
      setCategoryData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [categorySlug]);

  const updateCategory = async (updatedCategory) => {
    try {
      await fetch(`${API_URL}/${updatedCategory.id}`, {
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

  const handleFeaturedChange = (e) => {
    const { name, value } = e.target;

    setFeaturedForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTrendingChange = (e) => {
    const { name, value } = e.target;

    setTrendingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStocksChange = (e) => {
    const { name, value } = e.target;

    setStocksForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHeroBgImage = (e) => {
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

  const handleFeaturedImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFeaturedForm((prev) => ({
        ...prev,
        bgImage: `/images/${file.name}`,
      }));
    }
  };

  const handleTrendingImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setTrendingForm((prev) => ({
        ...prev,
        productImage: `/images/${file.name}`,
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

  const handleFeaturedSubmit = async (e) => {
    e.preventDefault();

    const updatedFeatured = [...(categoryData.featured || [])];

    if (editFeaturedIndex !== null) {
      updatedFeatured[editFeaturedIndex] = {
        ...featuredForm,
        id: updatedFeatured[editFeaturedIndex].id,
      };
    } else {
      return;
    }

    const updatedCategory = {
      ...categoryData,
      featured: updatedFeatured,
    };

    await updateCategory(updatedCategory);

    setFeaturedForm({
      bgImage: "",
      prdtName: "",
      buttonName: "",
      themeColor: "#ffffff",
    });

    setEditFeaturedIndex(null);
  };

  const handleTrendingSubmit = async (e) => {
    e.preventDefault();

    const updatedTrending = [...(categoryData.trending || [])];

    if (editTrendingIndex !== null) {
      updatedTrending[editTrendingIndex] = {
        ...trendingForm,
        id: updatedTrending[editTrendingIndex].id,
      };
    } else {
      updatedTrending.push({
        ...trendingForm,
        id: Date.now().toString(),
      });
    }

    const updatedCategory = {
      ...categoryData,
      trending: updatedTrending,
    };

    await updateCategory(updatedCategory);

    setTrendingForm({
      productImage: "",
      modelName: "",
      description: "",
      variants: "",
      price: "",
      shopBtnName: "",
      themeColor: "#000000",
    });

    setEditTrendingIndex(null);
  };

  const handleStocksSubmit = async (e) => {
    e.preventDefault();

    const updatedStocks = [...(categoryData.stocks || [])];

    if (editStockIndex !== null) {
      updatedStocks[editStockIndex] = {
        ...stocksForm,
        id: updatedStocks[editStockIndex].id,
      };
    } else {
      updatedStocks.push({
        ...stocksForm,
        id: Date.now().toString(),
      });
    }

    const updatedCategory = {
      ...categoryData,
      stocks: updatedStocks,
    };

    await updateCategory(updatedCategory);

    setStocksForm({
      productName: "",
      sku: "",
      category: "",
      quantity: "",
      status: "In Stock",
    });

    setEditStockIndex(null);
  };

  const handleEditFeatured = (item, index) => {
    setFeaturedForm(item);
    setEditFeaturedIndex(index);
  };

  const handleEditTrending = (item, index) => {
    setTrendingForm(item);
    setEditTrendingIndex(index);
  };

  const handleEditStock = (item, index) => {
    setStocksForm(item);
    setEditStockIndex(index);
  };

  const handleDeleteFeatured = async (index) => {
    const updatedFeatured = categoryData.featured.filter((_, i) => i !== index);

    const updatedCategory = {
      ...categoryData,
      featured: updatedFeatured,
    };

    await updateCategory(updatedCategory);
  };

  const handleDeleteTrending = async (index) => {
    const updatedTrending = categoryData.trending.filter((_, i) => i !== index);

    const updatedCategory = {
      ...categoryData,
      trending: updatedTrending,
    };

    await updateCategory(updatedCategory);
  };

  const handleDeleteStock = async (index) => {
    const updatedStocks = categoryData.stocks.filter((_, i) => i !== index);

    const updatedCategory = {
      ...categoryData,
      stocks: updatedStocks,
    };

    await updateCategory(updatedCategory);
  };

  const handleCancelFeatured = () => {
    setFeaturedForm({
      bgImage: "",
      prdtName: "",
      buttonName: "",
      themeColor: "#ffffff",
    });

    setEditFeaturedIndex(null);
  };

  const handleCancelTrending = () => {
    setTrendingForm({
      productImage: "",
      modelName: "",
      description: "",
      variants: "",
      price: "",
      shopBtnName: "",
      themeColor: "#000000",
    });

    setEditTrendingIndex(null);
  };

  const handleCancelStock = () => {
    setStocksForm({
      productName: "",
      sku: "",
      category: "",
      quantity: "",
      status: "In Stock",
    });

    setEditStockIndex(null);
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
              name="collabName"
              placeholder="Title"
              value={heroForm.collabName}
              onChange={handleHeroChange}
            />

            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={heroForm.subtitle}
              onChange={handleHeroChange}
            />

            <input
              type="text"
              name="buttonName"
              placeholder="Button"
              value={heroForm.buttonName}
              onChange={handleHeroChange}
            />

            <input type="file" onChange={handleHeroBgImage} />

            <button type="submit">UPDATE HERO</button>
          </form>

          <div className="preview-wrapper">
            <HeroCard data={heroForm} isStatic={false} />
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
              placeholder="Title"
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
              placeholder="Button"
              value={promotionForm.buttonName}
              onChange={handlePromotionChange}
            />

            <input type="file" onChange={handlePromotionImage} />

            <button type="submit">UPDATE PROMOTION</button>
          </form>

          <div className="preview-wrapper">
            <HeroCard data={promotionForm} isStatic={true} />
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="section-title">
          <h3>Shop By Activity</h3>
        </div>

        <div className="category-grid">
          <form className="category-form" onSubmit={handleFeaturedSubmit}>
            <input
              type="text"
              name="prdtName"
              placeholder="Activity"
              value={featuredForm.prdtName}
              onChange={handleFeaturedChange}
            />

            <input
              type="text"
              name="buttonName"
              placeholder="Button"
              value={featuredForm.buttonName}
              onChange={handleFeaturedChange}
            />

            <input type="file" onChange={handleFeaturedImage} />

            {editFeaturedIndex !== null && (
              <button type="submit">UPDATE ACTIVITY</button>
            )}

            {editFeaturedIndex !== null && (
              <button type="button" onClick={handleCancelFeatured}>
                Cancel
              </button>
            )}
          </form>

          <div className="preview-wrapper">
            <HeroCard data={featuredForm} isStatic={true} />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <tbody>
              {categoryData.featured?.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.prdtName}</td>

                  <td>
                    <button onClick={() => handleEditFeatured(item, index)}>
                      Edit
                    </button>

                    <button onClick={() => handleDeleteFeatured(index)}>
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
          <h3>Best Sellers</h3>
        </div>

        <div className="category-grid">
          <form className="category-form" onSubmit={handleTrendingSubmit}>
            <input
              type="text"
              name="modelName"
              placeholder="Product"
              value={trendingForm.modelName}
              onChange={handleTrendingChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={trendingForm.description}
              onChange={handleTrendingChange}
            />

            <input
              type="text"
              name="variants"
              placeholder="Variants"
              value={trendingForm.variants}
              onChange={handleTrendingChange}
            />

            <input
              type="text"
              name="price"
              placeholder="Price"
              value={trendingForm.price}
              onChange={handleTrendingChange}
            />

            <input type="file" onChange={handleTrendingImage} />

            <button type="submit">
              {editTrendingIndex !== null ? "UPDATE PRODUCT" : "ADD PRODUCT"}
            </button>

            {editTrendingIndex !== null && (
              <button type="button" onClick={handleCancelTrending}>
                Cancel
              </button>
            )}
          </form>

          <div className="preview-wrapper">
            <HeroCard data={trendingForm} isStatic={true} />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <tbody>
              {categoryData.trending?.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.modelName}</td>
                  <td>{item.price}</td>

                  <td>
                    <button onClick={() => handleEditTrending(item, index)}>
                      Edit
                    </button>

                    <button onClick={() => handleDeleteTrending(index)}>
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
          <h3>Stocks Management</h3>
        </div>

        <div className="category-grid">
          <form className="category-form" onSubmit={handleStocksSubmit}>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={stocksForm.productName}
              onChange={handleStocksChange}
            />

            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={stocksForm.sku}
              onChange={handleStocksChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={stocksForm.category}
              onChange={handleStocksChange}
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={stocksForm.quantity}
              onChange={handleStocksChange}
            />

            <select
              name="status"
              value={stocksForm.status}
              onChange={handleStocksChange}
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <button type="submit">
              {editStockIndex !== null ? "UPDATE STOCK" : "ADD STOCK"}
            </button>

            {editStockIndex !== null && (
              <button type="button" onClick={handleCancelStock}>
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categoryData.stocks?.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.status}</td>

                  <td>
                    <button onClick={() => handleEditStock(item, index)}>
                      Edit
                    </button>

                    <button onClick={() => handleDeleteStock(index)}>
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