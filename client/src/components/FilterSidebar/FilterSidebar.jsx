import CategoryFilter from "../CategoryFilter/CategoryFilter";
import PriceSlider from "../PriceSlider/PriceSlider";
import RatingFilter from "../RatingFilter/RatingFilter";
import SortDropdown from "../SortDropdown/SortDropdown";
import "./FilterSidebar.css";

function FilterSidebar({
  selectedCategories,
  onCategoriesChange,
  priceRange,
  onPriceRangeChange,
  priceLimits,
  selectedRating,
  onRatingChange,
  sortBy,
  onSortChange,
}) {
  return (
    <aside className="filter-sidebar">
      <h2 className="filter-sidebar-title">Filters</h2>

      <CategoryFilter
        selectedCategories={selectedCategories}
        onChange={onCategoriesChange}
      />

      <PriceSlider
        minLimit={priceLimits.min}
        maxLimit={priceLimits.max}
        min={priceRange.min}
        max={priceRange.max}
        onChange={onPriceRangeChange}
      />

      <RatingFilter
        selectedRating={selectedRating}
        onChange={onRatingChange}
      />

      <SortDropdown sortBy={sortBy} onChange={onSortChange} />
    </aside>
  );
}

export default FilterSidebar;
