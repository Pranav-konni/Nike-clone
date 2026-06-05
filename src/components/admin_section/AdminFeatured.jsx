import React, { useState, useEffect } from "react";

const AdminFeatured = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    bgImage: "",
    prdtName: "",
    shopBtnName: "Shop Now",
    themeColor: "#ffffff",
    featuredType: "running",
  });

  const API_URL = "http://localhost:5000/featured";

  const fetchFeatured = async () => {
    try {
      const response = await fetch(API_URL);

      const data = await response.json();

      setFeaturedItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchFeatured();
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
        bgImage: `/images/${file.name}`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            id: editId,
          }),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      setEditId(null);

      setFormData({
        bgImage: "",
        prdtName: "",
        shopBtnName: "Shop Now",
        themeColor: "#ffffff",
        featuredType: "running",
      });

      fetchFeatured();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);

    setFormData({
      bgImage: item.bgImage || "",
      prdtName: item.prdtName || "",
      shopBtnName: item.shopBtnName || "Shop Now",
      themeColor: item.themeColor || "#ffffff",
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

      fetchFeatured();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);

    setFormData({
      bgImage: "",
      prdtName: "",
      shopBtnName: "Shop Now",
      themeColor: "#ffffff",
      featuredType: "running",
    });
  };

  return (
    <div className="admin-trending-manager">
      <header className="trending-header">
        <h2>STORE FRONT / FEATURED</h2>

        <p>
          Manage featured running, football, basketball and sports category
          banners.
        </p>
      </header>

      <div className="trending-grid">
        <form onSubmit={handleSubmit} className="featured-form">
          <div className="input-group">
            <label>Featured Category Name</label>

            <input
              type="text"
              name="prdtName"
              value={formData.prdtName}
              onChange={handleChange}
              placeholder="Running"
              required
            />
          </div>

          <div className="input-group">
            <label>Featured Type</label>

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

              <option value="training">Training</option>
            </select>
          </div>

          <div className="input-group">
            <label>Button Name</label>

            <input
              type="text"
              name="shopBtnName"
              value={formData.shopBtnName}
              onChange={handleChange}
              placeholder="Shop Now"
              required
            />
          </div>

          <div className="input-group">
            <label>Background Image</label>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            <p className="path-preview">Path: {formData.bgImage || "None"}</p>
          </div>

          <div className="input-group">
            <label>Theme Color</label>

            <input
              type="color"
              name="themeColor"
              value={formData.themeColor}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="upload-btn">
              {editId ? "UPDATE FEATURED" : "ADD FEATURED"}
            </button>

            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="preview-container">
          <label className="preview-label">Live Preview</label>

          <div className="preview-card-wrapper">
            <div className="card-style-trending featured-preview-card">
              <div className="img-box featured-img-box">
                {formData.bgImage && (
                  <img src={formData.bgImage} alt="Preview" />
                )}

                <div
                  className="featured-overlay-text"
                  style={{
                    color: formData.themeColor,
                  }}
                >
                  <span className="featured-type">{formData.featuredType}</span>

                  <h3>{formData.prdtName || "CATEGORY NAME"}</h3>

                  <button
                    style={{
                      borderColor: formData.themeColor,
                      color: formData.themeColor,
                    }}
                  >
                    {formData.shopBtnName || "SHOP NOW"}
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
                <th>Banner</th>

                <th>Category</th>

                <th>Type</th>

                <th>Button</th>

                <th>Theme</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {featuredItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="table-img-prev">
                      <img src={item.bgImage} alt={item.prdtName} />
                    </div>
                  </td>

                  <td>
                    <strong>{item.prdtName}</strong>
                  </td>

                  <td>{item.featuredType}</td>

                  <td>{item.shopBtnName}</td>

                  <td>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: item.themeColor,
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                      }}
                    ></div>
                  </td>

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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFeatured;
