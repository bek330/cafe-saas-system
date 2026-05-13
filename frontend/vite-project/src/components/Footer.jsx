import { Link } from "react-router-dom";
import { 
  IoCafeOutline, 
  IoLocationOutline, 
  IoLogoInstagram, 
  IoLogoFacebook, 
  IoCallOutline, 
  IoMailOutline,
  IoTimeOutline
} from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-coffee-900 text-coffee-100 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid gap-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-coffee-800 shadow-2xl">
              <img 
                src="/Safe-land-logo.jpg" 
                alt="Safeland Cafe Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-3xl font-serif font-light text-white tracking-tighter italic uppercase">Safeland</span>
          </div>
          <p className="text-coffee-300 leading-relaxed font-light italic">
            Crafting sanctuary moments and artisanal experiences in the heart of the city. 
            Your destination for taste and tranquility.
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full border border-coffee-800 flex items-center justify-center text-coffee-300 hover:text-white hover:border-white transition-all"><IoLogoInstagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-coffee-800 flex items-center justify-center text-coffee-300 hover:text-white hover:border-white transition-all"><IoLogoFacebook size={20} /></a>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-coffee-400">Concierge</h3>
          <ul className="space-y-5 text-coffee-300 font-light">
            <li className="flex items-start gap-4">
              <IoLocationOutline size={20} className="text-coffee-400 shrink-0" />
              <span className="text-sm">123 Espresso Lane, Coffee District,<br />Addis Ababa, Ethiopia</span>
            </li>
            <li className="flex items-center gap-4">
              <IoCallOutline size={20} className="text-coffee-400" />
              <span className="text-sm font-serif italic">+251 11 234 5678</span>
            </li>
            <li className="flex items-center gap-4">
              <IoMailOutline size={20} className="text-coffee-400" />
              <span className="text-sm">hello@safelandcafe.com</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="space-y-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-coffee-400">Service Hours</h3>
          <ul className="space-y-4 text-coffee-300 font-light">
            <li className="flex justify-between items-center border-b border-coffee-900 pb-3">
              <span className="text-sm uppercase tracking-widest text-[10px] font-bold">Weekday</span>
              <span className="text-white font-serif italic">7:00 — 20:00</span>
            </li>
            <li className="flex justify-between items-center border-b border-coffee-900 pb-3">
              <span className="text-sm uppercase tracking-widest text-[10px] font-bold">Saturday</span>
              <span className="text-white font-serif italic">8:00 — 21:00</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm uppercase tracking-widest text-[10px] font-bold">Sunday</span>
              <span className="text-white font-serif italic">9:00 — 18:00</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-coffee-400">Navigation</h3>
          <ul className="grid grid-cols-1 gap-4 text-coffee-300 font-light">
            <li><Link to="/menu" className="hover:text-white transition-colors flex items-center gap-2 italic">Our Selection</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2 italic">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2 italic">Locations</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors flex items-center gap-2 italic">Join the Sanctuary</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-coffee-900 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-coffee-500">
          &copy; {new Date().getFullYear()} Safeland Cafe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
