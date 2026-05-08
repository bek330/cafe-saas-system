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

  const optimizeImage = (url) => {
    if (!url) return "";

    return url.replace("/upload/", "/upload/w_300,c_fill,q_auto,f_auto/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-sage/60 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => navigate(`/menu`)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-cream px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-sage/10 mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Menu
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-oat-gold rounded-full mb-4">
              <span className="text-3xl">{selectedCategory?.icon || "🍽️"}</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
              {selectedCategory?.name || "Loading category..."}
            </h1>
            <p className="text-xl text-sage max-w-2xl mx-auto">
              Discover our carefully curated selection of delicious dishes in
              this category.
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">
              No items yet
            </h2>
            <p className="text-sage">
              This category is currently empty. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative h-48 w-full bg-gray-200 rounded-t-xl mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={optimizeImage(item.image_url)}
                    onError={(e) => {
                      e.target.src = "/fallback-food.jpg";
                    }}
                    alt={item.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform rounded-t-xl"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-serif font-semibold text-charcoal">
                      {item.name}
                    </h3>
                    <span className="bg-sage text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.price} ETB
                    </span>
                  </div>
                  <p className="text-sage mb-4">
                    {item.description ||
                      "A delicious dish made with fresh ingredients."}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => addToCart(item)}
                      className="rounded-full bg-oat-gold px-4 py-2 text-sm font-semibold text-charcoal transition hover:bg-oat-gold/80"
                    >
                      Add to Cart
                    </button>
                    <span
                      className={`text-sm font-semibold ${item.is_available ? "text-sage" : "text-red-500"}`}
                    >
                      {item.is_available ? "Available" : "Unavailable"}
                    </span>
                  </div>
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
