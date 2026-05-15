import { useState } from 'react';
import { FiThumbsUp, FiShare2 } from 'react-icons/fi';
import { StarDisplay } from './StarRating';
import { likeReview } from '../services/api';

function getAvatarColor(name = '') {
  const colors = ['#7B2FBE', '#E67E22', '#1E7E34', '#C0392B', '#0077B6', '#1C2B4A'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

function formatDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-GB').replace(/\//g, '-');
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
}

export default function ReviewCard({ review }) {
  const [likes, setLikes] = useState(review.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      await likeReview(review.id);
      setLikes((prev) => prev + (liked ? -1 : 1));
      setLiked((prev) => !prev);
    } catch {
      // silent fail
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: review.subject, text: review.reviewText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div
            className="reviewer-avatar"
            style={{ background: getAvatarColor(review.fullName) }}
          >
            {getInitials(review.fullName)}
          </div>
          <div>
            <div className="reviewer-name">{review.fullName}</div>
            <div className="reviewer-date">{formatDateTime(review.createdAt)}</div>
          </div>
        </div>
        <StarDisplay rating={review.rating} size={15} />
      </div>

      {review.subject && (
        <div className="review-subject">{review.subject}</div>
      )}
      {review.reviewText && (
        <p className="review-text">{review.reviewText}</p>
      )}

      <div className="review-footer">
        <button
          className={`review-action-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <FiThumbsUp size={14} />
          <span>{likes > 0 ? `${likes} Like${likes > 1 ? 's' : ''}` : 'Like'}</span>
        </button>
        <button className="review-action-btn" onClick={handleShare}>
          <FiShare2 size={14} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
