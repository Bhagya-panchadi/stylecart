import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface WishlistPageProps {
  onSelectProduct: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onSelectProduct,
  onExploreProducts,
}) => {
  const { wishlist, products, toggleWishlist, moveToCartFromWishlist } = useStore();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
          <Heart className="w-10 h-10 fill-rose-600" />
        </div>
        <h2 className="text-3xl font-serif-luxury font-bold text-slate-900 mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
          Save your favorite couture items here and transfer them seamlessly to your bag whenever you're ready to order.
        </p>
        <button
          onClick={onExploreProducts}
          className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-all duration-200 inline-flex items-center gap-2"
        >
          <span>Explore Trendy Styles</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Curated items you've saved for later. Move directly into your cart with one click.
          </p>
        </div>

        <button
          onClick={onExploreProducts}
          className="text-xs font-semibold text-rose-600 hover:underline"
        >
          + Add more items
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map(product => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div 
              onClick={() => onSelectProduct(product)}
              className="relative aspect-3/4 bg-slate-100 cursor-pointer overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-rose-600 shadow-sm transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {product.discountPercentage > 0 && (
                <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {product.discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {product.brand}
                </span>
                <h3 
                  onClick={() => onSelectProduct(product)}
                  className="font-bold text-sm text-slate-900 group-hover:text-rose-600 cursor-pointer truncate transition-colors"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-slate-900">${product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-slate-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Move to Cart */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => moveToCartFromWishlist(product.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
