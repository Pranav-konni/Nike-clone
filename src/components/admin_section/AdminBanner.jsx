import React, { useState, useEffect } from "react";

const AdminBanner = () => {
  const [banners, setBanners] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    collabName: "",
    subtitle: "",
    bgImage: "",
    productImage: "",
    ctaText: "Shop Now",
    themeColor: "#000000",
    textColor: "#ffffff",
  });

  const fetchBanners = () => {
    fetch("http://localhost:5000/banner")
      .then((res) => res.json())
      .then((data) => setBanners(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const fileName = `/images/${file.name}`;
      setFormData((prev) => ({ ...prev, [name]: fileName }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/banner/${editId}`
      : "http://localhost:5000/banner";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setEditId(null);
    setFormData({
      collabName: "",
      subtitle: "",
      bgImage: "",
      productImage: "",
      ctaText: "Shop Now",
      themeColor: "#000000",
      textColor: "#ffffff",
    });
    fetchBanners();
    alert(editId ? "Banner Updated!" : "Banner Added!");
  };

  const handleEdit = (banner) => {
    setEditId(banner.id);
    setFormData(banner);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this banner?")) {
      await fetch(`http://localhost:5000/banner/${id}`, { method: "DELETE" });
      fetchBanners();
    }
  };

  return (
    <div className="admin-banner-manager">
      <header className="banner-header">
        <h2>STORE FRONT / BANNER SETTINGS</h2>
        <p>Manage the hero images that appear on the homepage slider.</p>
      </header>

      <div className="banner-grid">
        <form onSubmit={handleSubmit} className="banner-form">
          <div className="input-group">
            <label>Collab Name</label>
            <input
              name="collabName"
              value={formData.collabName}
              onChange={handleChange}
              placeholder="collab Name"
              required
            />
          </div>

          <div className="input-group">
            <label>Subtitle / Price</label>
            <input
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="starting price"
            />
          </div>

          <div className="input-group">
            <label>Background Image</label>
            <input
              type="file"
              name="bgImage"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="path-preview">Path:{formData.bgImage || "None"}</p>
          </div>

          <div className="input-group">
            <label>Product (Shoe) Image</label>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="path-preview">
              Path:{formData.productImage || "None"}
            </p>
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

          <div className="input-group">
            <label>Text Color</label>
            <input
              type="color"
              name="textColor"
              value={formData.textColor}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="button upload-btn">
            {editId ? "UPDATE BANNER" : "UPLOAD BANNER"}
          </button>
          {editId && (
            <button
              type="button"
              className="button cancel-btn"
              onClick={() => {
                setEditId(null);
                setFormData({
                  collabName: "",
                  subtitle: "",
                  bgImage: "",
                  productImage: "",
                  ctaText: "Shop Now",
                  themeColor: "#000000",
                  textColor: "#ffffff",
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="preview-container">
          <label className="preview-label">Live Preview</label>
          <div
            className="card preview-card"
            style={{ backgroundColor: formData.themeColor }}
          >
            {formData.bgImage && (
              <img src={formData.bgImage} alt="BG" className="bg-img" />
            )}
            {formData.productImage && (
              <img
                src={formData.productImage}
                alt="Product"
                className="prod-img"
              />
            )}
            <div className="preview-content" style={{ color: formData.textColor }}>
              <h3 style={{ color: formData.textColor }}>{formData.collabName || "Collab Name"}</h3>
              <p style={{ color: formData.textColor }}>{formData.subtitle || "PRICE INFO HERE"}</p>
              <button className="cta-btn">{formData.ctaText}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="existing-banners">
        <h3>Existing Banners</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Collab</th>
                <th>Subtitle</th>
                <th>Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((b) => (
                <tr key={b.id}>
                  <td>{b.collabName}</td>
                  <td>{b.subtitle}</td>
                  <td>
                    <div
                      className="table-img-prev"
                      style={{ backgroundColor: b.themeColor }}
                    >
                      {b.productImage && <img src={b.productImage} alt="p" />}
                    </div>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(b)}>
                      Edit
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleDelete(b.id)}
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

export default AdminBanner;
