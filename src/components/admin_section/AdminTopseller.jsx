import React, { useState, useEffect } from "react";

const AdminTopseller = () => {
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

  const fetchTopsellers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const filtered = Array.isArray(data)
        ? data.filter((item) => item.topSeller === true)
        : [];

      setItems(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopsellers();
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
      ...(editId ? { id: editId } : {}),
      productImage: formData.productImage,
      modelName: formData.modelName,
      description: formData.description,
      variants: formData.variants,
      price: formData.price,
      shopBtnName: formData.shopBtnName,
      themeColor: formData.themeColor,
      category: formData.category,
      featuredType: formData.featuredType,
      trending: false,
      topSeller: true,
    };

    try {
      const method = editId ? "PUT" : "POST";

      const url = editId ? `${API_URL}/${editId}` : API_URL;

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      resetForm();

      fetchTopsellers();
    } catch (err) {
      console.error(err);
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
    const confirmDelete = window.confirm("Delete this top seller item?");

    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchTopsellers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-trending-manager">
      <header className="trending-header">
        <h2>STORE FRONT / TOP SELLER</h2>

        <p>Manage top seller products and collections.</p>
      </header>

      <div className="trending-grid">
        <form onSubmit={handleSubmit} className="topSeller-form">
          <div className="input-group">
            <label>PRODUCT NAME</label>

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

              <option value="sports">Sports</option>

              <option value="casual">Casual</option>
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
                  {formData.variants || "0 Variants"}
                </span>

                <span className="category-tag">{formData.featuredType}</span>

                <h3>{formData.modelName || "Product Name"}</h3>

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

      <div className="existing-banners">
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
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No top seller products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTopseller;
