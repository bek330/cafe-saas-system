import { useEffect, useState, useRef } from "react";
import OrderColumn from "../components/OrderColumn";

function Admin() {
  const [orders, setOrders] = useState([]);
  const topRef = useRef(null);

  const [prevCount, setPrevCount] = useState(0);

  const playSound = () => {
    const audio = new Audio("/notification.wav");
    audio.play().catch(() => {});
  };

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/orders");
    const data = await res.json();

    setOrders(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();

    //  auto refresh every 5 seconds
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
    await fetch(`http://localhost:5000/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    // update locally (fast UI)
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const pending = orders.filter((o) => o.status === "pending");
  const accepted = orders.filter((o) => o.status === "accepted");
  const completed = orders.filter((o) => o.status === "completed");

  return (
    <div ref={topRef} className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

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
