import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProductListing } from './components/ProductListing';
import { ProductDetails } from './components/ProductDetails';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';
import { OrderTracking } from './components/OrderTracking';
import { WishlistPage } from './components/WishlistPage';
import { UserAccount } from './components/UserAccount';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Product } from './types';
import { ShoppingBag } from 'lucide-react';

function StyleCartApp() {
  const { products, cartCount } = useStore();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trackedOrderId, setTrackedOrderId] = useState<string | undefined>(undefined);

  // Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToShop = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductById = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      handleSelectProduct(prod);
    }
  };

  const handleOrderSuccess = (orderId: string) => {
    setTrackedOrderId(orderId);
    setCurrentView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackSpecificOrder = (orderId: string) => {
    setTrackedOrderId(orderId);
    setCurrentView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top sticky Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onNavigateToShop={handleNavigateToShop}
          />
        )}

        {currentView === 'shop' && (
          <ProductListing
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'product-details' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setCurrentView('shop')}
            onNavigateToCart={() => {
              setCurrentView('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'cart' && (
          <ShoppingCart
            onProceedToCheckout={() => {
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContinueShopping={() => setCurrentView('shop')}
            onSelectProductById={handleSelectProductById}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            onBackToCart={() => setCurrentView('cart')}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentView === 'tracking' && (
          <OrderTracking
            orderId={trackedOrderId}
            onContinueShopping={() => setCurrentView('shop')}
            onSelectProductById={handleSelectProductById}
          />
        )}

        {currentView === 'wishlist' && (
          <WishlistPage
            onSelectProduct={handleSelectProduct}
            onExploreProducts={() => setCurrentView('shop')}
          />
        )}

        {currentView === 'account' && (
          <UserAccount
            onSelectProduct={handleSelectProduct}
            onTrackOrder={handleTrackSpecificOrder}
            onNavigateToWishlist={() => setCurrentView('wishlist')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Sticky Quick Cart Button on Mobile/Tablet */}
      {currentView !== 'cart' && currentView !== 'checkout' && cartCount > 0 && (
        <button
          onClick={() => {
            setCurrentView('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-slate-900 text-white shadow-2xl hover:bg-rose-600 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
          aria-label="View Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              {cartCount}
            </span>
          </div>
          <span className="text-xs font-bold hidden sm:inline pr-1">Shopping Bag</span>
        </button>
      )}

      {/* Global Footer */}
      <Footer
        onNavigateToShop={handleNavigateToShop}
        onNavigateToView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StyleCartApp />
    </StoreProvider>
  );
}
