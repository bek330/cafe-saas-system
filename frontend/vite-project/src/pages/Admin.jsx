/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
import { useEffect, useState, useRef } from "react";
import OrderColumn from "../components/OrderColumn";
import { getOrders, updateOrderStatus } from "../api/orderApi";

function Admin() {
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
      const token = localStorage.getItem("token");
      const data = await getOrders(token);
      setOrders(data);
      setLastUpdate(Date.now());
    } catch (err) {
      console.error(err);
      // If token is invalid/expired, redirect to login
      if (err.message.includes("Request failed") || err.message.includes("401")) {
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
      const token = localStorage.getItem("token");
      await updateOrderStatus(id, status, token);
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
    <div ref={topRef} className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">Kitchen flow</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Admin dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              Updated {Math.floor((Date.now() - lastUpdate) / 1000)}s ago
            </span>
            <button
              onClick={fetchOrders}
              className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-4">
        <OrderColumn title="Pending" orders={pending} updateStatus={updateStatus} />
        <OrderColumn title="Accepted" orders={accepted} updateStatus={updateStatus} />
        <OrderColumn title="Completed" orders={completed} updateStatus={updateStatus} />
        <OrderColumn title="Cancelled" orders={cancelled} updateStatus={updateStatus} />
      </div>
    </div>
  );
}

export default Admin;
