import useOrderHistory  from "../hooks/useOrderHistory";

function AdminHistory() {
  const {
    orders,
    loading,

    search,
    setSearch,

    status,
    setStatus,

    range,
    setRange,

    from,
    setFrom,

    to,
    setTo,

    page,
    setPage,

    totalPages,

    fetchHistory,

    autoRefresh,
    setAutoRefresh,
  } = useOrderHistory();

  function SkeletonCard() {
    return (
      <div className="border p-3 rounded animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 w-1/3"></div>
        <div className="h-3 bg-gray-200 w-1/2"></div>
        <div className="h-3 bg-gray-200 w-full"></div>
        <div className="h-3 bg-gray-200 w-full"></div>
      </div>
    );
  }

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
          className="border p-1 rounded w-full md:w-64"
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border p-1 rounded"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={range}
          onChange={(e) => {
            setRange(e.target.value);
            setPage(1);
          }}
          className="border p-1 rounded"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <label className="flex items-center gap-2">
          From:
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setPage(1);
            }}
            className="border p-1 rounded"
          />
        </label>

        <label className="flex items-center gap-2">
          To:
          <input
            type="date"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setPage(1);
            }}
            className="border p-1 rounded"
          />
        </label>

        <button
          onClick={fetchHistory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Apply
        </button>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
          Auto Refresh
        </label>
      </div>

      {/* ⏳ Loading */}
      {loading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {/* 📜 List */}
      <div className="space-y-3">
        {!loading && orders.length === 0 && (
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
