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
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-12">
        <div className="h-8 w-2/5 rounded-full bg-slate-200/90" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="h-40 rounded-3xl bg-white/80 shadow-lg shadow-slate-200/80 animate-pulse" />
          <div className="h-40 rounded-3xl bg-white/80 shadow-lg shadow-slate-200/80 animate-pulse" />
          <div className="h-40 rounded-3xl bg-white/80 shadow-lg shadow-slate-200/80 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-100 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl shadow-slate-200/70 backdrop-blur-xl">
          <p className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Menu</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Browse our menu categories
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Explore the menu sections with a fresh, modern look. Tap any category card to jump directly to the dishes you want.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => navigate(`/menu/category/${category.id}`)}
              className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-8 text-left shadow-xl shadow-slate-200/80 transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-200"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-200" />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-50 text-3xl shadow-inner shadow-cyan-100/80">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">{category.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Browse menu items, chef recommendations, and fresh options for this category.
                </p>
                <span className="mt-6 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition group-hover:bg-cyan-50">
                  View items
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
