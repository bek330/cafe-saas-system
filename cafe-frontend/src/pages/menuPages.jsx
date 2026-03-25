import { useEffect, useState } from "react";
import API from "../services/api";
import { useSearchParams } from "react-router-dom";
function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");
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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await API.get("/menu");
        setMenu(res.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    fetchMenu();
  }, []);

  const placeOrder = async () => {
    if (!table) {
      alert("Table number missing");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const payload = {
        table_number: Number(table),
        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      };

      await API.post("/orders", payload);

      alert("Order placed successfully!");

      // Clear cart
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu</h1>
      <p>Table: {table}</p>

      {menu.map((category) => (
        <div key={category.category}>
          <h2>{category.category}</h2>

          {category.items.map((item) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              <strong>{item.name}</strong> - ${item.price}
              <p>{item.description}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      ))}

      <h2>Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity}
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default MenuPage;
