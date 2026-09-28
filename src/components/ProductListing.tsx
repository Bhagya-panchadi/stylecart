import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  Star, 
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { Product, CategoryType, GenderType } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListingProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductListing: React.FC<ProductListingProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState<string>('popular');

  // Available options derived from data
  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);
  const allSizes = useMemo(() => Array.from(new Set(products.flatMap(p => p.availableSizes))), [products]);
  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach(p => p.colors.forEach(c => map.set(c.name, c.hex)));
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const categories: string[] = ['All', 'Men', 'Women', 'Kids', 'Dresses', 'Shirts', 'T-Shirts', 'Jeans', 'Shoes', 'Accessories'];
  const genders: string[] = ['All', 'Men', 'Women', 'Kids', 'Unisex'];

  // Toggle helpers
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev => prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]);
  };

  const resetFilters = () => {
    setSelectedGender('All');
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setMinRating(0);
    setMinDiscount(0);
    setPriceRange([0, 300]);
    setSortBy('popular');
    setSearchQuery('');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesCat) return false;
      }

      // Special Offer category filter
      if (selectedCategory === 'SpecialOffers') {
        if (product.discountPercentage < 20) return false;
      } else if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        // Match category
        return false;
      }

      // Gender
      if (selectedGender !== 'All') {
        if (product.gender !== selectedGender && product.gender !== 'Unisex') {
          return false;
        }
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasMatchingSize = selectedSizes.some(s => product.availableSizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Brands
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) return false;
      }

      // Colors
      if (selectedColors.length > 0) {
        const hasMatchingColor = selectedColors.some(cn => product.colors.some(c => c.name === cn));
        if (!hasMatchingColor) return false;
      }

      // Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Discount
      if (minDiscount > 0 && product.discountPercentage < minDiscount) {
        return false;
      }

      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      return 0;
    });
  }, [
    products, 
    searchQuery, 
    selectedCategory, 
    selectedGender, 
    selectedSizes, 
    selectedBrands, 
    selectedColors, 
    minRating, 
    minDiscount, 
    priceRange, 
    sortBy
  ]);

  const activeFilterCount = (
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedGender !== 'All' ? 1 : 0) +
    selectedSizes.length +
    selectedBrands.length +
    selectedColors.length +
    (minRating > 0 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 300 ? 1 : 0) +
    (searchQuery ? 1 : 0)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Sort Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900">
            {selectedCategory === 'SpecialOffers' 
              ? 'Special Offers & Clearance' 
              : selectedCategory === 'All' 
              ? 'All Clothing & Accessories' 
              : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> luxury styles
            {searchQuery && <span> matching "<strong className="text-rose-600">{searchQuery}</strong>"</span>}
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-rose-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl pl-3.5 pr-8 py-2.5 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 shadow-xs cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-6">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block md:col-span-1 lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose-600" />
              <span>Filter Catalog</span>
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</h4>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Gender</h4>
            <div className="flex flex-wrap gap-1.5">
              {genders.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    selectedGender === g
                      ? 'bg-rose-50 border-rose-500 text-rose-700 font-bold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400">Price Range</span>
              <span className="font-bold text-slate-900">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={300}
              step={10}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$0</span>
              <span>$150</span>
              <span>$300</span>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sizes</h4>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => toggleSize(sz)}
                  className={`text-xs w-9 h-9 rounded-xl border flex items-center justify-center font-semibold transition-all ${
                    selectedSizes.includes(sz)
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Colors</h4>
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {allColors.map(col => (
                <button
                  key={col.name}
                  onClick={() => toggleColor(col.name)}
                  className={`text-left text-xs p-1.5 rounded-lg border flex items-center gap-2 transition-all ${
                    selectedColors.includes(col.name)
                      ? 'border-rose-500 bg-rose-50/50 text-slate-900 font-semibold'
                      : 'border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="truncate">{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Brands</h4>
            <div className="space-y-1">
              {allBrands.map(brand => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5 border-slate-300"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer Rating</h4>
            <div className="space-y-1">
              {[4, 4.5, 4.8].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(minRating === r ? 0 : r)}
                  className={`w-full text-left text-xs py-1 px-2 rounded-lg flex items-center justify-between ${
                    minRating === r ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{r} Stars & above</span>
                  </span>
                  {minRating === r && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Discount */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Discount</h4>
            <div className="flex flex-wrap gap-1.5">
              {[10, 20, 30].map(disc => (
                <button
                  key={disc}
                  onClick={() => setMinDiscount(minDiscount === disc ? 0 : disc)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    minDiscount === disc
                      ? 'bg-rose-600 border-rose-600 text-white font-bold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {disc}%+ OFF
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Gallery */}
        <div className="md:col-span-3 lg:col-span-4">
          {/* Active filter badges */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <span className="font-semibold text-slate-500">Active Filters:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="text-slate-400 hover:text-slate-600">×</button>
                </span>
              )}
              {selectedGender !== 'All' && (
                <span className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  Gender: {selectedGender}
                  <button onClick={() => setSelectedGender('All')} className="text-slate-400 hover:text-slate-600">×</button>
                </span>
              )}
              {selectedSizes.map(s => (
                <span key={s} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  Size: {s}
                  <button onClick={() => toggleSize(s)} className="text-slate-400 hover:text-slate-600">×</button>
                </span>
              ))}
              {selectedBrands.map(b => (
                <span key={b} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  Brand: {b}
                  <button onClick={() => toggleBrand(b)} className="text-slate-400 hover:text-slate-600">×</button>
                </span>
              ))}
              {minRating > 0 && (
                <span className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  Rating: {minRating}+ ★
                  <button onClick={() => setMinRating(0)} className="text-slate-400 hover:text-slate-600">×</button>
                </span>
              )}
              {minDiscount > 0 && (
                <span className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  Discount: {minDiscount}%+
                  <button onClick={() => setMinDiscount(0)} className="text-slate-400 hover:text-slate-600">×</button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-rose-600 hover:underline font-semibold ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-slate-800">
                No matching garments found
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mt-2 mb-6">
                We couldn't find items matching your active combination of filters. Try clearing some selections or search terms.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
          />
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl flex flex-col z-10 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-base text-slate-900">Filters</h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category Select */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`text-xs py-2 px-2 rounded-lg font-medium text-center ${
                      selectedCategory === c ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Gender */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Gender</h4>
              <div className="flex flex-wrap gap-2">
                {genders.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`text-xs px-3 py-1.5 rounded-lg border ${
                      selectedGender === g ? 'bg-rose-50 border-rose-500 text-rose-700 font-bold' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-400">Price Up To</span>
                <span className="font-bold text-slate-900">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={300}
                step={10}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Apply & Reset Buttons */}
            <div className="pt-6 border-t border-slate-200 mt-auto flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
