import "./CategoryFilter.css";

const CATEGORIES = ["Electronics", "Apparel", "Footwear"];

function CategoryFilter({ selectedCategories, onChange }) {
  const handleToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((item) => item !== category));
      return;
    }

    onChange([...selectedCategories, category]);
  };

  return (
    <fieldset className="filter-section">
      <legend className="filter-section-title">Category</legend>
      <ul className="filter-option-list">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleToggle(category)}
              />
              <span>{category}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default CategoryFilter;
