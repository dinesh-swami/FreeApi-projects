import "../styles/productCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img
          src={product.images[0]}
          alt={product.title}
        />
      </div>

      <div className="product-content">
        <span className="category">
          {product.category}
        </span>

        <h3>{product.title}</h3>

        <p className="description">
          {product.description.slice(0, 80)}...
        </p>

        <div className="bottom-row">
          <h2>${product.price}</h2>

          <span className="rating">
            ⭐ {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;