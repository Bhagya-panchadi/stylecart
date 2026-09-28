import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart 
} from 'lucide-react';

interface FooterProps {
  onNavigateToShop: (cat?: string) => void;
  onNavigateToView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToShop,
  onNavigateToView,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-bold text-base">
                S
              </div>
              <span className="text-xl font-serif-luxury font-bold text-white tracking-tight">
                Style<span className="text-rose-500">Cart</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              StyleCart is a modern luxury clothing destination delivering refined ready-to-wear silhouettes, organic fabrics, and bespoke tailoring designed for timeless aesthetics.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="p-2 rounded-full bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateToShop('Women')} className="hover:text-white transition-colors">
                  Women's Atelier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToShop('Men')} className="hover:text-white transition-colors">
                  Men's Sartorial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToShop('Kids')} className="hover:text-white transition-colors">
                  Kids & Juniors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToShop('Dresses')} className="hover:text-white transition-colors">
                  Silk & Evening Dresses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToShop('Shoes')} className="hover:text-white transition-colors">
                  Footwear & Boots
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToShop('Accessories')} className="hover:text-white transition-colors">
                  Leather Goods & Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Customer Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateToView('tracking')} className="hover:text-white transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToView('account')} className="hover:text-white transition-colors">
                  My Profile & Orders
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToView('wishlist')} className="hover:text-white transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white">Shipping & Returns</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white">Size Chart & Fit Guide</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white">Ethical Sustainability</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Privilege Newsletter
            </h4>
            <p className="text-slate-400 text-xs">
              Receive private invitations to preview sales, new collection drops, and style editorials.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your.email@domain.com"
                className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 flex-1 focus:outline-hidden focus:border-rose-500"
              />
              <button 
                onClick={() => alert('Thank you for subscribing to StyleCart previews!')}
                className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Join
              </button>
            </div>
            <p className="text-[10px] text-slate-500">Zero spam. Unsubscribe at any time.</p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} StyleCart Luxury Pret & Couture Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Certifications</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
