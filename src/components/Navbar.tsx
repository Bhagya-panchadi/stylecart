import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  Percent, 
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryType } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const { cartCount, wishlist, isAdmin, toggleAdminMode } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const mainCategories: { name: string; value: CategoryType | 'All' }[] = [
    { name: 'All Collection', value: 'All' },
    { name: 'Men', value: 'Men' },
    { name: 'Women', value: 'Women' },
    { name: 'Kids', value: 'Kids' },
    { name: 'Dresses', value: 'Dresses' },
    { name: 'Shirts', value: 'Shirts' },
    { name: 'T-Shirts', value: 'T-Shirts' },
    { name: 'Jeans', value: 'Jeans' },
    { name: 'Shoes', value: 'Shoes' },
    { name: 'Accessories', value: 'Accessories' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
    }
  };

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    setCurrentView('shop');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Top Banner Announcement */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Mid-Season Sale: Up to 40% OFF with code <strong className="text-amber-300 font-bold">STYLE20</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-slate-300">
            <span>Free Shipping on Orders $100+</span>
            <button 
              onClick={toggleAdminMode}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs transition-colors ${
                isAdmin ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {isAdmin ? 'Admin Mode (Active)' : 'Admin Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="cursor-pointer flex items-center gap-2 select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
              S
            </div>
            <div>
              <span className="text-2xl font-serif-luxury font-black tracking-tight text-slate-900">
                Style<span className="text-rose-600">Cart</span>
              </span>
              <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Luxury & Pret
              </p>
            </div>
          </div>

          {/* Search Bar - Center */}
          <form 
            onSubmit={handleSearchSubmit}
            className={`hidden md:flex flex-1 max-w-lg relative transition-all duration-300 ${
              isSearchFocused ? 'ring-2 ring-rose-500/20 shadow-sm' : ''
            }`}
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search premium jackets, dresses, shoes, denim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-full pl-11 pr-10 py-2.5 text-sm border border-transparent focus:border-rose-400 focus:outline-hidden transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Admin Dashboard shortcut if admin */}
            {isAdmin && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  currentView === 'admin'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* Account Dashboard */}
            <button
              onClick={() => setCurrentView('account')}
              className={`p-2.5 rounded-full text-slate-700 hover:text-rose-600 hover:bg-slate-100 transition-colors flex items-center gap-1 ${
                currentView === 'account' ? 'text-rose-600 bg-rose-50' : ''
              }`}
              title="My Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline text-xs font-semibold">Account</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentView('wishlist')}
              className={`relative p-2.5 rounded-full text-slate-700 hover:text-rose-600 hover:bg-slate-100 transition-colors ${
                currentView === 'wishlist' ? 'text-rose-600 bg-rose-50' : ''
              }`}
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCurrentView('cart')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-full font-medium text-sm transition-all ${
                currentView === 'cart'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-white text-slate-900 text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Secondary Category Navigation for Desktop */}
        <div className="hidden md:flex items-center justify-between border-t border-slate-100 py-2.5 overflow-x-auto text-xs font-medium text-slate-600 scrollbar-none">
          <div className="flex items-center gap-6">
            {mainCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className="hover:text-rose-600 whitespace-nowrap transition-colors relative py-1 group"
              >
                <span>{cat.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold pl-4">
            <button 
              onClick={() => {
                onSelectCategory('SpecialOffers');
                setCurrentView('shop');
              }}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-1 rounded"
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Special Offers</span>
            </button>
            <button 
              onClick={() => setCurrentView('tracking')}
              className="text-slate-500 hover:text-slate-800"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-900 rounded-lg pl-10 pr-4 py-2 text-sm border-none focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Quick link items */}
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {mainCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className="text-left px-3 py-2 rounded-md hover:bg-slate-100 text-slate-700"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2">
            <button
              onClick={() => {
                setCurrentView('tracking');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Track Orders
            </button>
            <button
              onClick={() => {
                toggleAdminMode();
                if (!isAdmin) setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-md flex items-center justify-between"
            >
              <span>{isAdmin ? 'Disable Admin Mode' : 'Switch to Admin Panel'}</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
