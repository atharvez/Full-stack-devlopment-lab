import React, { useState, useEffect } from 'react';
import { Filter, Sparkles, Zap, ChevronRight, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../constants';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Pokémon TCG', 'Magic: The Gathering', 'Yu-Gi-Oh!'];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategories]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products';
      if (selectedCategories.length > 0) {
        url += `?category=${selectedCategories.join(',')}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <header className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <span className="font-label text-xs tracking-widest text-primary mb-4 block uppercase">The Obsidian Collection</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-6">
              Curated <span className="text-on-surface-variant/40">Artifacts.</span>
            </h1>
          </div>
          <div className="flex gap-4 mb-2">
            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2 border border-outline-variant/15">
              <Filter size={14} className="text-primary" />
              <span className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">Filter by Category</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-10 hidden lg:block">
          <div>
            <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Categories</h3>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary transition-all"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Rarity Scale</h3>
            <div className="space-y-3">
              <div className="bg-surface-container-high px-4 py-3 rounded-xl border border-outline-variant/10 flex justify-between items-center group cursor-pointer hover:bg-surface-container-highest transition-colors">
                <span className="font-label text-xs font-bold uppercase">Mythic Rare</span>
                <Sparkles size={16} className="text-tertiary" />
              </div>
              <div className="bg-surface-container-high px-4 py-3 rounded-xl border border-outline-variant/10 flex justify-between items-center group cursor-pointer hover:bg-surface-container-highest transition-colors">
                <span className="font-label text-xs font-bold uppercase">Holo Rare</span>
                <Zap size={16} className="text-secondary" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Price Range</h3>
            <div className="h-1 bg-surface-container-highest rounded-full relative">
              <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full ring-4 ring-background"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full ring-4 ring-background"></div>
            </div>
            <div className="flex justify-between mt-4 text-xs font-label font-bold text-on-surface-variant">
              <span>$50</span>
              <span>$5,000+</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.length > 0 ? (
                  products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-on-surface-variant">
                    No products found Matching your criteria.
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-16 flex justify-center gap-2">
                <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold">1</button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">2</button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">3</button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center">
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

