/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
import { useEffect, useState, useRef } from "react";
import OrderColumn from "../components/OrderColumn";
import { getOrders, updateOrderStatus } from "../api/orderApi";
import { 
  ShoppingBag, 
  RefreshCw, 
  Clock,
  History
} from "lucide-react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [prevCount, setPrevCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const topRef = useRef(null);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const playSound = () => {
    const audio = new Audio("/notification.wav");
    audio.play().catch(() => {});
  };

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      setLastUpdate(Date.now());
    } catch (err) {
      console.error(err);
      // If token is invalid/expired, redirect to login
      if (err.message.includes("Network response was not ok") || err.message.includes("401")) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    if (orders.length > prevCount) {
      playSound();
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setPrevCount(orders.length);
  }, [orders, prevCount]);

  const updateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      alert(err.message);
      fetchOrders();
    }
  };


  const sortByTime = (a, b) => new Date(a.created_at) - new Date(b.created_at);

  const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const pending = orders.filter((o) => o.status === "pending").sort(sortByTime);
  const accepted = orders.filter((o) => o.status === "accepted").sort(sortByTime);
  const completed = orders
    .filter((o) => o.status === "completed" && isToday(o.created_at))
    .sort(sortByTime);
  const cancelled = orders.filter((o) => o.status === "cancelled").sort(sortByTime);

  return (
    <div ref={topRef} className="space-y-8 bg-cream min-h-screen p-6">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-100">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-oat-gold/10 rounded-2xl">
                <ShoppingBag className="w-6 h-6 text-oat-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-oat-gold font-bold">Kitchen flow</p>
                <h1 className="mt-1 text-4xl font-serif font-black text-charcoal">Live Orders</h1>
              </div>
            </div>
            <p className="mt-2 text-sage italic">Manage incoming orders and track kitchen progress in real-time.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-cream px-5 py-3 border border-oat-gold/20 shadow-sm">
              <Clock className="w-4 h-4 text-sage" />
              <span className="text-[10px] font-black uppercase tracking-widest text-charcoal">
                Updated {Math.floor((Date.now() - lastUpdate) / 1000)}s ago
              </span>
            </div>
            <button
              onClick={fetchOrders}
              className="rounded-full bg-charcoal px-8 py-3 text-sm font-black text-cream shadow-xl shadow-charcoal/20 transition hover:bg-charcoal/90 active:scale-95 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-4">
        <OrderColumn title="Pending" orders={pending} updateStatus={updateStatus} />
        <OrderColumn title="Accepted" orders={accepted} updateStatus={updateStatus} />
        <OrderColumn title="Completed" orders={completed} updateStatus={updateStatus} />
        <OrderColumn title="Cancelled" orders={cancelled} updateStatus={updateStatus} />
      </div>
    </div>
  );
}

export default AdminOrders;
