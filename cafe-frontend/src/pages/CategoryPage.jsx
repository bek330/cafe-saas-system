import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [tableNumber, setTableNumber] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get items
        const itemsRes = await API.get(`/menu/category/${categoryId}`);
        setItems(itemsRes.data);

        // get categories
        const catRes = await API.get("/categories");

        const current = catRes.data.find((c) => c.id == categoryId);

        if (current) {
          setCategoryName(
            current.name.charAt(0).toUpperCase() + current.name.slice(1),
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [categoryId]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  const placeOrder = async () => {
    if (!tableNumber) {
      alert("Enter table number");
      return;
    }

    if (!tableNumber || isNaN(Number(tableNumber))) {
      alert("Enter valid table number");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await API.post("/orders", {
        table_number: Number(tableNumber),
        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      });

      alert("Order placed!");

      setCart([]);
      setTableNumber("");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div>
      {/* FULL WIDTH HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <div>
        {/* LEFT — MENU */}

        <div>
          <div>
            <h2>{categoryName}</h2>
            <button onClick={() => navigate(-1)}>⬅ Back</button>
          </div>

          <div>
            {items.map((item) => (
              <div key={item.id}>
                <img src={item.image_url} alt={item.name} />
                <h3>{item.name}</h3>
                <p>${item.price}</p>

                <button onClick={() => addToCart(item)}>Add</button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — CART */}
        <div>
          <div>
            <h2>Cart</h2>

            {cart.length === 0 && <p>No items</p>}

            {cart.map((item) => (
              <div key={item.id}>
                <div>{item.name}</div>

                <div>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  {item.quantity}
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            ))}
            <input
              type="number"
              placeholder="Table number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />

            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
