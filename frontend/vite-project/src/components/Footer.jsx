import { Link } from "react-router-dom";
import { Coffee, MapPin, Camera, Share2, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-stone-200 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Coffee className="text-orange-500" size={24} />
            <span className="text-2xl font-serif font-bold text-white">Bloom Café</span>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Crafting cozy moments and exceptional coffee in the heart of the city. 
            Your sanctuary for taste and tranquility.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-500 transition-colors"><Camera size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Share2 size={20} /></a>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h3 className="text-lg font-serif font-bold text-white">Contact Us</h3>
          <ul className="space-y-4 text-stone-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
              <span>123 Espresso Lane, Coffee District, Addis Ababa</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-500" />
              <span>+251 11 234 5678</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-500" />
              <span>hello@bloomcafe.com</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="space-y-6">
          <h3 className="text-lg font-serif font-bold text-white">Opening Hours</h3>
          <ul className="space-y-3 text-stone-400">
            <li className="flex justify-between">
              <span>Mon - Fri</span>
              <span className="text-white">7:00 - 20:00</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="text-white">8:00 - 21:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-white">9:00 - 18:00</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-lg font-serif font-bold text-white">Quick Links</h3>
          <ul className="space-y-3 text-stone-400">
            <li><Link to="/menu" className="hover:text-orange-500 transition-colors">Our Menu</Link></li>
            <li><Link to="/about" className="hover:text-orange-500 transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Locations</Link></li>
            <li><Link to="/careers" className="hover:text-orange-500 transition-colors">Join the Team</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} Bloom Café. All rights reserved.</p>
      </div>
    </footer>
  );
}
