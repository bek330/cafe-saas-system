import useOrderHistory from "../hooks/useOrderHistory";

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
      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 animate-pulse">
        <div className="h-4 w-1/3 rounded-full bg-slate-200"></div>
        <div className="mt-4 h-3 w-1/2 rounded-full bg-slate-200"></div>
        <div className="mt-3 h-3 w-full rounded-full bg-slate-200"></div>
        <div className="mt-3 h-3 w-full rounded-full bg-slate-200"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-600">Order history</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Search and review orders</h1>
        <p className="mt-2 text-slate-500">Filter orders by status, date range, and search terms to find the data you need quickly.</p>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Search by order ID or table..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
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
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <div className="flex items-center gap-3">
              <label className="min-w-max text-sm text-slate-600">From:</label>
              <input
                type="date"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="min-w-max text-sm text-slate-600">To:</label>
              <input
                type="date"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <button
              onClick={fetchHistory}
              className="rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700"
            >
              Apply filters
            </button>
            <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
              />
              Auto Refresh
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {loading && (
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="rounded-[2rem] bg-white p-6 shadow-xl text-slate-500">No results found.</div>
        )}

        {!loading && orders.map((order) => (
          <div key={order.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900">Order #{order.id}</p>
                <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleString()}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{order.status}</span>
            </div>

            <div className="mt-4 space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-slate-700">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{item.price * item.quantity} ETB</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-semibold text-slate-900">
              <span>Total</span>
              <span>{order.total} ETB</span>
            </div>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-3xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-sm text-slate-600">Page {page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-3xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminHistory;
