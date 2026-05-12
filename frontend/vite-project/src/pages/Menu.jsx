import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { 
  IoChevronForward, 
  IoReload, 
  IoAlertCircleOutline,
  IoCafeOutline, 
  IoRestaurantOutline, 
  IoBeerOutline, 
  IoWineOutline,
  IoPizzaOutline,
  IoLeafOutline,
  IoFlaskOutline,
  IoFastFoodOutline
} from "react-icons/io5";
import { GiCupcake, GiCroissant, GiSteak, GiHamburger } from "react-icons/gi";

const iconMap = {
  Coffee: IoCafeOutline,
  Utensils: IoRestaurantOutline,
  GlassWater: IoBeerOutline,
  Cake: GiCupcake,
  Pizza: IoPizzaOutline,
  Cocktails: IoWineOutline,
  Burgers: GiHamburger,
  Salad: IoLeafOutline,
  Soup: IoFlaskOutline,
  Croissant: GiCroissant,
  Beef: GiSteak,
};

function Menu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CategoryIcon = ({ name, ...props }) => {
    const IconComponent = iconMap[name] || IoRestaurantOutline;
    return <IconComponent {...props} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent py-16 relative">
        {/* Page-specific Geometric Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-coffee-400/10 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-coffee-400/10 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-coffee-400/10 to-transparent"></div>
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">

          <div className="h-48 w-full bg-coffee-800 animate-pulse rounded-[2.5rem] mb-10 border border-coffee-700/30"></div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-coffee-800 rounded-3xl shadow-lg h-80 overflow-hidden animate-pulse border border-coffee-700/30">
                <div className="h-48 bg-coffee-700/50"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-coffee-700/50 rounded w-3/4"></div>
                  <div className="h-4 bg-coffee-700/50 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-coffee-900 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <IoAlertCircleOutline className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-coffee-50 mb-2">Oops! Something went wrong</h2>
          <p className="text-coffee-300 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 rounded-full bg-coffee-400 px-6 py-3 text-sm font-semibold text-coffee-900 hover:bg-coffee-300 transition-colors shadow-lg shadow-coffee-400/20"
          >
            <IoReload className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-900/20 py-16 rounded-[2.5rem] shadow-2xl border border-white/5 backdrop-blur-4xl relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-20 text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-coffee-400 mb-4 block">
              Curated Collections
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-coffee-50 tracking-tight leading-none">
              Explore Our <span className="italic font-normal text-coffee-300">Menu</span>
            </h1>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-coffee-600 to-transparent mx-auto mt-10"></div>
          </Motion.div>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => navigate(`/menu/category/${category.id}`)}
              className="group cursor-pointer relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700"
            >
              {/* Parallax Image Effect */}
              {category.image_url ? (
                <img 
                  src={category.image_url} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                />
              ) : (
                <div className="absolute inset-0 bg-coffee-800" />
              )}
              
              {/* Minimalist Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Elegant Content Layout */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center">
                <div className="space-y-6">
                  {/* Subtle Floating Icon */}
                  <div className="inline-flex p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                    <CategoryIcon name={category.icon} className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-tighter leading-tight transition-all duration-700 group-hover:tracking-normal group-hover:text-coffee-300">
                      {category.name}
                    </h2>
                    <div className="h-px w-0 bg-coffee-400 mx-auto transition-all duration-700 group-hover:w-20 opacity-60"></div>
                  </div>
                </div>
              </div>

              {/* Ultra-thin Border Highlight */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-[3rem] transition-colors duration-700 pointer-events-none" />
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
