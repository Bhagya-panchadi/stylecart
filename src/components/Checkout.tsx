import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  MapPin, 
  Truck, 
  ArrowLeft, 
  Check, 
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Address } from '../types';

interface CheckoutProps {
  onBackToCart: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  onBackToCart,
  onOrderSuccess,
}) => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartDeliveryFee, 
    cartTotal, 
    appliedCoupon, 
    addresses, 
    addAddress,
    createOrder 
  } = useStore();

  // Form states
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses[0]?.id || 'new'
  );

  // New Address Form
  const [name, setName] = useState('Bhagyalakshmi Panchadi');
  const [mobile, setMobile] = useState('+1 (555) 349-8201');
  const [street, setStreet] = useState('742 Evergreen Terrace, Apt 4B');
  const [landmark, setLandmark] = useState('Near Spring Park');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('California');
  const [pincode, setPincode] = useState('94107');

  // Options
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Cash on Delivery'>('UPI');
  
  // Specific payment inputs
  const [upiId, setUpiId] = useState('bhagya@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('889');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate delivery fee variation
  const effectiveDeliveryFee = deliveryOption === 'express' ? (cartDeliveryFee + 10) : cartDeliveryFee;
  const effectiveTotal = Math.max(0, cartSubtotal - cartDiscount + effectiveDeliveryFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalAddress: Address;
    const existing = addresses.find(a => a.id === selectedAddressId);
    if (existing) {
      finalAddress = existing;
    } else {
      finalAddress = {
        id: `addr-${Date.now()}`,
        fullName: name,
        mobile,
        street,
        landmark,
        city,
        state,
        pincode,
        isDefault: true
      };
      addAddress(finalAddress);
    }

    setTimeout(() => {
      const order = createOrder({
        items: cart,
        shippingAddress: finalAddress,
        deliveryOption,
        deliveryFee: effectiveDeliveryFee,
        paymentMethod,
        subtotal: cartSubtotal,
        couponDiscount: cartDiscount,
        couponCode: appliedCoupon?.code,
        total: effectiveTotal,
        estimatedDeliveryDate: deliveryOption === 'express' ? 'Within 24 Hours' : '3-4 Business Days',
      });

      // Celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if not loaded
      }

      setIsSubmitting(false);
      onOrderSuccess(order.id);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <button
          onClick={onBackToCart}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs hover:shadow-xs transition-all mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900">
          Secure Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete your delivery details and choose your preferred payment method.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Address, Delivery & Payment */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Delivery Address */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-base text-slate-900">Delivery Address</h3>
              </div>
              <MapPin className="w-4 h-4 text-slate-400" />
            </div>

            {/* Saved Addresses list if any */}
            {addresses.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Saved Addresses</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-rose-600 bg-rose-50/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">{addr.fullName}</span>
                        {selectedAddressId === addr.id && (
                          <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">{addr.street}</p>
                      <p className="text-xs text-slate-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono">{addr.mobile}</p>
                    </div>
                  ))}
                  <div
                    onClick={() => setSelectedAddressId('new')}
                    className={`p-3.5 rounded-2xl border-2 border-dashed cursor-pointer flex items-center justify-center text-xs font-bold transition-all ${
                      selectedAddressId === 'new'
                        ? 'border-rose-600 text-rose-600 bg-rose-50/30'
                        : 'border-slate-300 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    + Enter New Address
                  </div>
                </div>
              </div>
            )}

            {/* New address input fields if 'new' is chosen */}
            {selectedAddressId === 'new' && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Receiver's Full Name"
                      className="mt-1 w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="mt-1 w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Delivery Address / Street *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="House/Flat number, Building name, Street"
                    className="mt-1 w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="mt-1 w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">PIN / Zip Code *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="mt-1 w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Shipping Method */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-base text-slate-900">Delivery Option</h3>
              </div>
              <Truck className="w-4 h-4 text-slate-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setDeliveryOption('standard')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  deliveryOption === 'standard'
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  checked={deliveryOption === 'standard'}
                  onChange={() => setDeliveryOption('standard')}
                  className="mt-1 text-slate-900"
                />
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Standard Courier Delivery</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Estimated 3-4 business days</span>
                  <span className="text-xs font-semibold text-emerald-600 block mt-1">
                    {cartDeliveryFee === 0 ? 'Complimentary' : `$${cartDeliveryFee.toFixed(2)}`}
                  </span>
                </div>
              </label>

              <label
                onClick={() => setDeliveryOption('express')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  deliveryOption === 'express'
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  checked={deliveryOption === 'express'}
                  onChange={() => setDeliveryOption('express')}
                  className="mt-1 text-slate-900"
                />
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Priority Express Courier</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Arrives within 24-36 hours</span>
                  <span className="text-xs font-semibold text-slate-900 block mt-1">
                    + $10.00 Express surcharge
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-base text-slate-900">Payment Method</h3>
              </div>
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>

            {/* Payment Tabs: UPI, Card, COD */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'UPI'
                    ? 'border-rose-600 bg-rose-50/40 text-rose-700 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Smartphone className="w-5 h-5 text-rose-600" />
                <span className="text-xs">UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Credit/Debit Card')}
                className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'Credit/Debit Card'
                    ? 'border-rose-600 bg-rose-50/40 text-rose-700 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <CreditCard className="w-5 h-5 text-rose-600" />
                <span className="text-xs">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-rose-600 bg-rose-50/40 text-rose-700 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Banknote className="w-5 h-5 text-rose-600" />
                <span className="text-xs">Cash on Delivery</span>
              </button>
            </div>

            {/* Specific Payment Input Sub-forms */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              {paymentMethod === 'UPI' && (
                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">Instant UPI ID / VPA</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="flex-1 bg-white px-3 py-2 rounded-xl border border-slate-200"
                    />
                    <span className="px-3 py-2 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-[11px] flex items-center">
                      Verified ✓
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Supports Google Pay, PhonePe, Paytm, BHIM and netbanking VPAs.</p>
                </div>
              )}

              {paymentMethod === 'Credit/Debit Card' && (
                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white px-3 py-2 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div className="text-slate-600 leading-relaxed">
                  <p className="font-bold text-slate-900 mb-1">Cash on Delivery selected</p>
                  Pay in cash or through QR scan when your courier delivers the parcel at your doorstep. No prepayment required.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Summary & Place Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-28">
            <h2 className="font-serif-luxury font-bold text-lg text-slate-900">
              Order Summary ({cart.length} items)
            </h2>

            {/* Micro items list */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-semibold text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-slate-500 text-[11px]">
                      Qty: {item.quantity} • {item.selectedSize} • {item.selectedColor.name}
                    </p>
                    <p className="font-bold text-slate-800 mt-0.5">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span className="font-semibold text-slate-900">
                  {effectiveDeliveryFee === 0 ? 'FREE' : `$${effectiveDeliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Total Payable</span>
                <span className="text-2xl font-bold text-rose-600">
                  ${effectiveTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-900/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order (${effectiveTotal.toFixed(2)})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure Bank Grade Encryption</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
