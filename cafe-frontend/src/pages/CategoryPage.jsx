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
      <div style={{ display: "flex" }}>
        {/* LEFT — MENU */}

        <div
          style={{
            flex: 3,
            padding: "20px",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "0px 20px",
              flexWrap: "nowrap",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                color: "#333",
                marginBottom: "20px",
                textAlign: "center",
                fontSize: "70px",
                fontWeight: "bold",
                marginLeft: "200px",
              }}
            >
              {categoryName}
            </h2>
            <button
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: "#33333300",
                border: "none",
                color: "#1f1e1e",
                padding: "10px 15px",
                borderRadius: "8px",
                marginBottom: "20px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ⬅ Back
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  padding: "10px",
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3>{item.name}</h3>
                <p>${item.price}</p>

                <button onClick={() => addToCart(item)}>Add</button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — CART */}
        <div
          style={{
            width: "300px",
            padding: "20px",
            position: "sticky",
            top: "80px", // below header
            height: "fit-content",
            marginRight: "40px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Cart</h2>

            {cart.length === 0 && <p>No items</p>}

            {cart.map((item) => (
              <div key={item.id} style={{ marginBottom: "10px" }}>
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
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
              }}
            />

            <h3>Total: ${total.toFixed(2)}</h3>
            <button
              onClick={placeOrder}
              style={{
                width: "100%",
                padding: "10px",
                background: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
