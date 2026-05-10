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
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-sage/20 py-8 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <button
            onClick={() => navigate(`/menu`)}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md text-charcoal hover:bg-oat-gold transition-all ease-in-out duration-300 border border-oat-gold/20"
            aria-label="Back to Menu"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 mb-2">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                {selectedCategory?.image_url ? (
                  <img
                    src={selectedCategory.image_url}
                    alt={selectedCategory.name}
                    className="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white"
                  />
                ) : (
                  <div className="w-full h-full bg-oat-gold/20 rounded-3xl border border-oat-gold/30 flex items-center justify-center">
                    <CategoryIcon
                      name={selectedCategory?.icon}
                      className="w-10 h-10 md:w-12 md:h-12 text-charcoal"
                    />
                  </div>
                )}
                {selectedCategory?.image_url && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-50">
                    <CategoryIcon
                      name={selectedCategory.icon}
                      className="w-5 h-5 text-charcoal"
                    />
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-serif font-black text-charcoal tracking-tighter uppercase">
                  {selectedCategory?.name || "Loading..."}
                </h1>
                <p className="text-lg text-sage max-w-2xl mt-2 italic font-medium">
                  {selectedCategory?.description ||
                    `Discover our carefully curated selection of delicious ${selectedCategory?.name?.toLowerCase() || ""} dishes.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center gap-4 text-red-600">
            <Info className="w-6 h-6 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 animate-pulse border border-white"
              >
                <div className="h-48 bg-gray-100 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-100 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 bg-white/50 rounded-3xl border border-dashed border-sage/30">
            <ShoppingBag className="w-16 h-16 text-sage/40 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">
              No items yet
            </h2>
            <p className="text-sage">
              This category is currently empty. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ease-in-out duration-300">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-white"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={optimizeImage(item.image_url)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-food.jpg";
                    }}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {!item.is_available && (
                    <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-white text-charcoal px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-serif font-bold text-charcoal group-hover:text-oat-gold transition-colors ease-in-out duration-200">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-charcoal">
                      {item.price}{" "}
                      <span className="text-xs text-sage font-medium uppercase tracking-tighter">
                        ETB
                      </span>
                    </span>
                  </div>
                  <p className="text-sage text-sm mb-6 line-clamp-2 leading-relaxed">
                    {item.description ||
                      "A delicious dish made with fresh, locally sourced ingredients."}
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.is_available}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-charcoal py-3 text-sm font-bold text-cream transition-all hover:bg-charcoal/90 active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:pointer-events-none shadow-lg shadow-charcoal/10 border-e-sage duration-300"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
