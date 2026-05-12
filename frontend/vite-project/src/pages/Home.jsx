import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 py-20 text-center bg-gradient-to-b from-coffee-900 to-coffee-800 rounded-[3rem] shadow-2xl">
      <div className="space-y-6 max-w-2xl px-6">
        <p className="text-coffee-300 font-bold uppercase tracking-[0.4em] text-xs">Experience Perfection</p>
        <h1 className="text-5xl md:text-7xl font-serif font-black text-coffee-50 leading-tight">
          Welcome to <span className="text-coffee-400">Safeland Café</span>
        </h1>
        <p className="text-lg md:text-xl text-coffee-200 leading-relaxed font-medium">
          Freshly roasted beans, artisanal pastries, and a warm atmosphere 
          crafted specifically for your comfort and delight.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        <Link
          to="/menu"
          className="px-10 py-5 bg-coffee-400 text-coffee-900 rounded-full text-sm font-black uppercase tracking-widest shadow-2xl shadow-coffee-400/20 transition-all hover:bg-coffee-300 hover:-translate-y-1 active:translate-y-0"
        >
          Explore Menu
        </Link>
        <button
          className="px-10 py-5 bg-transparent border-2 border-coffee-700 text-coffee-50 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:border-coffee-400"
        >
          Our Story
        </button>
      </div>
      
      <div className="mt-12 flex items-center gap-8 opacity-20">
        <div className="w-12 h-12 bg-coffee-300 rounded-full"></div>
        <div className="w-12 h-12 bg-coffee-400 rounded-full"></div>
        <div className="w-12 h-12 bg-coffee-500 rounded-full"></div>
      </div>
    </div>
  );
}
