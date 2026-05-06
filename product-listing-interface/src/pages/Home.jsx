import { useEffect, useState } from "react";
import { fetchProducts } from "../api";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await fetchProducts();

      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [search, products]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <h1 className="error-message">{error}</h1>
    );
  }

  return (
    <main className="home">
      <div className="hero-section">
        <h1>Explore Premium Products</h1>

        <p>
          Discover modern collections with clean
          design and premium quality.
        </p>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;