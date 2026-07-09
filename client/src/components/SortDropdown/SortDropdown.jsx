import "./SortDropdown.css";

const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Top Rated First", value: "ratingDesc" },
];

function SortDropdown({ sortBy, onChange }) {
  return (
    <div className="filter-section">
      <label className="sort-dropdown-label" htmlFor="sort">
        Sort By
      </label>
      <select
        id="sort"
        className="sort-dropdown"
        value={sortBy}
        onChange={(event) => onChange(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value || "default"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortDropdown;
