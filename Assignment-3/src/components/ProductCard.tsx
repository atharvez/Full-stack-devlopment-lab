import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product } from '../constants';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group bg-surface-container-high rounded-xl p-4 transition-all duration-300 ambient-glow border border-transparent hover:border-primary/10",
        className
      )}
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black mb-6">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {product.tag && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-neutral-900/80 backdrop-blur-md rounded-full">
            <span className="text-[10px] font-label font-extrabold tracking-widest text-primary uppercase">
              {product.tag}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-on-surface line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-primary font-headline font-black text-xl">
            ${product.price.toLocaleString()}
          </p>
          <button className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
