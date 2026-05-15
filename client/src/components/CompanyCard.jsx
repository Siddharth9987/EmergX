import { useNavigate } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import { StarDisplay } from './StarRating';

const COLORS = ['#1C2B4A', '#1E7E34', '#E67E22', '#8E44AD', '#C0392B', '#2C3E50', '#0077B6'];

function getColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return COLORS[Math.abs(h) % COLORS.length];
}

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function CompanyCard({ company }) {
  const navigate = useNavigate();

  const formatDate = (d) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-GB').replace(/\//g, '-');
  };

  return (
    <div className="company-card">
      <div
        className="company-logo"
        style={{ background: getColor(company.name) }}
      >
        {getInitials(company.name)}
      </div>

      <div className="company-info">
        <div className="company-name">{company.name}</div>
        <div className="company-location">
          <FiMapPin size={13} />
          <span>{company.location || 'Location not specified'}</span>
        </div>
        <div className="company-rating-row">
          <span className="rating-number">
            {company.averageRating ? company.averageRating.toFixed(1) : '0.0'}
          </span>
          <StarDisplay rating={company.averageRating || 0} />
          <span className="review-count">{company.reviewCount || 0} Reviews</span>
        </div>
      </div>

      <div className="company-meta">
        <div className="company-date">
          Founded on {formatDate(company.foundedOn)}
        </div>
        <button
          className="btn-dark"
          onClick={() => navigate(`/company/${company.id}`)}
        >
          Detail Review
        </button>
      </div>
    </div>
  );
}
