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
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-coffee-50 mb-2">Oops! Something went wrong</h2>
          <p className="text-coffee-300 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 rounded-full bg-coffee-400 px-6 py-3 text-sm font-semibold text-coffee-900 hover:bg-coffee-300 transition-colors shadow-lg shadow-coffee-400/20"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-900 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <header className="mb-16 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-coffee-400 mb-4 block">
            The Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-coffee-50 tracking-tight leading-none">
            Our <span className="italic font-normal text-coffee-300">Selection</span>
          </h1>
          <div className="h-px w-12 bg-coffee-600 mx-auto mt-8 opacity-50"></div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/menu/category/${category.id}`)}
              className="group cursor-pointer relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-coffee-800 shadow-2xl transition-all duration-700"
            >
              {/* Background Image with Overlay */}
              {category.image_url ? (
                <img 
                  src={category.image_url} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              ) : (
                <div className="absolute inset-0 bg-coffee-800" />
              )}
              
              {/* Refined Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Glass Content Card */}
              <div className="absolute inset-x-4 bottom-4 p-6 backdrop-blur-md bg-coffee-950/30 rounded-[1.5rem] border border-white/5 flex items-end justify-between transition-all duration-500 group-hover:bg-coffee-950/50">
                <div className="space-y-1">
                  <h2 className="text-2xl font-serif font-light text-white tracking-wide">
                    {category.name}
                  </h2>
                  <p className="text-[10px] text-coffee-300 uppercase tracking-[0.2em] font-medium opacity-80">
                    Explore Collection
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-white">
                  <ChevronRight className="w-4 h-4 text-white group-hover:text-coffee-950 transition-colors" />
                </div>
              </div>

              {/* Minimal Icon Badge */}
              <div className="absolute top-6 left-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <CategoryIcon name={category.icon} className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
