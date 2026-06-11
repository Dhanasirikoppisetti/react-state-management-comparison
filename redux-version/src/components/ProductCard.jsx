import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../store/cartSlice';
import { setNotification } from '../store/uiSlice';

/**
 * ProductCard uses a precise primitive selector to check if this product
 * is in the cart, re-rendering only when that boolean changes.
 */
export default function ProductCard({ product }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const dispatch = useDispatch();

  const isInCart = useSelector(state =>
    state.cart.items.some(i => i.productId === product.productId)
  );

  function handleAdd() {
    dispatch(addItemToCart(product));
    dispatch(setNotification({ message: `${product.emoji} ${product.name} added to your basket!`, type: 'success' }));
  }

  return (
    <article className="product-card" style={{ position: 'relative' }}>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title={`ProductCard (${product.productId}) renders (Redux Toolkit)`}
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
          <div className="product-price">₹{product.price.toFixed(2)}</div>
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
