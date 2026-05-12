import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { IoArrowForward, IoCafeOutline, IoLeafOutline, IoSparklesOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden rounded-[3rem] my-8 mx-4 md:mx-0 shadow-2xl">
      {/* Background with subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#a68a6d 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      </div>

      {/* Decorative Floating Icons */}
      <Motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 text-coffee-400/20 hidden lg:block"
      >
        <IoCafeOutline size={120} />
      </Motion.div>
      <Motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 text-coffee-400/20 hidden lg:block"
      >
        <IoLeafOutline size={100} />
      </Motion.div>

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-coffee-400/50"></span>
            <p className="text-coffee-300 font-serif italic tracking-[0.3em] text-xs md:text-sm uppercase">
              Established 2024
            </p>
            <span className="h-px w-8 bg-coffee-400/50"></span>
          </div>

          <h1 className="text-5xl md:text-8xl font-serif font-black text-coffee-50 leading-[1.1] tracking-tight">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-300 to-coffee-100 italic font-light">
              Coffee Ritual
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-coffee-200/80 leading-relaxed font-light">
            Step into a sanctuary of flavor. We blend artisanal craft with 
            unmatched comfort to serve you more than just a meal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <Link
              to="/menu"
              className="group relative flex items-center gap-3 px-10 py-5 bg-coffee-400 text-coffee-900 rounded-full text-sm font-black uppercase tracking-widest overflow-hidden transition-all hover:bg-coffee-300"
            >
              <span className="relative z-10">Explore Menu</span>
              <IoArrowForward className="relative z-10 transition-transform group-hover:translate-x-1" size={18} />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            
            <button
              className="px-10 py-5 bg-transparent border border-coffee-700 text-coffee-50 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:border-coffee-300 hover:bg-white/5"
            >
              Our Story
            </button>
          </div>

          <div className="pt-16 flex items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-2xl bg-coffee-800/50 border border-coffee-700/50 text-coffee-300">
                <IoSparklesOutline size={24} />
              </div>
              <span className="text-[10px] text-coffee-400 uppercase tracking-widest font-bold">Premium Quality</span>
            </div>
            <div className="w-px h-8 bg-coffee-800"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-2xl bg-coffee-800/50 border border-coffee-700/50 text-coffee-300">
                <IoCafeOutline size={24} />
              </div>
              <span className="text-[10px] text-coffee-400 uppercase tracking-widest font-bold">Artisan Brew</span>
            </div>
          </div>
        </Motion.div>
      </div>
      
      {/* Decorative gradient blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-coffee-400/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-coffee-300/10 rounded-full blur-[100px]"></div>
    </div>
  );
}
