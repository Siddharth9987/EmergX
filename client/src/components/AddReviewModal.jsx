import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { StarPicker } from './StarRating';
import { addReview } from '../services/api';

export default function AddReviewModal({ companyId, onClose, onAdded }) {
  const [form, setForm] = useState({ fullName: '', subject: '', reviewText: '', rating: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) { setError('Full name is required'); return; }
    if (!form.rating) { setError('Please select a rating'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await addReview({ ...form, companyId });
      onAdded(res.data.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-decoration" />
        <div className="modal-decoration-2" />
        <button className="modal-close" onClick={onClose}><FiX /></button>
        <div className="modal-body">
          <h2 className="modal-title">Add Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                name="fullName"
                placeholder="Enter"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                className="form-input"
                name="subject"
                placeholder="Enter"
                value={form.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Enter your Review</label>
              <textarea
                className="form-textarea"
                name="reviewText"
                placeholder="Description"
                value={form.reviewText}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ marginBottom: 10, fontSize: 15, fontWeight: 600 }}>
                Rating
              </label>
              <StarPicker
                value={form.rating}
                onChange={(val) => setForm((prev) => ({ ...prev, rating: val }))}
              />
            </div>
            {error && (
              <p style={{ color: '#F44336', fontSize: 13, marginBottom: 10 }}>{error}</p>
            )}
            <button className="modal-save-btn" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
