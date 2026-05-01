import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuByCategory } from "../api/menuApi";
import { useCart } from "../contexts/useCart";
import { getCategories } from "../api/categoryApi";

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

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <button
          onClick={() => navigate(`/menu`)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Back to menu
        </button>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-100 text-3xl">
                {selectedCategory?.icon || "🍽️"}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-600">Category</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                  {selectedCategory?.name || "Loading category..."}
                </h1>
              </div>
            </div>
          </div>

          <p className="max-w-2xl text-slate-600">
            Explore the best dishes in this section. Tap any menu item to add it to your order and continue building a fresh, tasty cart.
          </p>
        </div>
      </section>

      {error && (
        <section className="rounded-[2rem] bg-rose-50 p-6 text-rose-700 shadow-sm">
          <p>{error}</p>
        </section>
      )}

      <section className="grid gap-6">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-72 rounded-[1.75rem] bg-slate-100 p-6 animate-pulse"></div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl">
            <p className="text-lg font-semibold text-slate-900">No items found in this category.</p>
            <p className="mt-2 text-slate-500">Try another category or refresh to see the latest menu.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-52 w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      {item.price} ETB
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description || "Fresh, delicious and ready to order."}</p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                      onClick={() => addToCart(item)}
                      className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                    >
                      Add to cart
                    </button>
                    <span className={`text-sm font-semibold ${item.is_available ? "text-emerald-600" : "text-rose-600"}`}>
                      {item.is_available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Category;
