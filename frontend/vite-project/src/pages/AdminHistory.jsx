
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function AdminHistory() {
  const [orders, setOrders] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all"); // ✅ added
  const [range, setRange] = useState("all");   // ✅ added

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // ✅ added

  const limit = 10;

  const fetchHistory = async () => {
    try {
      const params = new URLSearchParams({
        range,
        status,
        search,
        page,
        limit,
        from,
        to,
      });

      const res = await fetch(
        `http://localhost:5000/orders/history?${params.toString()}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!res.ok) {
        console.error("Failed to fetch:", res.status);
        return;
      }

      const data = await res.json();

      setOrders(data.data || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [range, status, search, page, from, to]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by order ID or table..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full md:w-64"
        />

        {/* STATUS FILTER */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* RANGE FILTER */}
        <select
          value={range}
          onChange={(e) => {
            setRange(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
        </select>

        <input
          type="date"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            setPage(1);
          }}
          className="border p-2"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            setPage(1);
          }}
          className="border p-2"
        />

        <button
          onClick={fetchHistory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {/* 📜 List */}
      <div className="space-y-3">
        {orders.length === 0 && (
          <p className="text-gray-500">No results found</p>
        )}

        {orders.map((order) => (
          <div key={order.id} className="border p-3 rounded">
            <div className="flex justify-between">
              <p className="font-bold">#{order.id}</p>
              <span className="text-sm">{order.status}</span>
            </div>

            <p className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleString()}
            </p>

            <div className="mt-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{item.price * item.quantity} ETB</span>
                </div>
              ))}
            </div>

            <p className="mt-2 font-bold">Total: {order.total} ETB</p>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminHistory;

