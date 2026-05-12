import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuByCategory } from "../api/menuApi";
import { useCart } from "../contexts/useCart";
import { getCategories } from "../api/categoryApi";
import {
  ArrowLeft,
  ShoppingCart,
  Utensils,
  Info,
  ShoppingBag,
  Coffee,
  GlassWater,
  Cake,
  Pizza,
  Salad,
  Soup,
  Croissant,
  Beef,
  Plus
} from "lucide-react";

const iconMap = {
  Coffee: Coffee,
  Utensils: Utensils,
  GlassWater: GlassWater,
  Cake: Cake,
  Pizza: Pizza,
  Salad: Salad,
  Soup: Soup,
  Croissant: Croissant,
  Beef: Beef,
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
    return url.replace("/upload/", "/upload/w_300,c_fill,q_auto,f_auto/");
  };

  const CategoryIcon = ({ name, ...props }) => {
    const IconComponent = iconMap[name] || Utensils;
    return <IconComponent {...props} />;
  };

  return (
    <div className="min-h-screen bg-coffee-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Minimal Header */}
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={() => navigate(`/menu`)}
            className="group flex items-center gap-3 text-coffee-400 hover:text-white transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-full border border-coffee-800 flex items-center justify-center group-hover:border-coffee-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back</span>
          </button>
          
          <div className="flex flex-col items-end">
            <h1 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight">
              {selectedCategory?.name || "Selection"}
            </h1>
            <div className="h-px w-8 bg-coffee-400 mt-2"></div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6 mb-12 text-red-400 text-sm flex items-center gap-4">
            <Info className="w-4 h-4" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/5] bg-coffee-800 rounded-[2.5rem]"></div>
                <div className="h-4 bg-coffee-800 rounded w-1/2"></div>
                <div className="h-3 bg-coffee-800 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 border-t border-coffee-800">
            <p className="text-coffee-500 font-serif italic text-lg">The collection is currently unavailable.</p>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-coffee-800 border border-coffee-800 shadow-2xl transition-transform duration-700">
                  <img
                    src={optimizeImage(item.image_url)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-food.jpg";
                    }}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Status Overlay */}
                  {!item.is_available && (
                    <div className="absolute inset-0 bg-coffee-950/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Reserved</span>
                    </div>
                  )}

                  {/* Quick Add Button (Luxury Style) */}
                  {item.is_available && (
                    <button
                      onClick={() => addToCart(item)}
                      className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white text-coffee-950 flex items-center justify-center shadow-2xl translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 active:scale-95"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="mt-6 flex justify-between items-start px-2">
                  <div className="space-y-1 max-w-[70%]">
                    <h3 className="text-xl font-serif font-light text-white tracking-wide group-hover:text-coffee-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-coffee-400 uppercase tracking-widest font-medium">
                      Available Today
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-light text-white">
                      {item.price}
                    </span>
                    <span className="text-[8px] font-black text-coffee-500 uppercase tracking-widest">
                      ETB
                    </span>
                  </div>
                </div>

                {/* Optional Description (Subtle) */}
                <p className="mt-4 px-2 text-coffee-500 text-[11px] leading-relaxed font-medium line-clamp-2">
                  {item.description || "A masterfully prepared selection for the discerning palate."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
