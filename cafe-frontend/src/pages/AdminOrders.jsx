import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";

function AdminOrders() {
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
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      fetchOrders(); // refresh after update
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
          
        >
          <h3>Table {order.table_number}</h3>
          <p>
            Status:{" "}
            <strong
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
            </strong>
          </p>

          <div>
            <button onClick={() => updateStatus(order.id, "pending")}>
              Pending
            </button>

            <button onClick={() => updateStatus(order.id, "preparing")}>
              Preparing
            </button>

            <button onClick={() => updateStatus(order.id, "served")}>
              Served
            </button>
          </div>

          <ul >
            {order.items.map((item, i) => (
              <li  key={i}
              >
                {item.name} x {item.quantity} (${item.price})
              </li>
            ))}
          </ul>

          <strong>Total: ${order.total.toFixed(2)}</strong>
        </div>
      ))}
    </div>
    </AdminLayout>
  );
}

export default AdminOrders;
