import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cartSlice';
import { setNotification } from '../store/uiSlice';

/**
 * ProductCard does NOT call useSelector — it only dispatches actions.
 * This means it will NOT re-render when cart or user state changes.
 * useDispatch returns a stable reference — no re-renders from that either.
 */
export default function ProductCard({ product }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const [justAdded, setJustAdded] = useState(false);
  const dispatch = useDispatch();

  function handleAdd() {
    dispatch(addItemToCart(product));
    dispatch(setNotification({ message: `${product.emoji} ${product.name} added to your basket!`, type: 'success' }));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
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
            className={`btn-add-to-cart ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to basket`}
          >
            {justAdded ? '✓ In Basket!' : '🧺 Add to Basket'}
          </button>
        </div>
      </div>
    </article>
  );
}
