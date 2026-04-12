import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuByCategory } from "../api/menuApi";
import { useCart } from "../contexts/useCart";
import { getCategories } from "../api/categoryApi";




function Category() {
  // Get category ID from URL
  const { id } = useParams();
  // Navigation and cart context
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);

  // State for menu items and loading status
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  

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

  // Fetch menu items when category ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuByCategory(id);
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  // Handle order placement
  

  return (
    <div className="flex">
      {/* LEFT */}

      <div className="flex-1 p-6">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(`/order`)} className="mr-4">
            Back
          </button>
          
          {categories.map((cat) => cat.id === parseInt(id) && (
            <h1 key={cat.id} className="text-2xl font-bold">
              {cat.name}
            </h1>
          ))}
        </div>  

        {loading ? (
          <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-40 bg-gray-300 rounded"></div>
            <div className="h-40 bg-gray-300 rounded"></div>
            <div className="h-40 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="border p-4 rounded-xl">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-32 w-full object-cover rounded"
                />

                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm">{item.description}</p>

                <div className="flex justify-between mt-2">
                  <span className="font-bold text-green-600">
                    {item.price} ETB
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-black text-white px-2 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT CART */}
    </div>
  );
}

export default Category;
