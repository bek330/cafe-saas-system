import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";

function AdminPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });

      // Refresh orders after update
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
    <div style={{ padding: "20px" }}>
      <h1>Admin Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            background: "#f9f9f9",
          }}
        >
          <h3>Table {order.table_number}</h3>
          <p>
            Status:{" "}
            <span
              style={{
                color:
                  order.status === "pending"
                    ? "red"
                    : order.status === "preparing"
                      ? "orange"
                      : "green",
              }}
            >
              {order.status}
            </span>
          </p>

          <div>
            {order.items?.map((item, index) => (
              <div key={index}>
                {item.name} x {item.quantity}
              </div>
            ))}
          </div>

          <strong>Total: ${order.total?.toFixed(2)}</strong>

          <div>
            <button onClick={() => updateStatus(order.id, "preparing")}>
              Preparing
            </button>

            <button onClick={() => updateStatus(order.id, "pending")}>
              pending
            </button>

            <button
              disabled={order.status === "served"}
              onClick={() => updateStatus(order.id, "served")}
            >
              Served
            </button>
          </div>
        </div>
      ))}
    </div>
    </AdminLayout>
  );
}

export default AdminPage;
