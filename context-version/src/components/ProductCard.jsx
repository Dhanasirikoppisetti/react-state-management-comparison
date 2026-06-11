import { useRef, useState } from 'react';
import { useCart } from '../store/storeHooks';
import { useUI } from '../store/storeHooks';
import { CONTEXT_MODE } from '../store/config';

export default function ProductCard({ product }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const { items, addToCart } = useCart();
  const { setNotification } = useUI();

  const isInCart = items.some(i => i.productId === product.productId);

  function handleAdd() {
    addToCart(product);
    setNotification(`${product.emoji} ${product.name} added to your basket!`, 'success');
  }

  return (
    <article className="product-card" style={{ position: 'relative' }}>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title={`ProductCard (${product.productId}) renders (${CONTEXT_MODE} mode)`}
        >
          #{renderCount.current}
        </small>
      )}

      <div className="product-card-image">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-card-img" />
        ) : (
          <span className="product-emoji">{product.emoji}</span>
        )}
        <span className="product-category-badge">🍞 {product.category}</span>
      </div>

      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="product-price">
            ₹{product.price.toFixed(2)}
          </div>
          <button
            className={`btn-add-to-cart ${isInCart ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to basket`}
          >
            {isInCart ? 'Added to Cart ✓' : '🧺 Add to Basket'}
          </button>
        </div>
      </div>
    </article>
  );
}
