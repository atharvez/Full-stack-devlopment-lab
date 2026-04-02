import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant/20">
              <span className="text-xs font-label font-bold tracking-widest text-primary uppercase">Elite Collector's Circle</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-headline tracking-tighter leading-[0.9] text-glow">
              Buy Rare <br/>
              <span className="text-primary italic">Trading Cards</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl font-medium">
              Pokémon, Yu-Gi-Oh, Magic The Gathering. Discover authentic artifacts from the world's most prestigious collections.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-br from-primary to-primary-dim text-on-primary font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20">
                Shop Now
              </button>
              <button className="px-8 py-4 rounded-xl bg-transparent border border-outline-variant/20 text-on-surface font-bold text-lg hover:bg-surface-bright transition-all duration-300">
                View Gallery
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            {/* Asymmetric Hero Image Display */}
            <div className="relative transform hover:rotate-3 transition-transform duration-700">
              <div className="w-full aspect-[3/4] bg-surface-container-high rounded-3xl overflow-hidden shadow-2xl relative border border-outline-variant/10">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK996dkspg65GwIoDO-UP1wv_MZ4StUHDI_NADfEu1gSt2n-6qfs5_yfnhbblJhIdw3lAsDy1soC1hcdShaDJXRbYBpwcy3Fu-4EvTRI-VXgPldn_usaKpRGLmh0n42WbKLi_e6ybB2Llmw_Gxkj9l_F4U9zfRdzys31s4DKO0YyYkocwr19jW3AV4qZOwXW_Q8vOaRV_q7Tw2P2Iv_SbCCwUIcF1DtHQrYi3vBOSiR7opWL21BT4D1-p92w4w1u2SRzD2O0wtwr0"
                  referrerPolicy="no-referrer"
                  alt="Ultra Rare Card"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>
              <motion.div 
                initial={{ y: 20, rotate: -15 }}
                animate={{ y: 0, rotate: -12 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 w-48 h-64 bg-surface-container-highest rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10 transform"
              >
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcPLVd1jXOIdyaqieY4VuZtyj2d7PVSi5C2pQTVpFFMFdH2fdD38oH_nMUKwtfU--_nKB4SSdLOnoDx-KastzRyaC1hP9AAHvxQMAyvsbvwrdMl2Q5uZRKWeqyHTtl5Ups1iZcIMNg9ML4HnMNc54vlMbalzK_jooDLPulaVSLS_6MCfjq00DJIg3P09T4LB3f5i4yWuafT4_B6bvRsQrT6xSwh8Y_wtBTgmcBAZzAT9gZLTpOSaRS3720X8FlY1QJijLrSDo0iZ8"
                  referrerPolicy="no-referrer"
                  alt="Vintage Card"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-surface-container-low relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-black font-headline tracking-tighter">Featured Artifacts</h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 rounded-full bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary transition-all">
                <ChevronLeft size={24} />
              </button>
              <button className="p-3 rounded-full bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Bento Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 md:row-span-2 bg-surface-container-high rounded-3xl p-10 relative overflow-hidden group">
            <div className="relative z-10 h-full flex flex-col justify-end">
              <span className="font-label font-bold text-primary tracking-widest mb-2 uppercase">The Legendaries</span>
              <h3 className="text-4xl font-black font-headline mb-4">Pokémon TCG</h3>
              <p className="text-on-surface-variant max-w-xs mb-6">Explore the highest graded Pokémon cards in existence, from Base Set to the latest expansions.</p>
              <Link to="/shop" className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                Browse Collection <ArrowRight size={20} />
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-2/3 h-full opacity-30 group-hover:opacity-50 transition-opacity">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADd3opFXP-TZcuu-CJ302T_fhJb2AkjQPfurE2qd0nKOAdkPek06ihTKtdp6V2PWEgy_efAqu28mYUUMfE13iBohAX9vfmB9n3JZAy1pcGn_PVKjtP_pifB3lH05teIjd9o8ZPvI-WEBuYvFDvxeRK_SlT6HLExuLNefxwaa-FQT_WX5PAzKg1DCi0o0KbVmC29e4HVHAL0F3ohOmeT0WAZMb8BpOTtJXPZ5p6uT0K_RVm3D1pDXyy9EOQlLkGQqxHB8Ijswi_Les"
                referrerPolicy="no-referrer"
                alt="Pokemon Collection"
              />
            </div>
          </div>
          
          <div className="md:col-span-2 bg-surface-container-high rounded-3xl p-8 relative overflow-hidden group min-h-[240px]">
            <div className="relative z-10 flex flex-col justify-center h-full">
              <h3 className="text-3xl font-black font-headline mb-2">Yu-Gi-Oh!</h3>
              <p className="text-on-surface-variant max-w-xs mb-4">Duel Monsters in their rarest physical forms.</p>
              <Link to="/shop" className="text-primary font-bold inline-flex items-center gap-2">View More</Link>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 blur-[60px]"></div>
          </div>
          
          <div className="md:col-span-2 bg-surface-container-high rounded-3xl p-8 relative overflow-hidden group min-h-[240px]">
            <div className="relative z-10 flex flex-col justify-center h-full">
              <h3 className="text-3xl font-black font-headline mb-2">Magic The Gathering</h3>
              <p className="text-on-surface-variant max-w-xs mb-4">Power Nine and legendary artifacts from the Multiverse.</p>
              <Link to="/shop" className="text-primary font-bold inline-flex items-center gap-2">Explore MTG</Link>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tertiary/20 blur-[60px]"></div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { icon: 'verified', title: '100% Authentic', desc: 'Guaranteed verification by expert graders.' },
            { icon: 'encrypted', title: 'Secure Vault', desc: 'Your assets stored in high-security facilities.' },
            { icon: 'local_shipping', title: 'Insured Shipping', desc: 'Fully covered global delivery with tracking.' },
            { icon: 'support_agent', title: 'VIP Support', desc: 'Dedicated concierge for high-value collectors.' }
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-4">
              <span className="material-symbols-outlined text-4xl text-primary">{item.icon}</span>
              <h4 className="font-bold font-headline">{item.title}</h4>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
