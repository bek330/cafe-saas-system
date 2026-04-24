/* eslint-disable react-hooks/purity */
import { useEffect, useState, useRef } from "react";
import OrderColumn from "../components/OrderColumn";
import { getOrders, updateOrderStatus } from "../api/orderApi";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [prevCount, setPrevCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const topRef = useRef(null);

  // 🔐 redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const playSound = () => {
    const audio = new Audio("/notification.wav");
    audio.play().catch(() => {});
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getOrders(token);

      setOrders(data);
      setLastUpdate(Date.now());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (orders.length > prevCount) {
      playSound();
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    setPrevCount(orders.length);
  }, [orders, prevCount]);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await updateOrderStatus(id, status, token);

      // 🔥 always sync with backend
      fetchOrders();
    } catch (err) {
      alert(err.message);
      fetchOrders(); // keep UI consistent
    }
  };

  const sortByTime = (a, b) =>
  new Date(a.created_at) - new Date(b.created_at);

  const pending = orders.filter((o) => o.status === "pending").sort(sortByTime);
  const accepted = orders.filter((o) => o.status === "accepted").sort(sortByTime);
  const completed = orders.filter((o) => {
    if (o.status !== "completed") return false;

    const age = (Date.now() - new Date(o.created_at)) / 1000;

    return age < 300; // ⏱️ 5 minutes only
  });
  const cancelled = orders.filter((o) => o.status === "cancelled");

  return (
    <div ref={topRef} className="p-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <span className="text-xs text-gray-500">
          Updated {Math.floor((Date.now() - lastUpdate) / 1000)}s ago
        </span>

        <button
          onClick={fetchOrders}
          className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <OrderColumn
          title="Pending"
          orders={pending}
          updateStatus={updateStatus}
        />
        <OrderColumn
          title="Accepted"
          orders={accepted}
          updateStatus={updateStatus}
        />
        <OrderColumn
          title="Completed"
          orders={completed}
          updateStatus={updateStatus}
        />
        <OrderColumn
          title="Cancelled"
          orders={cancelled}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
}

export default Admin;
