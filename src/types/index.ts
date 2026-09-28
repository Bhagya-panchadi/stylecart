export type CategoryType = 
  | 'Men' 
  | 'Women' 
  | 'Kids' 
  | 'Dresses' 
  | 'Shirts' 
  | 'T-Shirts' 
  | 'Jeans' 
  | 'Shoes' 
  | 'Accessories';

export type GenderType = 'Men' | 'Women' | 'Kids' | 'Unisex';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  gender: GenderType;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  material: string;
  availableSizes: string[];
  colors: ProductColor[];
  stock: number;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isSpecialOffer?: boolean;
  createdAt: string;
  reviews?: Review[];
}

export interface CartItem {
  id: string; // unique item id (product id + size + color)
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export type OrderStatus = 'Order Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderTrackingStep {
  status: OrderStatus;
  date?: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: Address;
  deliveryOption: 'standard' | 'express';
  deliveryFee: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery';
  subtotal: number;
  couponDiscount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  estimatedDeliveryDate: string;
  trackingSteps: OrderTrackingStep[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrder: number;
  description: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  memberSince: string;
}
