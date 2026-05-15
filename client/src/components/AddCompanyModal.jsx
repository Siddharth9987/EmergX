import { useState } from 'react';
import { FiX, FiMapPin, FiCalendar } from 'react-icons/fi';
import { addCompany } from '../services/api';

export default function AddCompanyModal({ onClose, onAdded }) {
  const [form, setForm] = useState({ name: '', location: '', foundedOn: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Company name is required'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await addCompany(form);
      onAdded(res.data.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add company');
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
          <h2 className="modal-title">Add Company</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Company name</label>
              <input
                className="form-input"
                name="name"
                placeholder="Enter..."
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <div className="form-input-icon">
                <input
                  className="form-input"
                  name="location"
                  placeholder="Select location"
                  value={form.location}
                  onChange={handleChange}
                />
                <FiMapPin className="input-icon" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Founded on</label>
              <div className="form-input-icon">
                <input
                  className="form-input"
                  name="foundedOn"
                  type="date"
                  value={form.foundedOn}
                  onChange={handleChange}
                />
                <FiCalendar className="input-icon" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                className="form-input"
                name="city"
                placeholder="Enter city"
                value={form.city}
                onChange={handleChange}
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
