import useOrderHistory from "../hooks/useOrderHistory";
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  ArrowLeft, 
  ArrowRight,
  RefreshCw,
  FileText,
  Clock
} from "lucide-react";

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
      <div className="rounded-[2.5rem] border border-white bg-white p-6 shadow-md animate-pulse">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-3 flex-1">
            <div className="h-6 w-1/4 rounded-full bg-slate-100"></div>
            <div className="h-4 w-1/3 rounded-full bg-slate-50"></div>
          </div>
          <div className="h-8 w-24 rounded-full bg-slate-100"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-slate-50"></div>
          <div className="h-4 w-full rounded-full bg-slate-50"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (s) => {
    switch (s) {
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'accepted': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="space-y-8 bg-cream min-h-screen p-6">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-100">
        <div className="mb-8 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-oat-gold font-bold">Records & Analytics</p>
          <h1 className="mt-3 text-4xl font-serif font-black text-charcoal">Order History</h1>
          <p className="mt-2 text-sage italic">Filter and review past orders to track your restaurant performance.</p>
        </div>

        <div className="bg-cream/30 p-8 rounded-[2.5rem] border border-dashed border-sage/20">
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                <input
                  type="text"
                  placeholder="Search order ID or table..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-full border-2 border-transparent bg-white pl-12 pr-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className="w-full appearance-none rounded-full border-2 border-transparent bg-white pl-12 pr-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                <select
                  value={range}
                  onChange={(e) => {
                    setRange(e.target.value);
                    setPage(1);
                  }}
                  className="w-full appearance-none rounded-full border-2 border-transparent bg-white pl-12 pr-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all cursor-pointer"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">From Date</label>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">To Date</label>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all"
                />
              </div>

              <div className="lg:col-span-2 flex gap-3">
                <button
                  onClick={fetchHistory}
                  className="flex-1 rounded-full bg-charcoal px-8 py-4 text-sm font-black text-cream shadow-xl shadow-charcoal/20 transition hover:bg-charcoal/90 active:scale-95 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Apply Filters
                </button>
                <label className="flex items-center gap-3 px-6 py-4 rounded-full bg-white border-2 border-transparent hover:border-oat-gold/30 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="w-4 h-4 rounded border-sage/30 text-oat-gold focus:ring-oat-gold"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-charcoal">Auto Refresh</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6">
        {loading ? (
          <div className="grid gap-6">
            {[...Array(5)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-[2.5rem] bg-white p-12 text-center border border-dashed border-sage/20 shadow-sm">
            <FileText className="w-12 h-12 text-sage/20 mx-auto mb-4" />
            <p className="text-sage font-medium italic">No results match your criteria.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="group relative rounded-[2.5rem] border border-white bg-white p-8 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center">
                    <History className="w-7 h-7 text-oat-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-black text-charcoal">Order #{order.id}</h3>
                    <div className="flex items-center gap-2 text-sage">
                      <Clock className="w-3 h-3" />
                      <p className="text-[10px] font-black uppercase tracking-widest">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>

              <div className="space-y-4 mb-8 px-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-oat-gold/30 group-hover/item:bg-oat-gold transition-colors"></div>
                      <span className="text-sm font-bold text-charcoal">{item.name}</span>
                      <span className="text-[10px] font-black text-sage uppercase tracking-widest">x{item.quantity}</span>
                    </div>
                    <span className="text-sm font-black text-charcoal">{(item.price * item.quantity).toLocaleString()} ETB</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-cream/40 rounded-2xl p-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-sage">Order Total</span>
                <span className="text-2xl font-serif font-black text-charcoal">
                  {Number(order.total).toLocaleString()} <span className="text-xs text-oat-gold uppercase tracking-tighter">ETB</span>
                </span>
              </div>
            </div>
          ))
        )}
      </section>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-charcoal transition-all hover:bg-oat-gold disabled:opacity-30 disabled:hover:bg-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-50">
            <span className="text-[10px] font-black uppercase tracking-widest text-sage">Page</span>
            <span className="text-sm font-black text-charcoal">{page}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-sage">of {totalPages}</span>
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-charcoal transition-all hover:bg-oat-gold disabled:opacity-30 disabled:hover:bg-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminHistory;
