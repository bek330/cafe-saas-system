import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  RefreshCw, 
  AlertCircle,
  Coffee, 
  Utensils, 
  GlassWater, 
  Cake, 
  Pizza, 
  Salad, 
  Soup, 
  Croissant, 
  Martini,
  Beef, 
  Ham,
  Hamburger
} from "lucide-react";

const iconMap = {
  Coffee: Coffee,
  Utensils: Utensils,
  GlassWater: GlassWater,
  Cake: Cake,
  Pizza: Pizza,
  Cocktails: Martini,
  Burgers: Hamburger,
  Salad: Salad,
  Soup: Soup,
  Croissant: Croissant,
  Beef: Beef,
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
    const IconComponent = iconMap[name] || Utensils;
    return <IconComponent {...props} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-48 w-full bg-white/50 animate-pulse rounded-[2rem] mb-10"></div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg h-80 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-100"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-10 bg-gray-100 rounded-full w-1/3"></div>
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
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Oops! Something went wrong</h2>
          <p className="text-sage mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 rounded-full bg-oat-gold px-6 py-3 text-sm font-semibold text-charcoal hover:bg-oat-gold/80 transition-colors shadow-lg shadow-oat-gold/20"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-sage/30 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-xl shadow-slate-200/70 text-center">
          <p className="inline-flex rounded-full bg-oat-gold/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal border border-oat-gold/30">
            Menu
          </p>
          <h1 className="mt-5 text-5xl font-serif font-bold text-charcoal sm:text-6xl">
            Our Café Menu
          </h1>
          <p className="mt-4 text-xl text-sage max-w-2xl mx-auto">
            Discover delicious dishes crafted with passion. Browse our menu and
            order with ease.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/menu/category/${category.id}`)}
              className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-white/50 rounded-t-2xl"
            >
              <div className="relative h-48 bg-oat-gold overflow-hidden rounded-t-2xl">
                {category.image_url ? (
                  <img 
                    src={category.image_url} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center group-hover:bg-oat-gold/90 transition-colors">
                    <CategoryIcon 
                      name={category.icon} 
                      className="w-16 h-16 text-charcoal opacity-80 group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                )}
                {category.image_url && (
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                    <CategoryIcon name={category.icon} className="w-5 h-5 text-charcoal" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2 group-hover:text-oat-gold transition-colors">
                  {category.name}
                </h2>
                <p className="text-sage mb-4 line-clamp-2">
                  Explore our selection of fresh, delicious{" "}
                  {category.name.toLowerCase()} dishes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-charcoal px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream border border-oat-gold/20 transition group-hover:bg-oat-gold group-hover:border-oat-gold group-hover:text-charcoal ease-in-out duration-300" >
                    View Menu
                  </span>
                  <ChevronRight className="w-5 h-5 text-oat-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
