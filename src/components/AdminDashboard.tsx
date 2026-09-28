import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Search,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, CategoryType, GenderType, Coupon } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    coupons, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus,
    addCoupon,
    deleteCoupon,
    userProfile
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'inventory' | 'coupons'>('overview');
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New/Edit product form state
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('StyleCart Pret');
  const [formCategory, setFormCategory] = useState<CategoryType>('Dresses');
  const [formGender, setFormGender] = useState<GenderType>('Women');
  const [formPrice, setFormPrice] = useState(79.99);
  const [formOriginalPrice, setFormOriginalPrice] = useState(99.99);
  const [formDescription, setFormDescription] = useState('');
  const [formMaterial, setFormMaterial] = useState('100% Organic Silk & Cotton');
  const [formStock, setFormStock] = useState(25);
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80');

  // Coupon modal
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(40);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Statistics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((iSum, it) => iSum + it.quantity, 0), 0);
  const lowStockCount = products.filter(p => p.stock <= 15).length;

  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormBrand('StyleCart Atelier');
    setFormCategory('Dresses');
    setFormGender('Women');
    setFormPrice(89.99);
    setFormOriginalPrice(119.99);
    setFormDescription('Contemporary silhouette with impeccable finish.');
    setFormMaterial('100% Breathable Combed Cotton');
    setFormStock(30);
    setFormImage('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80');
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormBrand(prod.brand);
    setFormCategory(prod.category);
    setFormGender(prod.gender);
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice);
    setFormDescription(prod.description);
    setFormMaterial(prod.material);
    setFormStock(prod.stock);
    setFormImage(prod.images[0] || '');
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = formOriginalPrice > formPrice 
      ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100) 
      : 0;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        brand: formBrand,
        category: formCategory,
        gender: formGender,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercentage: discount,
        description: formDescription,
        material: formMaterial,
        stock: Number(formStock),
        images: [formImage, ...editingProduct.images.slice(1)]
      });
    } else {
      addProduct({
        name: formName,
        brand: formBrand,
        category: formCategory,
        gender: formGender,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercentage: discount,
        description: formDescription,
        material: formMaterial,
        availableSizes: ['S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Classic Black', hex: '#18181b' },
          { name: 'Pure White', hex: '#ffffff' },
          { name: 'Navy', hex: '#1e3a8a' }
        ],
        stock: Number(formStock),
        images: [formImage],
        isNewArrival: true
      });
    }
    setProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponPercent),
      minOrder: Number(newCouponMin),
      description: newCouponDesc.trim() || `${newCouponPercent}% off on orders over $${newCouponMin}`
    });
    setNewCouponCode('');
    setNewCouponDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Administrator Access
            </span>
            <span className="text-xs text-slate-400">Live Management Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 mt-1">
            StyleCart Admin Hub
          </h1>
        </div>

        <button
          onClick={openNewProductModal}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
          { id: 'products', label: `Products (${products.length})`, icon: ShoppingBag },
          { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
          { id: 'inventory', label: `Inventory Management`, icon: CheckCircle },
          { id: 'coupons', label: `Discounts & Coupons (${coupons.length})`, icon: Tag },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Sales</span>
              <p className="text-2xl font-serif-luxury font-bold text-slate-900 mt-2">
                ${totalRevenue.toFixed(2)}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> Real-time active orders
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
              <p className="text-2xl font-serif-luxury font-bold text-slate-900 mt-2">
                {orders.length}
              </p>
              <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1 mt-1">
                {orders.filter(o => o.status === 'Out for Delivery' || o.status === 'Processing').length} in transit
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Items in Catalog</span>
              <p className="text-2xl font-serif-luxury font-bold text-slate-900 mt-2">
                {products.length}
              </p>
              <span className="text-[11px] text-slate-500 mt-1">
                Across 9 premium categories
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Low Stock Warnings</span>
              <p className={`text-2xl font-serif-luxury font-bold mt-2 ${lowStockCount > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
                {lowStockCount} items
              </p>
              <span className="text-[11px] text-slate-400 mt-1">
                Inventory threshold &lt;= 15 units
              </span>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Recent Customer Activity</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                View all {orders.length} orders
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                      <td className="py-3 text-slate-700 font-medium">{o.shippingAddress.fullName}</td>
                      <td className="py-3 text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 font-bold text-slate-900">${o.total.toFixed(2)}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => setActiveTab('orders')}
                          className="text-rose-600 font-bold hover:underline"
                        >
                          Manage Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">
              Active Garment Catalog ({products.length})
            </h3>
            <button
              onClick={openNewProductModal}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
            >
              + Add Product
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-12 rounded-lg object-cover bg-slate-100"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{p.brand} • {p.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">{p.category}</td>
                    <td className="p-3.5 font-bold text-slate-900">
                      ${p.price.toFixed(2)}
                      {p.discountPercentage > 0 && (
                        <span className="text-[10px] text-rose-600 ml-1">({p.discountPercentage}% off)</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className={`font-semibold ${p.stock <= 15 ? 'text-amber-600 font-bold' : 'text-slate-700'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-700">★ {p.rating} ({p.reviewCount})</td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => openEditProductModal(p)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        title="Edit product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT & STATUS UPDATE */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">
              Customer Orders Management ({orders.length})
            </h3>
          </div>

          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2 text-xs">
                  <div>
                    <span className="font-mono font-bold text-sm text-slate-900">#{order.orderNumber}</span>
                    <span className="text-slate-400 ml-2">
                      Placed on {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 text-sm">Total: ${order.total.toFixed(2)}</span>
                    <span className="text-slate-400 font-mono text-[11px]">• {order.paymentMethod}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 text-xs space-y-1">
                    <p className="font-bold text-slate-900">{order.shippingAddress.fullName}</p>
                    <p className="text-slate-500">{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                    <p className="text-slate-400 font-mono">Ph: {order.shippingAddress.mobile}</p>
                  </div>

                  <div className="md:col-span-4 text-xs">
                    <span className="font-bold text-slate-500 block mb-1">Items ({order.items.length}):</span>
                    <div className="space-y-1">
                      {order.items.map(it => (
                        <p key={it.id} className="text-slate-700 truncate">
                          • {it.quantity}x {it.product.name} ({it.selectedSize})
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Status Dropdown selector */}
                  <div className="md:col-span-4 flex items-center justify-end gap-2 text-xs">
                    <span className="font-bold text-slate-500">Update Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="Order Confirmed">Order Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">
              Warehouse & Stock Inventory
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(prod => (
              <div key={prod.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-14 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-slate-900 truncate">{prod.name}</h4>
                  <p className="text-slate-400 text-[11px]">{prod.category} • ${prod.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-slate-500">Stock:</span>
                    <input
                      type="number"
                      min={0}
                      value={prod.stock}
                      onChange={(e) => updateProduct({ ...prod, stock: Number(e.target.value) })}
                      className="w-16 px-2 py-1 rounded-lg border border-slate-200 font-bold text-slate-900"
                    />
                    <span className={`text-[10px] font-bold ${prod.stock <= 10 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {prod.stock <= 10 ? 'Low Stock!' : 'Optimal'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: COUPONS & DISCOUNTS */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Create Coupon form */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">Create New Promo Code</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH30"
                  value={newCouponCode}
                  onChange={e => setNewCouponCode(e.target.value)}
                  className="w-full px-3 py-2 uppercase font-mono rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount %</label>
                  <input
                    type="number"
                    min={5}
                    max={80}
                    value={newCouponPercent}
                    onChange={e => setNewCouponPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min Order ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={newCouponMin}
                    onChange={e => setNewCouponMin(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 30% off on all autumn apparel"
                  value={newCouponDesc}
                  onChange={e => setNewCouponDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
              >
                Create Coupon Code
              </button>
            </form>
          </div>

          {/* Active Coupons List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Active Coupons ({coupons.length})</h3>
            <div className="space-y-3">
              {coupons.map(c => (
                <div key={c.code} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-rose-600 text-sm">{c.code}</span>
                    <p className="text-xs text-slate-700 font-medium">{c.description}</p>
                    <span className="text-[11px] text-slate-400">
                      {c.discountPercent}% off • Min order ${c.minOrder}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteCoupon(c.code)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                    title="Delete coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingProduct ? 'Edit Product Garment' : 'Add New Garment to Catalog'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="py-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Silk Georgette Midi Dress"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={e => setFormBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {['Men', 'Women', 'Kids', 'Dresses', 'Shirts', 'T-Shirts', 'Jeans', 'Shoes', 'Accessories'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={formGender}
                    onChange={e => setFormGender(e.target.value as GenderType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {['Men', 'Women', 'Kids', 'Unisex'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formOriginalPrice}
                    onChange={e => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={e => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Material Details</label>
                <input
                  type="text"
                  value={formMaterial}
                  onChange={e => setFormMaterial(e.target.value)}
                  placeholder="e.g. 100% Supima Cotton"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
