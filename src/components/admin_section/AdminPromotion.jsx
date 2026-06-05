import React, { useState, useEffect } from "react";

const AdminPromotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [selectedSection, setSelectedSection] = useState("promotion1");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    collabImage: "",
    collabName: "",
    Quote: "",
    buttonName: "Shop Now",
    themeColor: "#000000",
  });

  const resetForm = () => {
    setEditId(null);
    setFormData({
      collabImage: "",
      collabName: "",
      Quote: "",
      buttonName: "Shop Now",
      themeColor: "#000000",
    });
  };

  const fetchPromotions = () => {
    fetch(`http://localhost:5000/${selectedSection}`)
      .then((res) => res.json())
      .then((data) => {
        setPromotions(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchPromotions();
    resetForm();
  }, [selectedSection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, collabImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingItem = promotions[0];
    const method = editId || existingItem ? "PUT" : "POST";
    const idToUse =
      editId || (existingItem ? existingItem.id : `p${Date.now()}`);

    const url =
      method === "PUT"
        ? `http://localhost:5000/${selectedSection}/${idToUse}`
        : `http://localhost:5000/${selectedSection}`;

    const submissionData = {
      ...formData,
      id: idToUse,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        alert("Promotion Saved Successfully!");
        resetForm();
        fetchPromotions();
      }
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  const handleEdit = (promotion) => {
    setEditId(promotion.id);
    setFormData(promotion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this promotion?")) {
      await fetch(`http://localhost:5000/${selectedSection}/${id}`, {
        method: "DELETE",
      });
      fetchPromotions();
    }
  };

  return (
    <div className="admin-promotion-manager">
      <header className="promotion-header">
        <h2>STORE FRONT / PROMOTION SETTINGS</h2>
        <div className="section-selector">
          <label>Manage Section: </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="promotion1">Promotion Slot 1 (Top)</option>
            <option value="promotion2">Promotion Slot 2 (Middle)</option>
            <option value="promotion3">Promotion Slot 3 (Bottom)</option>
          </select>
        </div>
      </header>

      <div className="promotion-grid">
        <form onSubmit={handleSubmit} className="promotion-form">
          <div className="input-group">
            <label>Collab Name</label>
            <input
              name="collabName"
              value={formData.collabName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Quote / Subtitle</label>
            <input
              name="Quote"
              value={formData.Quote}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Button Text</label>
            <input
              name="buttonName"
              value={formData.buttonName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Promotion Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="input-group-theme">
            <label>Theme Color</label>
            <input
              type="color"
              name="themeColor"
              value={formData.themeColor}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="button upload-btn">
            {editId ? "UPDATE PROMOTION" : "SAVE PROMOTION"}
          </button>

          {editId && (
            <button type="button" className="button cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <div className="preview-container">
          <label className="preview-label">
            Live Preview ({selectedSection})
          </label>
          <div
            className="preview-card"
            style={{ backgroundColor: formData.themeColor }}
          >
            {formData.collabImage && (
              <img
                src={formData.collabImage}
                alt="Preview"
                className="bg-img"
              />
            )}
            <div className="preview-content">
              <h3>{formData.collabName || "COLLAB TITLE"}</h3>
              <p>{formData.Quote || "Promotion Quote goes here"}</p>
              <button className="cta-btn">{formData.buttonName}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="existing-promotions">
        <h3>Active items in {selectedSection}</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Collab</th>
                <th>Quote</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.collabImage}
                      alt="Thumb"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{p.collabName}</td>
                  <td>{p.Quote}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleDelete(p.id)}
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

export default AdminPromotion;
