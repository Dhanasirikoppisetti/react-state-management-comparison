import { useEffect } from 'react';
import useAppStore from './store/useAppStore';
import Header from './components/Header';
import ProductListPage from './components/ProductListPage';
import CartSidebar from './components/CartSidebar';
import Notification from './components/Notification';

function ThemeApplier({ children }) {
  const theme = useAppStore(state => state.ui.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return children;
}

export default function App() {
  return (
    <ThemeApplier>
      <div className="app-wrapper">
        <div className="bg-orb bg-orb-1" aria-hidden="true" />
        <div className="bg-orb bg-orb-2" aria-hidden="true" />

        <Header />

        <main className="main-content page-content-wrapper">
          <ProductListPage />
        </main>

        <CartSidebar />
        <Notification />

        {import.meta.env.DEV && (
          <div
            className="mode-indicator"
            style={{
              background: 'rgba(248,215,218,0.85)',
              borderColor: 'rgba(200,159,148,0.5)',
              color: '#8B5E3C',
              position: 'fixed',
              bottom: 12,
              left: 12,
              padding: '4px 12px',
              borderRadius: 999,
              fontSize: 11,
              zIndex: 9999,
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 500,
              border: '1px solid',
            }}
          >
            🐰 Zustand Store
          </div>
        )}
      </div>
    </ThemeApplier>
  );
}
