/* eslint-disable react-hooks/purity */
import { useEffect, useState } from "react";
import KitchenCard from "../components/kitchenCard";

function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [prevIds, setPrevIds] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
        return;
      }

      const data = await res.json();

      const active = data
        .filter((o) => o.status === "pending" || o.status === "accepted")
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      // ✅ prevent unnecessary re-render
      setOrders((prev) => {
        const same = JSON.stringify(prev) === JSON.stringify(active);
        return same ? prev : active;
      });

      setLastUpdate(Date.now());
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔔 sound only on new orders
  useEffect(() => {
    const newOrders = orders.filter((o) => !prevIds.includes(o.id));

    if (newOrders.length > 0) {
      const audio = new Audio("/notification.wav");
      audio.play().catch(() => {});
    }

    setPrevIds(orders.map((o) => o.id));
  }, [orders]);

  // 🕒 smart time display
  const getTimeAgo = () => {
    const diff = Math.floor((Date.now() - lastUpdate) / 1000);
    if (diff < 60) return `${diff}s ago`;
    return `${Math.floor(diff / 60)}m ago`;
  };

  const sortByTime = (a, b) =>
    new Date(a.created_at) - new Date(b.created_at);

  const pending = orders
    .filter((o) => o.status === "pending")
    .sort(sortByTime);

  const accepted = orders
    .filter((o) => o.status === "accepted")
    .sort(sortByTime);

  // 🖥 fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kitchen Display</h1>

        <button
          onClick={toggleFullscreen}
          className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          Fullscreen
        </button>
      </div>

      {/* LAST UPDATE */}
      <p className="text-sm text-gray-500 mb-6">
        Updated {getTimeAgo()}
      </p>

      {/* TWO COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 🟡 WAITING */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Waiting
          </h2>

          {pending.length === 0 && (
            <p className="text-gray-500">No waiting orders</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pending.map((order) => (
              <KitchenCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* 🔵 IN PROGRESS */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            In Progress
          </h2>

          {accepted.length === 0 && (
            <p className="text-gray-500">No in-progress orders</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accepted.map((order) => (
              <KitchenCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kitchen;