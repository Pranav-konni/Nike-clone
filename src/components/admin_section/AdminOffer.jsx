import React, { useState, useEffect } from "react";
const SpecialOffer = () => {
  const [offers, setOffers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    offerText: "",
    buttonName: "Shop Now",
  });

  const fetchOffers = () => {
    fetch("http://localhost:5000/offers")
      .then((res) => res.json())
      .then((data) => setOffers(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error loading offers:", err));
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/offers/${editId}`
      : "http://localhost:5000/offers";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEditId(null);
        setFormData({ offerText: "", buttonName: "Shop Now" });
        fetchOffers();
        alert(editId ? "Offer Updated!" : "Offer Created!");
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleEdit = (offer) => {
    setEditId(offer.id);
    setFormData({
      offerText: offer.offerText,
      buttonName: offer.buttonName,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      await fetch(`http://localhost:5000/offers/${id}`, { method: "DELETE" });
      fetchOffers();
    }
  };

  return (
    <div className="admin-offer-manager">
      <header className="offer-header">
        <h2>MARKETING / SPECIAL OFFERS</h2>
        <p>
          Manage the promotional text bars that appear in the offer section.
        </p>
      </header>

      <div className="offer-grid">
        <form onSubmit={handleSubmit} className="offer-form">
          <div className="input-group">
            <label>Offer Headline</label>
            <input
              name="offerText"
              value={formData.offerText}
              onChange={handleChange}
              placeholder="e.g. Offer 20% Off"
              required
            />
          </div>

          <div className="input-group">
            <label>Button Text</label>
            <input
              name="buttonName"
              value={formData.buttonName}
              onChange={handleChange}
              placeholder="e.g. Shop Now"
              required
            />
          </div>

          <button type="submit" className="button upload-btn">
            {editId ? "UPDATE OFFER" : "CREATE OFFER"}
          </button>

          {editId && (
            <button
              type="button"
              className="button cancel-btn"
              onClick={() => {
                setEditId(null);
                setFormData({ offerText: "", buttonName: "Shop Now" });
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        {/* Live Preview Section */}
        <div className="preview-container">
          <label className="preview-label">Live Preview</label>
          <div className="preview-card offer-preview-style">
            <div className="preview-content">
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {formData.offerText || "Your Offer Title Here"}
              </h2>
              <button className="cta-btn" style={{ marginTop: "10px" }}>
                {formData.buttonName}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* existing */}
      <div className="existing-offers">
        <h3>Current Active Offers</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Offer Text</th>
                <th>Button Label</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((off) => (
                <tr key={off.id}>
                  <td>{off.offerText}</td>
                  <td>{off.buttonName}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(off)}
                    >
                      Edit
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleDelete(off.id)}
                    >
                      Delete
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

export default SpecialOffer;
