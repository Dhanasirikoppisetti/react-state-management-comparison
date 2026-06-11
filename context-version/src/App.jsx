import { useEffect } from 'react';
import { CONTEXT_MODE } from './store/config';
import { AppProvider } from './store/naive/AppContext';
import { CartProvider } from './store/optimized/CartContext';
import { UserProvider } from './store/optimized/UserContext';
import { UIProvider } from './store/optimized/UIContext';
import { useUI } from './store/storeHooks';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListPage from './components/ProductListPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import Notification from './components/Notification';

// ── Theme applier: applies data-theme attribute to document ──────────────────
function ThemeApplier({ children }) {
  const { theme } = useUI();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return children;
}

// ── Main app shell ────────────────────────────────────────────────────────────
function AppShell() {
  return (
    <ThemeApplier>
      <div className="app-wrapper">
        <div className="bg-orb bg-orb-1" aria-hidden="true" />
        <div className="bg-orb bg-orb-2" aria-hidden="true" />

        <Header />

        <main className="main-content page-content-wrapper">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>

        <Notification />

        {import.meta.env.DEV && (
          <div
            className="mode-indicator"
            style={{
              background: 'rgba(248,215,218,0.85)',
              borderColor: 'rgba(200,159,148,0.5)',
              color: '#8B5E3C',
            }}
          >
            🍞 Context: <strong>{CONTEXT_MODE.toUpperCase()}</strong>
          </div>
        )}
      </div>
    </ThemeApplier>
  );
}

// ── Provider wrapper depending on CONTEXT_MODE ────────────────────────────────
function AppProviderWrapper({ children }) {
  if (CONTEXT_MODE === 'naive') {
    return <AppProvider>{children}</AppProvider>;
  }
  return (
    <UserProvider>
      <UIProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </UIProvider>
    </UserProvider>
  );
}

export default function App() {
  return (
    <AppProviderWrapper>
      <AppShell />
    </AppProviderWrapper>
  );
}
