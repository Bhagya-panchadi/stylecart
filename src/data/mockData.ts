import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Tailored Linen-Blend Blazer',
    brand: 'Avenue Luxe',
    category: 'Men',
    gender: 'Men',
    price: 89.99,
    originalPrice: 129.99,
    discountPercentage: 30,
    rating: 4.8,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Impeccably tailored from breathable Italian linen-cotton blend. Designed with a structured shoulder, notch lapels, double back vent, and tortoiseshell buttons for year-round sophistication.',
    material: '55% Linen, 45% Organic Cotton; Lining: 100% Breathable Cupro',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sand Beige', hex: '#d2b48c' },
      { name: 'Navy Blue', hex: '#1e293b' },
      { name: 'Charcoal Grey', hex: '#374151' }
    ],
    stock: 24,
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-08-15T10:00:00Z',
    reviews: [
      {
        id: 'rev-1',
        userName: 'Marcus Sterling',
        rating: 5,
        date: '2026-09-12',
        title: 'Outstanding quality and cut',
        comment: 'The drape and fabric feel amazing. Fits true to size and looks far more expensive than it is.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        userName: 'Elena Rostova',
        rating: 4,
        date: '2026-09-01',
        title: 'Great fabric, sleeves a bit long',
        comment: 'Bought this for my partner. High quality linen weave. Highly recommend.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Silk Slip Midi Evening Dress',
    brand: 'Atelier Mode',
    category: 'Dresses',
    gender: 'Women',
    price: 119.50,
    originalPrice: 159.00,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cut on the bias for an effortless drape that gracefully contours the body. Features adjustable delicate straps, a cowl neckline, and a subtle side slit for modern elegance.',
    material: '100% Mulberry Silk Crepe de Chine',
    availableSizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Emerald', hex: '#065f46' },
      { name: 'Champagne Gold', hex: '#e2cb9b' },
      { name: 'Midnight Black', hex: '#09090b' }
    ],
    stock: 18,
    isFeatured: true,
    isNewArrival: true,
    createdAt: '2026-09-10T12:00:00Z',
    reviews: [
      {
        id: 'rev-3',
        userName: 'Sophia Taylor',
        rating: 5,
        date: '2026-09-20',
        title: 'Pure perfection!',
        comment: 'Wore this to a dinner gala and received so many compliments. Luxurious touch and sheen.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Classic Supima Cotton Oxford Shirt',
    brand: 'Oxford & Co.',
    category: 'Shirts',
    gender: 'Men',
    price: 49.00,
    originalPrice: 70.00,
    discountPercentage: 30,
    rating: 4.7,
    reviewCount: 230,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A timeless wardrobe foundation crafted from American-grown Supima cotton. Features an authentic button-down collar, chest pocket, and garment-washed finish for immediate softness.',
    material: '100% Long-staple Supima Cotton',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sky Blue', hex: '#7dd3fc' },
      { name: 'Crisp White', hex: '#f8fafc' },
      { name: 'Soft Pink', hex: '#fbcfe8' }
    ],
    stock: 45,
    isTrending: true,
    createdAt: '2026-07-20T08:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'High-Rise Vintage Straight Jeans',
    brand: 'Denim Foundry',
    category: 'Jeans',
    gender: 'Women',
    price: 74.99,
    originalPrice: 99.99,
    discountPercentage: 25,
    rating: 4.6,
    reviewCount: 184,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Inspired by iconic 90s vintage denim. Sits right at the natural waist with a flattering straight silhouette, rigid authentic feel with just 1% comfort stretch.',
    material: '99% Organic Cotton, 1% Elastane (13.5 oz Raw Denim)',
    availableSizes: ['26', '27', '28', '29', '30', '32'],
    colors: [
      { name: 'Vintage Washed Indigo', hex: '#3b82f6' },
      { name: 'Faded Black', hex: '#27272a' },
      { name: 'Ecru Off-White', hex: '#f5f5f4' }
    ],
    stock: 35,
    isFeatured: true,
    isSpecialOffer: true,
    createdAt: '2026-08-01T14:30:00Z'
  },
  {
    id: 'prod-5',
    name: 'Minimalist Heavyweight Crewneck T-Shirt',
    brand: 'Minimalist Club',
    category: 'T-Shirts',
    gender: 'Unisex',
    price: 29.99,
    originalPrice: 42.00,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Built from robust 260 GSM combed cotton. Retains its boxy drape without twisting or shrinking. Features a ribbed collar with twin-needle stitching for lasting shape.',
    material: '100% Combed Ring-Spun Cotton',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', hex: '#18181b' },
      { name: 'Optical White', hex: '#ffffff' },
      { name: 'Olive Green', hex: '#4d5b44' },
      { name: 'Heather Grey', hex: '#9ca3af' }
    ],
    stock: 80,
    isTrending: true,
    isNewArrival: true,
    createdAt: '2026-09-05T09:15:00Z'
  },
  {
    id: 'prod-6',
    name: 'Handcrafted Italian Suede Chelsea Boots',
    brand: 'Calzolaio',
    category: 'Shoes',
    gender: 'Men',
    price: 165.00,
    originalPrice: 220.00,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 77,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Artisanal Chelsea boots handcrafted in Tuscany using supple water-resistant calf suede. Blake-stitched leather sole with injected rubber grip for longevity and comfort.',
    material: 'Full-grain Italian Calf Suede, Leather Lining',
    availableSizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Cognac Brown', hex: '#9a3412' },
      { name: 'Dark Chocolate', hex: '#451a03' },
      { name: 'Charcoal Suede', hex: '#262626' }
    ],
    stock: 15,
    isFeatured: true,
    isSpecialOffer: true,
    createdAt: '2026-07-28T16:00:00Z'
  },
  {
    id: 'prod-7',
    name: 'Floral Chiffon Wrap Maxi Dress',
    brand: 'Flora & Fleur',
    category: 'Dresses',
    gender: 'Women',
    price: 79.00,
    originalPrice: 110.00,
    discountPercentage: 28,
    rating: 4.7,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An airy, romantic maxi dress in hand-painted botanical print. True wrap silhouette with self-tie waist, fluttering ruffled hemline, and billowy balloon sleeves.',
    material: '100% Recycled Poly Chiffon; Lined with soft rayon',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Rose Petal', hex: '#fda4af' },
      { name: 'Sage Floral', hex: '#a7f3d0' }
    ],
    stock: 22,
    isNewArrival: true,
    isTrending: true,
    createdAt: '2026-09-08T11:20:00Z'
  },
  {
    id: 'prod-8',
    name: 'Structured Leather Crossbody Bag',
    brand: 'Maison Cuir',
    category: 'Accessories',
    gender: 'Women',
    price: 135.00,
    originalPrice: 180.00,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A sculptural camera silhouette crafted from vegetable-tanned grain leather with polished gold-tone hardware. Includes detachable strap and magnetic flap closure.',
    material: '100% Genuine Full-grain Cowhide Leather',
    availableSizes: ['One Size'],
    colors: [
      { name: 'Tan Brown', hex: '#b45309' },
      { name: 'Noir Black', hex: '#111827' },
      { name: 'Burgundy', hex: '#881337' }
    ],
    stock: 14,
    isFeatured: true,
    createdAt: '2026-08-19T13:40:00Z'
  },
  {
    id: 'prod-9',
    name: 'Kids Organic Cotton Stripe Dungarees',
    brand: 'Little Sprout',
    category: 'Kids',
    gender: 'Kids',
    price: 36.00,
    originalPrice: 48.00,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Super soft and durable dungarees crafted from GOTS-certified organic cotton twill. Adjustable straps with metal clips and snap bottoms for easy changes.',
    material: '100% GOTS Certified Organic Cotton Twill',
    availableSizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: [
      { name: 'Ocean Navy Stripe', hex: '#1e3a8a' },
      { name: 'Mustard Yellow', hex: '#eab308' }
    ],
    stock: 30,
    isNewArrival: true,
    createdAt: '2026-09-02T15:10:00Z'
  },
  {
    id: 'prod-10',
    name: 'Relaxed Fit Camp Collar Linen Shirt',
    brand: 'Coastline Studio',
    category: 'Shirts',
    gender: 'Men',
    price: 52.00,
    originalPrice: 65.00,
    discountPercentage: 20,
    rating: 4.6,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1588731234159-8b9963143fca?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The definitive warm-weather shirt. Features an open Cuban collar, relaxed dropped shoulders, and natural mother-of-pearl buttons in pure enzyme-washed linen.',
    material: '100% French Flax Linen',
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracotta', hex: '#c2410c' },
      { name: 'Sage Green', hex: '#65a30d' },
      { name: 'Natural Sand', hex: '#fef08a' }
    ],
    stock: 28,
    isSpecialOffer: true,
    createdAt: '2026-08-11T11:00:00Z'
  },
  {
    id: 'prod-11',
    name: 'Cashmere-Wool Blend Wrap Coat',
    brand: 'Avenue Luxe',
    category: 'Women',
    gender: 'Women',
    price: 245.00,
    originalPrice: 350.00,
    discountPercentage: 30,
    rating: 5.0,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An iconic silhouette tailored from rich double-faced wool and Mongolian cashmere. Wide exaggerated collar, matching tie belt, and deep welt pockets.',
    material: '90% Virgin Wool, 10% Cashmere',
    availableSizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel Tan', hex: '#d97706' },
      { name: 'Oatmeal', hex: '#e2e8f0' },
      { name: 'Midnight Black', hex: '#000000' }
    ],
    stock: 12,
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-09-14T08:30:00Z'
  },
  {
    id: 'prod-12',
    name: 'Retro White Leather Court Sneakers',
    brand: 'Calzolaio',
    category: 'Shoes',
    gender: 'Unisex',
    price: 95.00,
    originalPrice: 120.00,
    discountPercentage: 21,
    rating: 4.8,
    reviewCount: 167,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Clean tennis court aesthetic with premium nappa leather uppers, cushioned OrthoLite insole, and flexible vulcanized gum rubber outsole.',
    material: 'Full-Grain Nappa Leather, Recycled Rubber Sole',
    availableSizes: ['6', '7', '8', '9', '10', '11'],
    colors: [
      { name: 'Chalk White / Green', hex: '#15803d' },
      { name: 'All White', hex: '#ffffff' },
      { name: 'White / Navy', hex: '#1e3a8a' }
    ],
    stock: 40,
    isTrending: true,
    createdAt: '2026-08-25T14:00:00Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'STYLE20',
    discountPercent: 20,
    maxDiscount: 50,
    minOrder: 50,
    description: '20% off on orders over $50'
  },
  {
    code: 'FASHION10',
    discountPercent: 10,
    minOrder: 30,
    description: '10% off on all items'
  },
  {
    code: 'VIP30',
    discountPercent: 30,
    maxDiscount: 100,
    minOrder: 150,
    description: 'Exclusive 30% off for fashion enthusiasts on $150+'
  }
];

export const CATEGORIES_LIST = [
  { id: 'All', label: 'All Collection', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80' },
  { id: 'Men', label: 'Men', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
  { id: 'Women', label: 'Women', image: 'https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=600&q=80' },
  { id: 'Kids', label: 'Kids', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80' },
  { id: 'Dresses', label: 'Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80' },
  { id: 'Shirts', label: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80' },
  { id: 'T-Shirts', label: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80' },
  { id: 'Jeans', label: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80' },
  { id: 'Shoes', label: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80' },
  { id: 'Accessories', label: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80' },
];
