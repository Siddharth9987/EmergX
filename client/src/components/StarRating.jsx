import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const LABELS = { 1: 'Terrible', 2: 'Bad', 3: 'Average', 4: 'Satisfied', 5: 'Excellent' };

/* Display-only stars */
export function StarDisplay({ rating = 0, size = 15 }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'}
        />
      ))}
    </div>
  );
}

/* Interactive star picker for forms */
export function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div>
      <div className="star-picker">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaStar
            key={i}
            size={30}
            className={`star-picker-icon ${i <= active ? 'star-filled' : 'star-empty'}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(i)}
          />
        ))}
        {active > 0 && (
          <span className="star-picker-label">{LABELS[active]}</span>
        )}
      </div>
    </div>
  );
}
