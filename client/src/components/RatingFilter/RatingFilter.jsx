import "./RatingFilter.css";

const RATING_OPTIONS = [
  { label: "1 Star & Up", value: 1 },
  { label: "2 Stars & Up", value: 2 },
  { label: "3 Stars & Up", value: 3 },
  { label: "4 Stars & Up", value: 4 },
  { label: "5 Stars", value: 5 },
];

function RatingFilter({ selectedRating, onChange }) {
  return (
    <fieldset className="filter-section">
      <legend className="filter-section-title">Minimum Rating</legend>
      <ul className="filter-option-list">
        {RATING_OPTIONS.map((option) => (
          <li key={option.value}>
            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === option.value}
                onChange={() => onChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default RatingFilter;
