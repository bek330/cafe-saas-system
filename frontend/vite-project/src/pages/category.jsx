import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuByCategory } from "../api/menuApi";
import { useCart } from "../contexts/useCart";
import { getCategories } from "../api/categoryApi";
import { motion as Motion } from "framer-motion";
import {
  IoArrowBack,
  IoCartOutline,
  IoRestaurantOutline,
  IoInformationCircleOutline,
  IoAdd,
  IoCafeOutline,
  IoBeerOutline,
  IoPizzaOutline,
  IoLeafOutline,
  IoFlaskOutline
} from "react-icons/io5";
import { GiCupcake, GiCroissant, GiSteak } from "react-icons/gi";

const iconMap = {
  Coffee: IoCafeOutline,
  Utensils: IoRestaurantOutline,
  GlassWater: IoBeerOutline,
  Cake: GiCupcake,
  Pizza: IoPizzaOutline,
  Salad: IoLeafOutline,
  Soup: IoFlaskOutline,
  Croissant: GiCroissant,
  Beef: GiSteak,
};

function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === Number(id)),
    [categories, id],
  );

  useEffect(() => {
    const loadCategoryPage = async () => {
      setLoading(true);
      setError(null);

      try {
        const [categoryData, menuData] = await Promise.all([
          getCategories(),
          getMenuByCategory(id),
        ]);

        setCategories(categoryData);
        setItems(menuData);
      } catch (err) {
        console.error(err);
        setError("Unable to load this category. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCategoryPage();
  }, [id]);

  const optimizeImage = (url) => {
    if (!url) return "";
    return url.replace("/upload/", "/upload/w_600,c_fill,q_auto,f_auto/");
  };

  const CategoryIcon = ({ name, ...props }) => {
    const IconComponent = iconMap[name] || IoRestaurantOutline;
    return <IconComponent {...props} />;
  };

  return (
    <div className="min-h-screen bg-coffee-900/75 py-16 rounded-[2.5rem] shadow-2xl border border-white/5 backdrop-blur-4xl relative overflow-hidden">
      {/* Page-specific Geometric Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-coffee-400/5 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-coffee-400/5 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-coffee-400/5 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <Motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(`/menu`)}
            className="group self-start flex items-center gap-4 text-sage hover:text-white transition-all"
          >
            <div className="w-12 h-12 rounded-full border bg-coffee-200 border-coffee-200 flex items-center justify-center group-hover:border-oat-gold group-hover:bg-oat-gold ease-in-out duration-300 transition-all">
              <IoArrowBack size={20} />
            </div>
            <span className="text-xs text-cream font-black uppercase tracking-[0.3em]">Return to Menu</span>
          </Motion.button>
          
          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:items-end text-left md:text-right"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#e4d75f] mb-2">
              Collection Selection
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-cream tracking-tight">
              {selectedCategory?.name || "The Selection"}
            </h1>
            <div className="h-px w-24 bg-gradient-to-r from-cream to-transparent mt-4"></div>
          </Motion.div>
        </div>

        {error && (
          <div className="bg-red-950/20 border border-red-500/20 rounded-3xl p-8 mb-16 text-red-400 flex items-center gap-4">
            <IoInformationCircleOutline size={24} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse space-y-6">
                <div className="aspect-[16/10] bg-coffee-800 rounded-[3rem]"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-coffee-800 rounded w-1/2"></div>
                  <div className="h-4 bg-coffee-800 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-40 border-t border-coffee-800/50">
            <p className="text-cream font-serif italic text-2xl tracking-wide">
              This collection is being masterfully prepared...
            </p>
          </div>
        ) : (
          <div className="grid gap-16 sm:grid-cols-2">
            {items.map((item, index) => (
              <Motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[16/11] overflow-hidden rounded-[3rem] bg-coffee-800  border-coffee-800/50 shadow-2xl">
                  <img
                    src={optimizeImage(item.image_url)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-food.jpg";
                    }}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Status Overlay */}
                  {!item.is_available && (
                    <div className="absolute inset-0 bg-coffee-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                      <IoInformationCircleOutline className="text-coffee-400" size={40} />
                      <span className="text-xs font-black uppercase tracking-[0.5em] text-white">Unavailable</span>
                    </div>
                  )}

                  {/* Elegant Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Premium Add Button */}
                  {item.is_available && (
                    <button
                      onClick={() => addToCart(item)}
                      className="absolute bottom-8 right-8 w-16 h-16 rounded-2xl bg-coffee-50 text-coffee-950 flex items-center justify-center shadow-2xl translate-y-24 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-coffee-400 hover:text-white"
                    >
                      <IoAdd size={32} />
                    </button>
                  )}
                </div>

                {/* Information */}
                <div className="mt-8 px-2">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-serif font-light text-white tracking-wide group-hover:text-coffee-300 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-coffee-400"></span>
                        <p className="text-[10px] text-coffee-200 uppercase tracking-widest font-bold">
                          Chef's Selection
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-3xl font-light text-white">
                        {item.price}
                      </span>
                      <span className="text-[9px] font-black text-coffee-400 uppercase tracking-widest">
                        ETB
                      </span>
                    </div>
                  </div>

                  <p className="text-cream text-sm leading-relaxed font-light line-clamp-2 italic">
                    {item.description || "A masterfully prepared selection for the discerning palate, crafted with the finest ingredients."}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
