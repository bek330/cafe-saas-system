import { useEffect, useState } from "react";
import KitchenCard from "../components/kitchenCard";

function Kitchen() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/orders");
    const data = await res.json();

    // only active orders
    const active = data
  .filter(o => o.status === "pending" || o.status === "accepted")
  .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    setOrders(active);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Kitchen Display</h1>

      <div className="grid grid-cols-3 gap-6">
        {orders.map(order => (
          <KitchenCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Kitchen;