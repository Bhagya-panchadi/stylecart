import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Address, Coupon, UserProfile, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/mockData';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // product IDs
  orders: Order[];
  addresses: Address[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  activeOrder: Order | null;
  recentlyViewed: string[]; // product IDs
  userProfile: UserProfile;
  isAdmin: boolean;
  
  // Cart Actions
  addToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string, size?: string) => void;

  // Order Actions
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingSteps'>) => Order;
  cancelOrder: (orderId: string) => void;
  setActiveOrder: (order: Order | null) => void;

  // Address Actions
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Product Views
  recordProductView: (productId: string) => void;
  addProductReview: (productId: string, review: { userName: string; rating: number; title: string; comment: string }) => void;

  // Admin Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  toggleAdminMode: () => void;
  
  // Calculations
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  PRODUCTS: 'stylecart_products_v1',
  CART: 'stylecart_cart_v1',
  WISHLIST: 'stylecart_wishlist_v1',
  ORDERS: 'stylecart_orders_v1',
  ADDRESSES: 'stylecart_addresses_v1',
  COUPONS: 'stylecart_coupons_v1',
  RECENT: 'stylecart_recent_v1',
  PROFILE: 'stylecart_profile_v1',
  IS_ADMIN: 'stylecart_is_admin_v1',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr-1',
  fullName: 'Bhagyalakshmi Panchadi',
  email: 'panchadibhagyalakshmi@gmail.com',
  phone: '+1 (555) 349-8201',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  memberSince: 'July 2024'
};

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Bhagyalakshmi Panchadi',
    mobile: '+1 (555) 349-8201',
    street: '742 Evergreen Terrace, Apt 4B',
    landmark: 'Near Spring Park',
    city: 'San Francisco',
    state: 'California',
    pincode: '94107',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'Bhagyalakshmi Panchadi (Office)',
    mobile: '+1 (555) 349-8201',
    street: '500 Howard Street, Suite 1200',
    landmark: 'Next to Salesforce Tower',
    city: 'San Francisco',
    state: 'California',
    pincode: '94105',
    isDefault: false,
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-2', 'prod-6'];
    } catch {
      return ['prod-2', 'prod-6'];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }

    // Default seeded sample order
    return [
      {
        id: 'ord-1001',
        orderNumber: 'SC-892401',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        items: [
          {
            id: 'prod-1-M-#d2b48c',
            productId: 'prod-1',
            product: INITIAL_PRODUCTS[0],
            selectedSize: 'M',
            selectedColor: { name: 'Sand Beige', hex: '#d2b48c' },
            quantity: 1
          }
        ],
        shippingAddress: DEFAULT_ADDRESSES[0],
        deliveryOption: 'standard',
        deliveryFee: 0,
        paymentMethod: 'UPI',
        subtotal: 89.99,
        couponDiscount: 10,
        couponCode: 'FASHION10',
        total: 79.99,
        status: 'Out for Delivery',
        estimatedDeliveryDate: 'Tomorrow by 7:00 PM',
        trackingSteps: [
          { status: 'Order Confirmed', date: 'Sept 26, 10:15 AM', description: 'Order verified and confirmed', completed: true },
          { status: 'Processing', date: 'Sept 26, 04:30 PM', description: 'Item picked and quality inspected', completed: true },
          { status: 'Shipped', date: 'Sept 27, 09:00 AM', description: 'Handed over to Express Courier (Track #TRK9921)', completed: true },
          { status: 'Out for Delivery', date: 'Today, 08:30 AM', description: 'Courier partner is en route to destination', completed: true, current: true },
          { status: 'Delivered', description: 'Package handed to recipient', completed: false }
        ]
      }
    ];
  });

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-2', 'prod-4'];
    } catch {
      return ['prod-1', 'prod-2', 'prod-4'];
    }
  });

  // User Profile
  const [userProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Admin Mode
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IS_ADMIN);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN, String(isAdmin));
  }, [isAdmin]);

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    const rawDiscount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
    cartDiscount = appliedCoupon.maxDiscount ? Math.min(rawDiscount, appliedCoupon.maxDiscount) : rawDiscount;
  }
  
  const cartDeliveryFee = cartSubtotal > 100 || cartSubtotal === 0 ? 0 : 9.99;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cart actions
  const addToCart = (product: Product, size: string, color: { name: string; hex: string }, quantity = 1) => {
    setCart(prev => {
      const itemId = `${product.id}-${size}-${color.hex}`;
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, {
        id: itemId,
        productId: product.id,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity
      }];
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === trimmed);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Please check and try again.' };
    }
    if (cartSubtotal < found.minOrder) {
      return { success: false, message: `Minimum order value of $${found.minOrder} required for code ${trimmed}.` };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied! You saved ${found.discountPercent}%!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (productId: string, size?: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const chosenSize = size || prod.availableSizes[0] || 'M';
    const chosenColor = prod.colors[0] || { name: 'Default', hex: '#000000' };
    addToCart(prod, chosenSize, chosenColor, 1);
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  // Order actions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingSteps'>): Order => {
    const orderNum = `SC-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: now.toISOString(),
      status: 'Order Confirmed',
      trackingSteps: [
        {
          status: 'Order Confirmed',
          date: 'Just now',
          description: 'Payment successful, order confirmed.',
          completed: true,
          current: true
        },
        {
          status: 'Processing',
          description: 'Items will be packed with care at fulfillment center.',
          completed: false
        },
        {
          status: 'Shipped',
          description: 'Handover to priority delivery courier.',
          completed: false
        },
        {
          status: 'Out for Delivery',
          description: 'Courier agent will deliver to doorstep.',
          completed: false
        },
        {
          status: 'Delivered',
          description: 'Package delivered.',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    // Decrease stock in products
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const matchingCartItems = orderData.items.filter(item => item.productId === p.id);
        if (matchingCartItems.length > 0) {
          const totalBought = matchingCartItems.reduce((sum, item) => sum + item.quantity, 0);
          return { ...p, stock: Math.max(0, p.stock - totalBought) };
        }
        return p;
      })
    );

    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId && o.status !== 'Delivered') {
        return {
          ...o,
          status: 'Cancelled',
          trackingSteps: [
            ...o.trackingSteps,
            { status: 'Cancelled', date: 'Just now', description: 'Order cancelled by customer.', completed: true, current: true }
          ]
        };
      }
      return o;
    }));
  };

  // Address actions
  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddr: Address = { ...address, id: `addr-${Date.now()}` };
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }
  };

  const updateAddress = (updated: Address) => {
    setAddresses(prev => prev.map(a => {
      if (a.id === updated.id) return updated;
      if (updated.isDefault) return { ...a, isDefault: false };
      return a;
    }));
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  // Recent view
  const recordProductView = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  const addProductReview = (productId: string, reviewData: { userName: string; rating: number; title: string; comment: string }) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      userName: reviewData.userName,
      rating: reviewData.rating,
      date: new Date().toISOString().split('T')[0],
      title: reviewData.title,
      comment: reviewData.comment,
      verifiedPurchase: true
    };

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const existingReviews = p.reviews || [];
        const updatedReviews = [newRev, ...existingReviews];
        const newAvgRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        return {
          ...p,
          rating: newAvgRating,
          reviewCount: (p.reviewCount || 0) + 1,
          reviews: updatedReviews
        };
      }
      return p;
    }));
  };

  // Admin Actions
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewCount: 0,
      reviews: []
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const stepOrder: OrderStatus[] = ['Order Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
        const targetIdx = stepOrder.indexOf(status);

        const updatedSteps = o.trackingSteps.map(step => {
          const stepIdx = stepOrder.indexOf(step.status);
          if (stepIdx === -1) return step;
          return {
            ...step,
            completed: stepIdx <= targetIdx,
            current: stepIdx === targetIdx,
            date: stepIdx <= targetIdx ? (step.date || 'Updated recently') : undefined
          };
        });

        return { ...o, status, trackingSteps: updatedSteps };
      }
      return o;
    }));
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prev => [...prev.filter(c => c.code !== newCoupon.code.toUpperCase()), { ...newCoupon, code: newCoupon.code.toUpperCase() }]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  const toggleAdminMode = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        addresses,
        coupons,
        appliedCoupon,
        activeOrder,
        recentlyViewed,
        userProfile,
        isAdmin,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        createOrder,
        cancelOrder,
        setActiveOrder,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        recordProductView,
        addProductReview,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addCoupon,
        deleteCoupon,
        toggleAdminMode,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
