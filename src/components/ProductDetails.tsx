import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Ruler, 
  ChevronRight, 
  Share2, 
  Check, 
  ArrowLeft,
  X,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onNavigateToCart: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onBack,
  onNavigateToCart,
  onSelectProduct,
}) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addProductReview, 
    products, 
    recordProductView 
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [addedAlert, setAddedAlert] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Record this product in recently viewed
  React.useEffect(() => {
    recordProductView(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onNavigateToCart();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    addProductReview(product.id, {
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      title: newReviewTitle.trim() || 'Verified Customer Review',
      comment: newReviewComment.trim()
    });

    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs hover:shadow-xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Share this product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          {copiedLink && (
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              Link copied!
            </span>
          )}
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery (Thumbs + Big Display) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === idx ? 'border-rose-600 shadow-md ring-2 ring-rose-500/20' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Large Main Image */}
          <div className="relative flex-1 aspect-3/4 sm:aspect-4/5 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {product.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Save {product.discountPercentage}%
              </div>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 shadow-md ${
                inWishlist
                  ? 'bg-rose-50 text-rose-600 scale-105'
                  : 'bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Information, Selectors & Buy Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {product.brand}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-rose-600 font-semibold uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-amber-900 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-slate-500">
                Based on <strong className="text-slate-800">{product.reviewCount} customer reviews</strong>
              </span>
            </div>
          </div>

          {/* Pricing section */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-base text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
            <span className="text-xs text-slate-400 ml-auto">Taxes included</span>
          </div>

          {/* Color Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Color: <span className="text-slate-900 font-semibold">{selectedColor.name}</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map(color => (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center ${
                    selectedColor.hex === color.hex 
                      ? 'ring-2 ring-rose-500 ring-offset-2 scale-110 border-white' 
                      : 'border-slate-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor.hex === color.hex && (
                    <Check className={`w-4 h-4 ${['#ffffff', '#f8fafc', '#f5f5f4'].includes(color.hex.toLowerCase()) ? 'text-slate-900' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector + Size Chart Modal Button */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Size: <span className="text-slate-900 font-semibold">{selectedSize}</span>
              </label>
              <button
                type="button"
                onClick={() => setShowSizeChart(true)}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Chart & Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.availableSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-400 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Stock Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-sm text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
              >
                +
              </button>
            </div>

            <div className="text-xs">
              {product.stock > 5 ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Stock ({product.stock} items ready to ship)
                </span>
              ) : product.stock > 0 ? (
                <span className="text-amber-600 font-bold">
                  Hurry! Only {product.stock} left in stock
                </span>
              ) : (
                <span className="text-rose-600 font-bold">Currently Sold Out</span>
              )}
            </div>
          </div>

          {/* Action Buttons: Add to Cart, Buy Now */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-white border-2 border-slate-900 text-slate-900 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-rose-600 text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Buy Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Added Alert Banner */}
            {addedAlert && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between">
                <span className="font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Added to your shopping cart!
                </span>
                <button
                  onClick={onNavigateToCart}
                  className="font-bold underline hover:text-emerald-950"
                >
                  View Cart
                </button>
              </div>
            )}
          </div>

          {/* Delivery & Material Highlights */}
          <div className="pt-6 border-t border-slate-200 space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Standard delivery 2-4 business days. Express shipping available.</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-slate-400 shrink-0" />
              <span>30-day effortless return policy with complimentary home pickup.</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
              <span>100% Genuine product directly from verified designer brand.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Fabric Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-slate-200">
        <div className="md:col-span-7 space-y-6">
          <div>
            <h3 className="text-lg font-serif-luxury font-bold text-slate-900 mb-3">
              Product Overview
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Material & Composition
            </h4>
            <p className="text-sm font-medium text-slate-800">
              {product.material}
            </p>
            <p className="text-xs text-slate-500 pt-1">
              Care Instructions: Dry clean or cold machine wash gentle cycle. Do not bleach. Cool iron inside out.
            </p>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif-luxury font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-600" />
              <span>Customer Reviews ({product.reviews?.length || 0})</span>
            </h3>
          </div>

          {/* New Review Form */}
          <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Write a Review</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Your Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewReviewRating(star)}
                    className="p-1"
                  >
                    <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Your Name (e.g. Eleanor Vance)"
              value={newReviewAuthor}
              onChange={(e) => setNewReviewAuthor(e.target.value)}
              required
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
            />
            <input
              type="text"
              placeholder="Review Title (e.g. Gorgeous fit!)"
              value={newReviewTitle}
              onChange={(e) => setNewReviewTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
            />
            <textarea
              rows={2}
              placeholder="Share how this garment feels, drape quality, and fit..."
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              required
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white resize-none"
            />

            <button
              type="submit"
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Post Customer Review
            </button>

            {reviewSubmitted && (
              <p className="text-xs text-emerald-600 font-semibold text-center">
                Thank you! Your review has been added.
              </p>
            )}
          </form>

          {/* Existing Reviews List */}
          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {(!product.reviews || product.reviews.length === 0) ? (
              <p className="text-xs text-slate-400 italic">No reviews yet. Be the first to share your thoughts!</p>
            ) : (
              product.reviews.map(rev => (
                <div key={rev.id} className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-800">{rev.userName}</span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                    ))}
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-600 ml-2 font-medium">✓ Verified Buyer</span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{rev.title}</p>
                  <p className="text-xs text-slate-600">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Related Products from same category */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif-luxury font-bold text-slate-900">
              You May Also Appreciate
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-lg text-slate-900">Standard Size Guide</h3>
              </div>
              <button
                onClick={() => setShowSizeChart(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <p className="text-slate-600">
                Measurements are in inches. For the best fit, measure yourself over undergarments and compare with the table below.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold">
                      <th className="p-2.5 rounded-l-lg">Size</th>
                      <th className="p-2.5">Chest (in)</th>
                      <th className="p-2.5">Waist (in)</th>
                      <th className="p-2.5 rounded-r-lg">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr><td className="p-2.5 font-bold text-slate-900">XS</td><td className="p-2.5">34 - 36</td><td className="p-2.5">28 - 30</td><td className="p-2.5">35 - 37</td></tr>
                    <tr><td className="p-2.5 font-bold text-slate-900">S</td><td className="p-2.5">36 - 38</td><td className="p-2.5">30 - 32</td><td className="p-2.5">37 - 39</td></tr>
                    <tr><td className="p-2.5 font-bold text-slate-900">M</td><td className="p-2.5">38 - 40</td><td className="p-2.5">32 - 34</td><td className="p-2.5">39 - 41</td></tr>
                    <tr><td className="p-2.5 font-bold text-slate-900">L</td><td className="p-2.5">40 - 42</td><td className="p-2.5">34 - 36</td><td className="p-2.5">41 - 43</td></tr>
                    <tr><td className="p-2.5 font-bold text-slate-900">XL</td><td className="p-2.5">42 - 45</td><td className="p-2.5">36 - 39</td><td className="p-2.5">43 - 46</td></tr>
                    <tr><td className="p-2.5 font-bold text-slate-900">XXL</td><td className="p-2.5">45 - 48</td><td className="p-2.5">39 - 42</td><td className="p-2.5">46 - 49</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                <strong>Fit Tip:</strong> If your measurements fall between two sizes, we recommend selecting the larger size for a relaxed drape or smaller size for a close silhouette.
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowSizeChart(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
