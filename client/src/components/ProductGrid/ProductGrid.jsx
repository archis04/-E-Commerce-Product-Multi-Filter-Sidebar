import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products }) {
  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductGrid;
