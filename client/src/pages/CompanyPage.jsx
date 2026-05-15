import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiArrowLeft, FiPlus } from 'react-icons/fi';
import { StarDisplay } from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import AddReviewModal from '../components/AddReviewModal';
import { getCompany, getReviews } from '../services/api';

const COLORS = ['#1C2B4A','#1E7E34','#E67E22','#8E44AD','#C0392B','#2C3E50','#0077B6'];
function getColor(name=''){let h=0;for(let i=0;i<name.length;i++)h=name.charCodeAt(i)+((h<<5)-h);return COLORS[Math.abs(h)%COLORS.length];}
function getInitials(name=''){return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);}

export default function CompanyPage() {
  const { id } = useParams();
  const [company, setCompany]           = useState(null);
  const [reviews, setReviews]           = useState([]);
  const [sort, setSort]                 = useState('date');
  const [loading, setLoading]           = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [cRes, rRes] = await Promise.all([
          getCompany(id),
          getReviews(id, { sort }),
        ]);
        setCompany(cRes.data.data);
        setReviews(rRes.data.data);
      } catch {
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, sort]);

  const formatDate = (d) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-GB').replace(/\//g, '-');
  };

  if (loading) return (
    <div className="page-container">
      <div className="loading-wrap"><div className="spinner" /><span>Loading...</span></div>
    </div>
  );

  if (!company) return (
    <div className="page-container">
      <div className="empty-state"><h3>Company not found</h3></div>
    </div>
  );

  return (
    <div className="page-container">
      <Link to="/" className="back-link">
        <FiArrowLeft /> Back to Companies
      </Link>

      {/* Company Header Card */}
      <div className="company-detail-card">
        <div
          className="company-detail-logo"
          style={{ background: getColor(company.name) }}
        >
          {getInitials(company.name)}
        </div>

        <div className="company-detail-info">
          <div className="company-detail-name">{company.name}</div>
          <div className="company-location">
            <FiMapPin size={13} />
            <span>{company.location || 'Location not specified'}</span>
          </div>
          <div className="company-detail-rating-row">
            <span className="rating-number" style={{ fontSize: 18 }}>
              {company.averageRating ? company.averageRating.toFixed(1) : '0.0'}
            </span>
            <StarDisplay rating={company.averageRating || 0} size={17} />
            <span className="review-count" style={{ fontSize: 14 }}>
              {company.reviewCount || 0} Reviews
            </span>
          </div>
        </div>

        <div className="company-detail-meta">
          <div className="company-detail-founded">
            Founded on {formatDate(company.foundedOn)}
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowReviewModal(true)}
          >
            <FiPlus size={15} /> Add Review
          </button>
        </div>
      </div>

      {/* Sort Bar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <p className="result-count" style={{ margin:0 }}>
          Result Found: {reviews.length}
        </p>
        <div className="sort-bar" style={{ marginBottom:0 }}>
          {['date','rating','relevance'].map((s) => (
            <button
              key={s}
              className={`sort-btn ${sort === s ? 'active' : ''}`}
              onClick={() => setSort(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="empty-state">
          <h3>No reviews yet</h3>
          <p>Be the first to review this company!</p>
        </div>
      ) : (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      )}

      {/* Add Review Modal */}
      {showReviewModal && (
        <AddReviewModal
          companyId={id}
          onClose={() => setShowReviewModal(false)}
          onAdded={(newReview) => {
            setReviews((prev) => [newReview, ...prev]);
            setCompany((prev) => {
              if (!prev) return prev;
              const newCount = (prev.reviewCount || 0) + 1;
              const newAvg = Math.round(
                ((prev.averageRating || 0) * (newCount - 1) + newReview.rating) / newCount * 10
              ) / 10;
              return { ...prev, reviewCount: newCount, averageRating: newAvg };
            });
          }}
        />
      )}
    </div>
  );
}
