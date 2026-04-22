import { useEffect, useState, useRef } from "react";
import OrderColumn from "../components/OrderColumn";
import { getOrders, updateOrderStatus } from "../api/orderApi";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [prevCount, setPrevCount] = useState(0);
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
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (orders.length > prevCount) {
      playSound();
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const pending = orders.filter((o) => o.status === "pending");
  const accepted = orders.filter((o) => o.status === "accepted");
  const completed = orders.filter((o) => o.status === "completed");

  return (
    <div ref={topRef} className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      {orders.length === 0 && (
        <p className="text-gray-500 text-center mt-10">No orders yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}

export default Admin;
