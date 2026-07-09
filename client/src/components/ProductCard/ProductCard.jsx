import "./ProductCard.css";

function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card-image"
        loading="lazy"
      />
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{formattedPrice}</p>
        <p className="product-card-rating">{product.rating} ★</p>
      </div>
    </article>
  );
}

export default ProductCard;
