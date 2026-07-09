import { useEffect, useState } from "react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { fetchProducts } from "../../services/api";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <FilterSidebar />

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
