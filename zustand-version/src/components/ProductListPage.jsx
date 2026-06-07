import { useRef } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductListPage() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <section style={{ position: 'relative' }}>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title="ProductListPage renders (Zustand)"
          style={{ top: 0, right: 0 }}
        >
          Page #{renderCount.current}
        </small>
      )}

      <div className="page-header">
        <div className="bakery-divider" aria-hidden="true">🌸 🍰 🐰 🍰 🌸</div>
        <h1 className="page-title">
          Our Fresh <span>Baked</span> Treats
        </h1>
        <p className="page-subtitle">
          Made with love every morning 🌷 Handcrafted, fresh, and always delightful.
        </p>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </section>
  );
}
