import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { productsAPI, eventAPI } from '../services/api';
import { Search, SlidersHorizontal, Zap, Shield, HelpCircle, HardDrive, RefreshCw } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowroomData = async () => {
      try {
        const prodRes = await productsAPI.getAll();
        setProducts(prodRes.data);

        const eventRes = await eventAPI.getActive();
        setEvent(eventRes.data);
      } catch (error) {
        console.error('Failed to load showroom data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShowroomData();
  }, []);

  const handleReserve = (productId) => {
    navigate(`/register?product=${productId}`);
  };

  // Filter products based on search term and selected capacity
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCapacity = 
      selectedCapacity === 'all' || 
      (selectedCapacity === '2' && prod.kw_capacity <= 2) ||
      (selectedCapacity === '5' && prod.kw_capacity > 2 && prod.kw_capacity <= 5) ||
      (selectedCapacity === '10' && prod.kw_capacity > 5);
    
    return matchesSearch && matchesCapacity;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#00f2fe] border-r-transparent border-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030303] pt-28 pb-20 overflow-hidden">
      
      {/* Decorative background graphics */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-slate-100 mb-4 tracking-wider">
            SHOWROOM SHOWCASE
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Browse our Vortex Series of commercial-grade zero-point magnetic electricity generators. Secure early priority bookings.
          </p>
        </div>

        {/* --- Search & Filtering Controllers --- */}
        <div className="glass-panel border border-slate-800/80 rounded-xl p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search generator models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
            />
          </div>

          {/* Capacity Filters */}
          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto py-1 scroll-none">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <button
              onClick={() => setSelectedCapacity('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-orbitron font-semibold shrink-0 transition-colors ${selectedCapacity === 'all' ? 'bg-[#00f2fe] text-slate-900 glow-shadow-cyan' : 'border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              ALL CAPACITIES
            </button>
            <button
              onClick={() => setSelectedCapacity('2')}
              className={`px-4 py-1.5 rounded-full text-xs font-orbitron font-semibold shrink-0 transition-colors ${selectedCapacity === '2' ? 'bg-[#00f2fe] text-slate-900 glow-shadow-cyan' : 'border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              2KW MODEL
            </button>
            <button
              onClick={() => setSelectedCapacity('5')}
              className={`px-4 py-1.5 rounded-full text-xs font-orbitron font-semibold shrink-0 transition-colors ${selectedCapacity === '5' ? 'bg-[#00f2fe] text-slate-900 glow-shadow-cyan' : 'border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              5KW MODEL
            </button>
            <button
              onClick={() => setSelectedCapacity('10')}
              className={`px-4 py-1.5 rounded-full text-xs font-orbitron font-semibold shrink-0 transition-colors ${selectedCapacity === '10' ? 'bg-[#00f2fe] text-slate-900 glow-shadow-cyan' : 'border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              10KW+ MODEL
            </button>
          </div>
        </div>

        {/* --- Product Grid Catalog --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="glass-panel border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
            >
              {/* Product Badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-[#030303]/85 border border-[#00f2fe]/40 font-orbitron text-[10px] font-bold tracking-widest text-[#00f2fe] text-glow-cyan flex items-center space-x-1">
                <Zap className="w-3 h-3 fill-cyan-400 animate-pulse" />
                <span>{prod.kw_capacity} KW</span>
              </div>

              {/* Product Photo */}
              <div className="relative h-48 bg-slate-900 overflow-hidden border-b border-slate-800/80">
                <img
                  src={prod.image_url}
                  alt={prod.name}
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-transparent to-transparent"></div>
              </div>

              {/* Product details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-orbitron font-bold text-lg text-slate-200 tracking-wide mb-2">{prod.name}</h3>
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-xl font-orbitron font-extrabold text-green-400">Rs. {parseFloat(prod.price).toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 font-medium">LAUNCH PREORDER BOOKING FEE</span>
                  </div>

                  {/* Highlights benefits */}
                  <ul className="space-y-2 mb-6 text-xs text-slate-400">
                    {prod.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800/50">
                  <button
                    onClick={() => setSelectedProductDetails(prod)}
                    className="w-full py-2 bg-slate-900 border border-slate-800 rounded font-orbitron text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center space-x-1"
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>TECHNICAL SPECIFICATIONS</span>
                  </button>

                  <button
                    onClick={() => handleReserve(prod.id)}
                    className="w-full btn-cyber py-2.5 rounded text-xs"
                  >
                    RESERVE CLEARANCE PASS
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Empty State --- */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl glass-panel">
            <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="font-orbitron text-base text-slate-300 mb-2">NO GENERATOR MODELS FOUND</h3>
            <p className="text-xs text-slate-500">Try modifying your search queries or capacity filter toggles.</p>
          </div>
        )}

      </div>

      {/* --- Technical Specification Modal Overlay --- */}
      <AnimatePresence>
        {selectedProductDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductDetails(null)}
              className="absolute inset-0 bg-[#030303]/85 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              {/* Glowing decorative frame */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent"></div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-orbitron font-extrabold text-xl text-[#00f2fe] tracking-wide text-glow-cyan">
                    {selectedProductDetails.name} Technical Schema
                  </h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Zero-Point Mechanical Blueprints</p>
                </div>
                <button
                  onClick={() => setSelectedProductDetails(null)}
                  className="p-1 rounded hover:bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Grid of specs */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 text-xs">
                {Object.entries(selectedProductDetails.specifications).map(([key, val]) => (
                  <div key={key} className="p-3 bg-slate-900/50 border border-slate-800/80 rounded-lg">
                    <span className="text-slate-500 font-orbitron block capitalize mb-1">{key.replace('_', ' ')}</span>
                    <span className="text-slate-200 font-semibold">{val}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800/60">
                <button
                  onClick={() => setSelectedProductDetails(null)}
                  className="w-full py-2.5 rounded font-orbitron border border-slate-700 bg-slate-900/20 text-slate-400 hover:text-white transition-all text-xs"
                >
                  DISMISS CORE BLUEPRINTS
                </button>
                <button
                  onClick={() => {
                    const id = selectedProductDetails.id;
                    setSelectedProductDetails(null);
                    handleReserve(id);
                  }}
                  className="w-full btn-cyber py-2.5 rounded text-xs"
                >
                  BOOK CLEARANCE PASS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Products;
