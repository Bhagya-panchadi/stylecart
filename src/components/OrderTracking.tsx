import React from 'react';
import { 
  PackageCheck, 
  Truck, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowLeft,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';

interface OrderTrackingProps {
  orderId?: string;
  onContinueShopping: () => void;
  onSelectProductById: (productId: string) => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  orderId,
  onContinueShopping,
  onSelectProductById,
}) => {
  const { orders, cancelOrder } = useStore();

  // Find target order or default to most recent
  const order: Order | undefined = orderId 
    ? orders.find(o => o.id === orderId) 
    : orders[0];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif-luxury font-bold text-slate-800">
          No Orders Found
        </h2>
        <p className="text-slate-500 text-sm mt-2 mb-6">
          You haven't placed any orders yet. Start exploring our collections today!
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const stepStatusList: OrderStatus[] = [
    'Order Confirmed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const currentStepIdx = stepStatusList.indexOf(order.status);
  const isCancelled = order.status === 'Cancelled';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            Real-Time Order Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 mt-1">
            Order #{order.orderNumber}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onContinueShopping}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Continue Shopping
          </button>
          {!isCancelled && order.status !== 'Delivered' && (
            <button
              onClick={() => cancelOrder(order.id)}
              className="px-4 py-2 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Status Highlights Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${isCancelled ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'}`}>
              {isCancelled ? <XCircle className="w-6 h-6" /> : <PackageCheck className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Current Status</span>
              <h3 className={`text-base font-bold ${isCancelled ? 'text-rose-600' : 'text-slate-900'}`}>
                {order.status}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Estimated Delivery: <strong>{order.estimatedDeliveryDate}</strong></span>
          </div>
        </div>

        {/* 5-Step Visual Progress Bar */}
        {!isCancelled && (
          <div className="py-4">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -z-0">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-700"
                  style={{
                    width: `${Math.max(0, Math.min(100, (currentStepIdx / (stepStatusList.length - 1)) * 100))}%`
                  }}
                />
              </div>

              {/* Steps icons & labels */}
              <div className="relative z-10 flex justify-between">
                {stepStatusList.map((stepName, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={stepName} className="flex flex-col items-center text-center max-w-[80px] sm:max-w-[120px]">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                            : 'bg-white border-slate-300 text-slate-400'
                        } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span className={`text-[11px] mt-2 font-semibold ${isCurrent ? 'text-emerald-700 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                        {stepName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Tracking Events Log */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Delivery Updates & Activity Log
          </h4>
          <div className="space-y-4">
            {order.trackingSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 text-xs">
                <div className="pt-1">
                  <span className={`block w-2.5 h-2.5 rounded-full ${step.completed ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-slate-300'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.status}
                    </span>
                    {step.date && (
                      <span className="text-[11px] text-slate-400 font-mono">{step.date}</span>
                    )}
                  </div>
                  <p className="text-slate-500 mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Items & Address Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-rose-600" />
            <span>Ordered Items ({order.items.length})</span>
          </h3>

          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => onSelectProductById(item.productId)}
                className="py-3 flex items-center gap-4 cursor-pointer group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-slate-800 group-hover:text-rose-600 truncate transition-colors">
                    {item.product.name}
                  </h4>
                  <p className="text-slate-500 text-[11px]">
                    Size: {item.selectedSize} • Color: {item.selectedColor.name} • Qty: {item.quantity}
                  </p>
                  <p className="font-semibold text-slate-900 mt-1">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Billing Summary */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Destination Address</span>
            </h3>
            <p className="font-bold text-slate-800">{order.shippingAddress.fullName}</p>
            <p className="text-slate-600">{order.shippingAddress.street}</p>
            <p className="text-slate-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-slate-500 font-mono">Mobile: {order.shippingAddress.mobile}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900">Payment Breakdown</h3>
            <div className="flex justify-between text-slate-600">
              <span>Payment Mode</span>
              <span className="font-bold text-slate-800">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Items Total</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({order.couponCode})</span>
                <span>-${order.couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Shipping Fee</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
              <span>Total Paid</span>
              <span className="text-rose-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
