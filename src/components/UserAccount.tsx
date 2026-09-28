import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Clock, 
  LogOut, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Check, 
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Address } from '../types';

interface UserAccountProps {
  onSelectProduct: (product: Product) => void;
  onTrackOrder: (orderId: string) => void;
  onNavigateToWishlist: () => void;
}

export const UserAccount: React.FC<UserAccountProps> = ({
  onSelectProduct,
  onTrackOrder,
  onNavigateToWishlist,
}) => {
  const { 
    userProfile, 
    orders, 
    wishlist, 
    products, 
    recentlyViewed, 
    addresses, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'recent'>('profile');
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // New Address state
  const [newName, setNewName] = useState(userProfile.fullName);
  const [newMobile, setNewMobile] = useState(userProfile.phone);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newIsDefault, setNewIsDefault] = useState(false);

  // Recently viewed products mapped
  const recentProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      fullName: newName,
      mobile: newMobile,
      street: newStreet,
      city: newCity,
      state: newState,
      pincode: newPincode,
      isDefault: newIsDefault
    });
    setShowAddAddressModal(false);
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPincode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* User Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-rose-500 ring-4 ring-rose-50"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-serif-luxury font-bold text-slate-900">
              {userProfile.fullName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{userProfile.email} • {userProfile.phone}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
              StyleCart Gold Member since {userProfile.memberSince}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="block text-2xl font-serif-luxury font-bold text-slate-900">{orders.length}</span>
            <span className="text-xs text-slate-500">Total Orders</span>
          </div>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Side Menu */}
        <div className="md:col-span-4 lg:col-span-3 space-y-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-3 ${
                activeTab === 'profile' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Information</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                activeTab === 'orders' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'orders' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={onNavigateToWishlist}
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Wishlist</span>
              </div>
              <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-[10px]">
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-3 ${
                activeTab === 'addresses' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-3 ${
                activeTab === 'recent' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Recently Viewed</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Buyer Protection Active</span>
            </div>
            <p className="text-[11px]">
              Every order with StyleCart is insured against damage or loss with zero deductible.
            </p>
          </div>
        </div>

        {/* Right Dynamic Tab Content */}
        <div className="md:col-span-8 lg:col-span-9">
          {/* TAB 1: Profile Info */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-lg font-serif-luxury font-bold text-slate-900 pb-3 border-b border-slate-100">
                Personal Profile & Contact
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
                  <p className="font-semibold text-slate-800 text-sm p-3 bg-slate-50 rounded-xl">{userProfile.fullName}</p>
                </div>
                <div>
                  <label className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                  <p className="font-semibold text-slate-800 text-sm p-3 bg-slate-50 rounded-xl">{userProfile.email}</p>
                </div>
                <div>
                  <label className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone Number</label>
                  <p className="font-semibold text-slate-800 text-sm p-3 bg-slate-50 rounded-xl">{userProfile.phone}</p>
                </div>
                <div>
                  <label className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Membership Status</label>
                  <p className="font-semibold text-emerald-700 text-sm p-3 bg-emerald-50 rounded-xl">Verified Prime Client</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Account ID: {userProfile.id}</span>
                <button
                  onClick={() => alert('Profile update session simulated.')}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-rose-600 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: My Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-serif-luxury font-bold text-slate-900">
                  Your Orders History
                </h2>
                <span className="text-xs text-slate-500">{orders.length} total orders placed</span>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-800">No orders found</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900">Order #{ord.orderNumber}</span>
                        <span className="text-slate-400 ml-2">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">
                          {ord.status}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">
                          ${ord.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Items thumbnail horizontal list */}
                    <div className="flex items-center gap-3 overflow-x-auto py-1">
                      {ord.items.map((it) => (
                        <div key={it.id} className="flex items-center gap-2 shrink-0">
                          <img
                            src={it.product.images[0]}
                            alt={it.product.name}
                            className="w-12 h-14 object-cover rounded-lg bg-slate-100 border border-slate-100"
                          />
                          <div className="text-xs max-w-[130px]">
                            <p className="truncate font-semibold text-slate-800">{it.product.name}</p>
                            <p className="text-[11px] text-slate-400">Qty: {it.quantity} • {it.selectedSize}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Paid via <strong className="text-slate-700">{ord.paymentMethod}</strong>
                      </span>
                      <button
                        onClick={() => onTrackOrder(ord.id)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-600 text-white font-bold transition-colors flex items-center gap-1.5"
                      >
                        <span>Live Tracking</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-serif-luxury font-bold text-slate-900">
                  Manage Saved Addresses
                </h2>
                <button
                  onClick={() => setShowAddAddressModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs relative flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-slate-900">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">{addr.street}</p>
                      <p className="text-xs text-slate-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-xs text-slate-500 font-mono mt-1">Mobile: {addr.mobile}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-slate-600 hover:text-slate-900 font-semibold"
                        >
                          Set as Default
                        </button>
                      ) : <span />}
                      {addresses.length > 1 && (
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-rose-600 hover:text-rose-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Recently Viewed Products */}
          {activeTab === 'recent' && (
            <div className="space-y-6">
              <h2 className="text-lg font-serif-luxury font-bold text-slate-900">
                Recently Viewed Garments
              </h2>
              {recentProducts.length === 0 ? (
                <p className="text-xs text-slate-400">No recently viewed products.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {recentProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => onSelectProduct(p)}
                      className="cursor-pointer group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all"
                    >
                      <div className="aspect-3/4 bg-slate-100 overflow-hidden">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] font-bold uppercase text-slate-400">{p.brand}</p>
                        <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-rose-600">{p.name}</h4>
                        <p className="text-xs font-semibold text-slate-800 mt-1">${p.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Add New Delivery Address</h3>
            <form onSubmit={handleCreateAddress} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                required
                value={newMobile}
                onChange={e => setNewMobile(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
              <input
                type="text"
                placeholder="Street / Flat / House Address"
                required
                value={newStreet}
                onChange={e => setNewStreet(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={newCity}
                  onChange={e => setNewCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  value={newState}
                  onChange={e => setNewState(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
                <input
                  type="text"
                  placeholder="PIN"
                  required
                  value={newPincode}
                  onChange={e => setNewPincode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newIsDefault}
                  onChange={e => setNewIsDefault(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Set as default shipping address</span>
              </label>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAddressModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
