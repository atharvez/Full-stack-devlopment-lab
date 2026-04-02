import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Verified, Truck, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const relatedProducts = PRODUCTS.filter(p => p.id !== id).slice(0, 4);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2">
        <Link to="/shop" className="text-on-surface-variant flex items-center gap-2 hover:text-primary transition-colors">
          <ArrowLeft size={14} />
          <span className="font-label text-xs tracking-widest uppercase">Back to Catalog</span>
        </Link>
      </div>

      {/* Product Gallery & Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Product Image Section */}
        <div className="lg:col-span-7 relative group">
          <div className="absolute inset-0 bg-primary/5 -z-10 rounded-full blur-3xl"></div>
          <div className="bg-surface-container-high rounded-[2rem] p-8 lg:p-12 overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-primary/5">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain rounded-xl transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Info Chips */}
          <div className="absolute -bottom-4 -right-4 flex flex-col gap-3">
            <div className="bg-surface-container-highest px-4 py-2 rounded-full border border-outline-variant/20 shadow-lg backdrop-blur-md">
              <span className="font-label text-[10px] tracking-widest uppercase text-tertiary">MINT CONDITION 10.0</span>
            </div>
            <div className="bg-surface-container-highest px-4 py-2 rounded-full border border-outline-variant/20 shadow-lg backdrop-blur-md">
              <span className="font-label text-[10px] tracking-widest uppercase text-secondary">HOLOFoil SERIES</span>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="space-y-4">
            <span className="font-label text-xs tracking-[0.2em] text-primary uppercase">Artifact Collection</span>
            <h1 className="text-5xl lg:text-6xl font-headline font-extrabold tracking-tight text-on-surface leading-tight">
              {product.name}
            </h1>
          </div>
          
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-headline font-bold text-on-surface">${product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-lg text-on-surface-variant line-through font-medium opacity-50">${product.oldPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/10">
            <h3 className="font-label text-xs tracking-widest uppercase text-on-surface-variant mb-3">Item Description</h3>
            <p className="text-on-surface-variant leading-relaxed font-body text-sm">
              {product.description || "Witness the absolute pinnacle of card artistry. This rare variant features a triple-etched holographic surface that shifts from deep void-purple to solar-neon. Recovered from the 2024 Obsidian Gallery vaults, this piece stands as a testament to rare artifact preservation."}
            </p>
          </div>

          {/* Attributes Bento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container rounded-xl p-4 transition-colors hover:bg-surface-container-high">
              <span className="font-label text-[10px] text-on-surface-variant uppercase block mb-1">Authenticity</span>
              <span className="font-headline font-semibold text-on-surface">CGC Certified</span>
            </div>
            <div className="bg-surface-container rounded-xl p-4 transition-colors hover:bg-surface-container-high">
              <span className="font-label text-[10px] text-on-surface-variant uppercase block mb-1">Rarity</span>
              <span className="font-headline font-semibold text-tertiary">{product.rarity}</span>
            </div>
          </div>

          {/* Primary CTA */}
          <button className="w-full py-5 bg-gradient-to-br from-primary to-primary-dim text-on-primary font-headline font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(186,158,255,0.3)] active:scale-95 flex items-center justify-center gap-3">
            <ShoppingBag size={20} />
            Add to Collection
          </button>

          <div className="flex items-center justify-between px-2 text-on-surface-variant">
            <div className="flex items-center gap-2">
              <Verified size={16} className="text-secondary" />
              <span className="font-label text-[10px] uppercase tracking-wider">Secure Escrow Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-secondary" />
              <span className="font-label text-[10px] uppercase tracking-wider">Vault Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-40">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <span className="font-label text-xs tracking-widest text-secondary uppercase">Expand your gallery</span>
            <h2 className="text-4xl font-headline font-bold tracking-tight">Related Artifacts</h2>
          </div>
          <Link to="/shop" className="text-primary hover:text-primary-dim transition-colors flex items-center gap-2 font-label text-xs uppercase tracking-widest">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
