/* eslint-disable react-hooks/purity */
import { useEffect, useState } from "react";
import KitchenCard from "../components/kitchenCard";
import { getOrders, updateOrderStatus } from "../api/orderApi";
import { toast } from "react-hot-toast";

function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [prevIds, setPrevIds] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const fetchOrders = async () => {
    try {
      const data = await getOrders();

      const active = data
        .filter((o) => o.status === "pending" || o.status === "accepted")
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      setOrders((prev) => {
        const same = JSON.stringify(prev) === JSON.stringify(active);
        return same ? prev : active;
      });

      setLastUpdate(Date.now());
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success(`Order #${id} ${status ==='completed' ? 'completed' : 'accepted'}`);
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update order status");
      console.error(err);
    }
  };


  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newOrders = orders.filter((o) => !prevIds.includes(o.id));

    if (newOrders.length > 0) {
      const audio = new Audio("/notification.wav");
      audio.play().catch(() => {});
    }

    setPrevIds(orders.map((o) => o.id));
  }, [orders, prevIds]);

  const getTimeAgo = () => {
    const diff = Math.floor((Date.now() - lastUpdate) / 1000);
    if (diff < 60) return `${diff}s ago`;
    return `${Math.floor(diff / 60)}m ago`;
  };

  const sortByTime = (a, b) => new Date(a.created_at) - new Date(b.created_at);

  const pending = orders.filter((o) => o.status === "pending").sort(sortByTime);
  const accepted = orders.filter((o) => o.status === "accepted").sort(sortByTime);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Kitchen display</h1>
            <p className="mt-2 text-slate-400">Monitor incoming orders and manage kitchen workflow.</p>
          </div>
          <button
            onClick={toggleFullscreen}
            className="rounded-3xl bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Fullscreen
          </button>
        </div>

        <p className="mb-8 text-sm text-slate-500">Updated {getTimeAgo()}</p>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-amber-400">Waiting orders</h2>
            {pending.length === 0 ? (
              <div className="rounded-[2rem] bg-slate-800 p-6 text-center">
                <p className="text-slate-400">No waiting orders.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {pending.map((order) => (
                  <KitchenCard 
                    key={order.id} 
                    order={order} 
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-400">In progress</h2>
            {accepted.length === 0 ? (
              <div className="rounded-[2rem] bg-slate-800 p-6 text-center">
                <p className="text-slate-400">No orders in progress.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {accepted.map((order) => (
                  <KitchenCard 
                    key={order.id} 
                    order={order} 
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kitchen;