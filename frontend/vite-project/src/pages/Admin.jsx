import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OrderColumn from "../components/OrderColumn";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [prevCount, setPrevCount] = useState(0);
  const topRef = useRef(null);
  const navigate = useNavigate();

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

      const res = await fetch("http://localhost:5000/orders", {
        headers: {
          Authorization: token,
        },
      });

      if (res.status === 401) {
        // token invalid/expired → force re-login
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
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

      const res = await fetch(`http://localhost:5000/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      // optimistic UI update
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const pending = orders.filter((o) => o.status === "pending");
  const accepted = orders.filter((o) => o.status === "accepted");
  const completed = orders.filter((o) => o.status === "completed");

  

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  return (
    <div ref={topRef} className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
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
