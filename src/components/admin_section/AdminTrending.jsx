import React, { useState, useEffect } from "react";

const AdminTrending = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    productImage: "",
    modelName: "",
    description: "",
    variants: "",
    price: "",
    shopBtnName: "Shop Now",
    themeColor: "#000000",
    category: "men",
    featuredType: "running",
  });

  const API_URL = "http://localhost:5000/products";

  const fetchTrending = async () => {
    try {
      const response = await fetch(API_URL);

      const data = await response.json();

      const trendingItems = Array.isArray(data)
        ? data.filter((item) => item.trending === true)
        : [];

      setItems(trendingItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        productImage: `/images/${file.name}`,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      productImage: "",
      modelName: "",
      description: "",
      variants: "",
      price: "",
      shopBtnName: "Shop Now",
      themeColor: "#000000",
      category: "men",
      featuredType: "running",
    });

    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      trending: true,
      topSeller: false,
    };

    try {
      if (editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            id: editId,
          }),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      resetForm();

      fetchTrending();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);

    setFormData({
      productImage: item.productImage || "",
      modelName: item.modelName || "",
      description: item.description || "",
      variants: item.variants || "",
      price: item.price || "",
      shopBtnName: item.shopBtnName || "Shop Now",
      themeColor: item.themeColor || "#000000",
      category: item.category || "men",
      featuredType: item.featuredType || "running",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchTrending();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-trending-manager">
      <header className="trending-header">
        <h2>STORE FRONT / TRENDING</h2>

        <p>Manage trending products and showcase collections.</p>
      </header>

      <div className="trending-grid">
        <form onSubmit={handleSubmit} className="trending-form">
          <div className="input-group">
            <label>MODEL NAME</label>

            <input
              type="text"
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>DESCRIPTION</label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>PRICE</label>

            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>VARIANTS</label>

            <input
              type="text"
              name="variants"
              value={formData.variants}
              onChange={handleChange}
              placeholder="3 Colors"
            />
          </div>

          <div className="input-group">
            <label>CATEGORY</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="men">Men</option>

              <option value="women">Women</option>

              <option value="kids">Kids</option>

              <option value="sale">Sale</option>
            </select>
          </div>

          <div className="input-group">
            <label>FEATURED TYPE</label>

            <select
              name="featuredType"
              value={formData.featuredType}
              onChange={handleChange}
            >
              <option value="running">Running</option>

              <option value="football">Football</option>

              <option value="basketball">Basketball</option>

              <option value="casual">Casual</option>

              <option value="sports">Sports</option>
            </select>
          </div>

          <div className="input-group">
            <label>BUTTON TEXT</label>

            <input
              type="text"
              name="shopBtnName"
              value={formData.shopBtnName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>PRODUCT IMAGE</label>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            <p className="path-preview">
              Path: {formData.productImage || "None"}
            </p>
          </div>

          <div className="input-group">
            <label>THEME COLOR</label>

            <input
              type="color"
              name="themeColor"
              value={formData.themeColor}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="upload-btn">
              {editId ? "UPDATE ITEM" : "ADD ITEM"}
            </button>

            {editId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="preview-container">
          <label className="preview-label">Live Preview</label>

          <div className="preview-card-wrapper">
            <div className="card-style-trending">
              <div className="img-box">
                {formData.productImage && (
                  <img
                    src={formData.productImage}
                    alt="Preview"
                    className="prod-img-trending"
                  />
                )}
              </div>

              <div className="preview-content-trending">
                <span className="variants-display">
                  {formData.variants || "0 VARIANTS"}
                </span>

                <span className="category-display">
                  {formData.featuredType.toUpperCase()}
                </span>

                <h3>{formData.modelName || "Model Name"}</h3>

                <p>{formData.description || "Description"}</p>

                <div className="preview-footer">
                  <span className="price">{formData.price || "₹0"}</span>

                  <button className="preview-shop-btn">
                    {formData.shopBtnName}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="existing-trends">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>TYPE</th>
                <th>VARIANTS</th>
                <th>PRICE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="table-img-prev">
                        <img src={item.productImage} alt={item.modelName} />
                      </div>
                    </td>

                    <td>{item.modelName}</td>

                    <td>{item.category}</td>

                    <td>{item.featuredType}</td>

                    <td>{item.variants || "N/A"}</td>

                    <td>{item.price}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="remove-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No trending products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTrending;
