import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Tag, 
  TrendingUp, 
  Flame,
  Star
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/mockData';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: (category?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onNavigateToShop,
}) => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival || p.createdAt > '2026-09-01').slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const specialOffers = products.filter(p => p.discountPercentage >= 25).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-28 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Autumn / Winter Luxury Pret '26</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold tracking-tight leading-[1.15]">
              Effortless Elegance <br />
              <span className="italic font-normal text-rose-200">Crafted</span> for Everyday Icons.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Discover meticulously tailored silhouettes, breathable organic fabrics, and modern essentials engineered to outlive temporary trends.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onNavigateToShop()}
                className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/40 hover:shadow-rose-600/40 hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <span>Shop New Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateToShop('Women')}
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all backdrop-blur-sm"
              >
                Explore Women
              </button>
              <button
                onClick={() => onNavigateToShop('Men')}
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all backdrop-blur-sm"
              >
                Explore Men
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-slate-300 text-xs">
              <div>
                <span className="block text-xl font-serif-luxury font-bold text-white">45k+</span>
                <span className="text-slate-400">Happy Wardrobes</span>
              </div>
              <div>
                <span className="block text-xl font-serif-luxury font-bold text-white">100%</span>
                <span className="text-slate-400">Ethical Sourcing</span>
              </div>
              <div>
                <span className="block text-xl font-serif-luxury font-bold text-white">4.9 / 5</span>
                <span className="text-slate-400">Average Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Collage Images */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80"
                  alt="StyleCart Autumn Fashion"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-rose-300 uppercase tracking-widest font-semibold">Featured Edit</p>
                      <h4 className="text-base font-serif-luxury font-semibold text-white">The Sartorial Collection</h4>
                    </div>
                    <span className="text-amber-400 text-xs font-bold flex items-center gap-1 bg-amber-400/20 px-2 py-1 rounded">
                      <Star className="w-3 h-3 fill-amber-400" /> 4.9
                    </span>
                  </div>
                </div>
              </div>

              {/* Overlapping small preview card */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block p-3 rounded-2xl bg-white text-slate-900 shadow-xl max-w-xs border border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=200&q=80"
                    alt="Silk Slip"
                    className="w-14 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider">Top Seller</span>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">Silk Slip Evening Dress</p>
                    <p className="text-xs font-semibold text-slate-700">$119.50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Complimentary Shipping</h4>
              <p className="text-[11px] text-slate-500">On all orders above $100</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">30-Day Easy Returns</h4>
              <p className="text-[11px] text-slate-500">Hassle-free doorstep pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">100% Authentic</h4>
              <p className="text-[11px] text-slate-500">Certified craftsmanship guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Exclusive Offers</h4>
              <p className="text-[11px] text-slate-500">Save with promo code STYLE20</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Curated Collections</span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onNavigateToShop()}
            className="text-xs font-bold text-slate-700 hover:text-rose-600 flex items-center gap-1 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES_LIST.slice(1).map(cat => (
            <div
              key={cat.id}
              onClick={() => onNavigateToShop(cat.id)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-100 relative aspect-4/5 shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent group-hover:from-slate-950/90 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-serif-luxury font-bold text-base group-hover:translate-x-1 transition-transform">
                  {cat.label}
                </p>
                <span className="text-[11px] text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 mt-0.5">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Handpicked Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 mt-1">
              Featured Highlights
            </h2>
          </div>
          <button
            onClick={() => onNavigateToShop()}
            className="text-xs font-bold text-slate-700 hover:text-rose-600 flex items-center gap-1 transition-colors group"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Mid Banner Promotion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-rose-900 via-rose-800 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Limited Time Coupon
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold leading-tight">
              Enjoy 20% Off Your Entire Wardrobe Refresh
            </h3>
            <p className="text-rose-100 text-sm leading-relaxed">
              Use code <span className="bg-white text-rose-900 font-mono font-bold px-2 py-0.5 rounded tracking-wider">STYLE20</span> at checkout on orders over $50. Free returns within 30 days.
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-center sm:items-start gap-3">
            <button
              onClick={() => onNavigateToShop('SpecialOffers')}
              className="px-8 py-3.5 bg-white text-rose-900 hover:bg-rose-50 font-bold rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Claim Your Discount
            </button>
            <span className="text-xs text-rose-200/80">*Applies automatically upon entering code</span>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Fresh In The Atelier
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => onNavigateToShop()}
            className="text-xs font-bold text-slate-700 hover:text-rose-600 flex items-center gap-1 transition-colors group"
          >
            <span>See What's New</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Trending & Special Offers Split Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-amber-100 text-amber-700">
                  <Flame className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Trending & Hot Sellers
                </span>
              </div>
              <h2 className="text-2xl font-serif-luxury font-bold text-slate-900 mt-1">
                Most Loved Styles
              </h2>
            </div>
            <button
              onClick={() => onNavigateToShop()}
              className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
            >
              Explore Trending <TrendingUp className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
