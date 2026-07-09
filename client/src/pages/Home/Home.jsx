import { useEffect, useState } from "react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { fetchProducts } from "../../services/api";
import "./Home.css";

const PRICE_LIMITS = { min: 799, max: 32999 };

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: PRICE_LIMITS.min,
    max: PRICE_LIMITS.max,
  });
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts({
          categories: selectedCategories,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          rating: selectedRating,
          sort: sortBy,
        });
        setProducts(data.products);
      } catch {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategories, priceRange.min, priceRange.max, selectedRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: PRICE_LIMITS.min, max: PRICE_LIMITS.max });
    setSelectedRating(null);
    setSortBy("");
  };

  return (
    <div className="home">
      <FilterSidebar
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        priceLimits={PRICE_LIMITS}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="home-content">
        {loading && (
          <div className="status-message">
            <span className="spinner" aria-hidden="true" />
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="status-message error" role="alert">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="status-message empty-state" role="status">
            <p>No items match your criteria.</p>
            <button className="reset-filters-button" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}

export default Home;
