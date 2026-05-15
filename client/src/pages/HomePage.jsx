import { useState, useEffect, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import CompanyCard from '../components/CompanyCard';
import AddCompanyModal from '../components/AddCompanyModal';
import { getCompanies } from '../services/api';

export default function HomePage() {
  const [companies, setCompanies]       = useState([]);
  const [search, setSearch]             = useState('');
  const [city, setCity]                 = useState('all');
  const [sort, setSort]                 = useState('name');
  const [cities, setCities]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (city !== 'all') params.city = city;
      params.sort = sort;
      const res = await getCompanies(params);
      setCompanies(res.data.data);

      // Build unique city list
      const allCities = res.data.data.map((c) => c.city).filter(Boolean);
      setCities([...new Set(allCities)]);
    } catch {
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [search, city, sort]);

  useEffect(() => { fetchCompanies(); }, [fetchCompanies]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => fetchCompanies(), 350);
    return () => clearTimeout(t);
  }, [search]); // eslint-disable-line

  return (
    <div className="page-container">
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-left">
          <label className="filter-label">Select City</label>
          <select
            className="filter-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="all">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="filter-right">
          <label className="filter-label">Sort:</label>
          <select
            className="filter-select"
            style={{ minWidth: 140 }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="date">Date</option>
          </select>
          <button
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus size={16} /> Add Company
          </button>
        </div>
      </div>

      {/* Result Count */}
      {!loading && (
        <p className="result-count">Result Found: {companies.length}</p>
      )}

      {/* Content */}
      {loading ? (
        <div className="loading-wrap">
          <div className="spinner" />
          <span>Loading companies...</span>
        </div>
      ) : companies.length === 0 ? (
        <div className="empty-state">
          <h3>No companies found</h3>
          <p>Try a different search or add a new company.</p>
        </div>
      ) : (
        companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))
      )}

      {/* Add Company Modal */}
      {showAddModal && (
        <AddCompanyModal
          onClose={() => setShowAddModal(false)}
          onAdded={(newCompany) => {
            setCompanies((prev) => [newCompany, ...prev]);
            if (newCompany.city && !cities.includes(newCompany.city))
              setCities((prev) => [...prev, newCompany.city]);
          }}
        />
      )}
    </div>
  );
}
