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
      <div className="min-h-screen bg-coffee-900 py-10">
        <div className="mx-auto max-w-6xl px-6">
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
    <div className="min-h-screen bg-coffee-900 py-16">
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
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-coffee-600 to-transparent mx-auto mt-10"></div>
          </Motion.div>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {categories.map((category, index) => (
            <Motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/menu/category/${category.id}`)}
              className="group cursor-pointer relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-coffee-800/50 shadow-2xl transition-all duration-700"
            >
              {/* Background Image with Overlay */}
              {category.image_url ? (
                <img 
                  src={category.image_url} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              ) : (
                <div className="absolute inset-0 bg-coffee-800" />
              )}
              
              {/* Refined Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-coffee-950/40 backdrop-blur-md border border-white/10 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    <CategoryIcon name={category.icon} className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-serif font-light text-white tracking-wide">
                      {category.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="h-px w-4 bg-coffee-400"></span>
                      <p className="text-[10px] text-coffee-300 uppercase tracking-[0.3em] font-bold">
                        View Selection
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 transition-all duration-500 group-hover:bg-white group-hover:border-white">
                    <IoChevronForward className="w-5 h-5 text-white group-hover:text-coffee-950 transition-colors" />
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
