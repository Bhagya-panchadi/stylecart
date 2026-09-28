import React, { useState } from 'react';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  Percent, 
  ArrowLeft,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ShoppingCartProps {
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  onSelectProductById: (productId: string) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  onProceedToCheckout,
  onContinueShopping,
  onSelectProductById,
}) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    coupons,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMessage({ text: res.message, type: 'success' });
      setCouponInput('');
    } else {
      setCouponMessage({ text: res.message, type: 'error' });
    }
  };

  const handleQuickApply = (code: string) => {
    const res = applyCoupon(code);
    if (res.success) {
      setCouponMessage({ text: res.message, type: 'success' });
    } else {
      setCouponMessage({ text: res.message, type: 'error' });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif-luxury font-bold text-slate-900 mb-2">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
          Explore our newly unveiled autumn and winter couture collections to fill your wardrobe with timeless essentials.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-all duration-200 inline-flex items-center gap-2"
        >
          <span>Discover New Arrivals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900">
            Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review items, apply promo codes, and proceed smoothly to secure checkout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onContinueShopping}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing</span>
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700"
          >
            Clear Entire Bag
          </button>
        </div>
      </div>

      {/* Main Bag Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Thumbnail */}
              <div 
                onClick={() => onSelectProductById(item.productId)}
                className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer border border-slate-100"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  <span>{item.product.brand}</span>
                  <span>•</span>
                  <span>{item.product.category}</span>
                </div>

                <h3 
                  onClick={() => onSelectProductById(item.productId)}
                  className="text-sm font-bold text-slate-900 hover:text-rose-600 cursor-pointer truncate transition-colors"
                >
                  {item.product.name}
                </h3>

                {/* Selected variations */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <span>Size:</span>
                    <span className="font-semibold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                      {item.selectedSize}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Color:</span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: item.selectedColor.hex }}
                    />
                    <span className="font-semibold text-slate-800 text-[11px]">{item.selectedColor.name}</span>
                  </div>
                </div>

                {/* Pricing per piece */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-sm font-bold text-slate-900">
                    ${item.product.price.toFixed(2)}
                  </span>
                  {item.product.originalPrice > item.product.price && (
                    <span className="text-xs text-slate-400 line-through">
                      ${item.product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls and Subtotal */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-3 self-stretch sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0">
                {/* Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white text-xs font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white text-xs font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Delivery perk banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3 text-indigo-900 text-xs">
            <Truck className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              {cartSubtotal >= 100 ? (
                <span>
                  <strong>Unlocked Free Delivery!</strong> Your order qualifies for zero shipping fees.
                </span>
              ) : (
                <span>
                  Add <strong className="font-bold">${(100 - cartSubtotal).toFixed(2)}</strong> more to qualify for <strong>Free Standard Delivery</strong>!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary & Coupon Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-serif-luxury font-bold text-lg text-slate-900">
              Order Summary
            </h2>

            {/* Coupon Promo Box */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-rose-600" />
                <span>Apply Promo Code</span>
              </label>

              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800">
                      {appliedCoupon.code} applied!
                    </span>
                    <p className="text-[11px] text-emerald-700">
                      {appliedCoupon.discountPercent}% off applied to cart
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 rounded-full text-emerald-800 hover:bg-emerald-100"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. STYLE20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs uppercase px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponMessage && (
                <p className={`text-xs ${couponMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponMessage.text}
                </p>
              )}

              {/* Quick coupons preview */}
              {!appliedCoupon && coupons.length > 0 && (
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Available for you:</p>
                  <div className="space-y-1">
                    {coupons.slice(0, 2).map(c => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleQuickApply(c.code)}
                        className="w-full text-left p-2 rounded-lg border border-dashed border-slate-200 hover:border-rose-400 bg-slate-50/50 flex items-center justify-between text-xs transition-colors"
                      >
                        <span className="font-mono font-bold text-rose-600">{c.code}</span>
                        <span className="text-[11px] text-slate-500">{c.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-900">
                  {cartDeliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase">Free</span>
                  ) : (
                    `$${cartDeliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-slate-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-slate-400">Includes all duties and sales tax</p>
                </div>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-rose-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust badge */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
