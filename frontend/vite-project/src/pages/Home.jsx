import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { useNavigate } from "react-router-dom";



function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-charcoal mx-auto mb-4"></div>
          <p className="text-charcoal text-xl font-serif">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-sage/10 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-xl shadow-slate-200/70 text-center">
          <p className="inline-flex rounded-full bg-oat-gold px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal">
            Menu
          </p>
          <h1 className="mt-5 text-5xl font-serif font-bold text-charcoal sm:text-6xl">
            Welcome to Our Café
          </h1>
          <p className="mt-4 text-xl text-sage max-w-2xl mx-auto">
            Discover delicious dishes crafted with passion. Browse our menu and order with ease.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/menu/category/${category.id}`)}
              className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="h-48 bg-oat-gold flex items-center justify-center">
                <span className="text-6xl">{category.icon}</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">{category.name}</h2>
                <p className="text-sage mb-4">
                  Explore our selection of fresh, delicious {category.name.toLowerCase()} dishes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition group-hover:bg-oat-gold">
                    View Menu
                  </span>
                  <svg className="w-5 h-5 text-oat-gold group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
