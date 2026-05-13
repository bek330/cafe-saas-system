import { Link } from "react-router-dom";
import { IoCafeOutline } from "react-icons/io5";

function Header() {
  return (
    <header className="bg-coffee-900/80 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 border-b border-white/5 transition-all duration-300" title="Safeland Cafe - Fresh dishes, great experiences">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="group transition-transform duration-500 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-coffee-400/30 shadow-2xl">
            <img 
              src="/Safe-land-logo.jpg" 
              alt="Safeland Cafe" 
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          <p className="text-oat-gold text-[10px] font-black uppercase tracking-[0.3em] hidden lg:block italic opacity-80">
            Artisanal Experience
          </p>
          <div className="h-4 w-px bg-white/10 hidden lg:block"></div>
          <Link 
            to="/menu" 
            className="flex items-center gap-2 text-cream hover:text-oat-gold transition-colors duration-300"
          >
            <IoCafeOutline size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Menu</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
