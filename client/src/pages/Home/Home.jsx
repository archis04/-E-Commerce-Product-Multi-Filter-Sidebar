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
        const data = await fetchProducts();
        setProducts(data.products);
      } catch {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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

        {!loading && !error && <ProductGrid products={products} />}
      </div>
    </div>
  );
}

export default Home;
