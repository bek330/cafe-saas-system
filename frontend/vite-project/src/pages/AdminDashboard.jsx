import { useEffect, useState, useCallback } from "react";
import { getDashboardSummary } from "../api/adminApi";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Banknote, 
  UtensilsCrossed,
  LayoutDashboard,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  ChefHat
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts';

function AdminDashboard() {
  const [range, setRange] = useState(7);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    orderGrowth: 0,
    pendingOrders: 0,
    completedOrders: 0,
    revenue: 0,
    revenueGrowth: 0,
    activeItems: 0,
    dailyRevenue: [],
    categorySales: [],
    topItems: [],
    peakHours: []
  });
  const [loading, setLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    try {
      const data = await getDashboardSummary(range);
      setSummary(data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  }, [range]);

  useEffect(() => {
    fetchSummary();
    const interval = setInterval(fetchSummary, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [fetchSummary]);

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(summary));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `dashboard_report_${new Date().toLocaleDateString()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const cards = [
    {
      title: "Revenue",
      value: `${Number(summary.revenue).toLocaleString()} ETB`,
      growth: summary.revenueGrowth,
      icon: Banknote,
      color: "text-violet-500",
      bg: "bg-violet-50"
    },
    {
      title: "Total Orders",
      value: summary.totalOrders,
      growth: summary.orderGrowth,
      icon: TrendingUp,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Completed",
      value: summary.completedOrders,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Pending",
      value: summary.pendingOrders,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Active Menu",
      value: summary.activeItems,
      icon: UtensilsCrossed,
      color: "text-slate-600",
      bg: "bg-slate-50"
    },
  ];

  const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#EC4899'];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-oat-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-cream min-h-screen p-6 pb-12">
      {/* Header with Filters */}
      <section className="rounded-[2.5rem] bg-white p-8 shadow-xl border border-slate-100">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-oat-gold/10 rounded-2xl">
              <LayoutDashboard className="w-8 h-8 text-oat-gold" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-oat-gold font-bold">Business Intelligence</p>
              <h1 className="mt-1 text-4xl font-serif font-black text-charcoal">Analytics</h1>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
              {[
                { label: 'Today', value: 1 },
                { label: '7D', value: 7 },
                { label: '30D', value: 30 },
                { label: '90D', value: 90 }
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setRange(f.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    range === f.value 
                      ? "bg-white text-charcoal shadow-sm" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            
            <button 
              onClick={exportData}
              className="flex items-center gap-2 rounded-2xl bg-charcoal px-5 py-3 text-sm font-bold text-white transition hover:bg-black active:scale-95 shadow-lg"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative rounded-[2.5rem] border border-white bg-white p-8 shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative z-10">
              <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              
              <p className="text-[10px] text-sage font-black uppercase tracking-widest mb-1">{card.title}</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-serif font-black text-charcoal tracking-tight">
                  {card.value}
                </h2>
                {card.growth !== undefined && (
                  <div className={`flex items-center text-xs font-bold ${card.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {card.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(card.growth)}%
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <section className="rounded-[2.5rem] bg-white p-8 shadow-lg border border-slate-100">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-serif font-black text-charcoal">Revenue Trends</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              Live
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={summary.dailyRevenue}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '1.25rem', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '1rem'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3B82F6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Peak Hours Chart */}
        <section className="rounded-[2.5rem] bg-white p-8 shadow-lg border border-slate-100">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-black text-charcoal">Hourly Traffic</h3>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.peakHours}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}}
                  tickFormatter={(h) => `${h}:00`}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} hide />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelFormatter={(h) => `${h}:00`}
                />
                <Bar 
                  dataKey="count" 
                  fill="#F59E0B" 
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Selling Items */}
        <section className="rounded-[2.5rem] bg-white p-8 shadow-lg border border-slate-100">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <ChefHat className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-xl font-serif font-black text-charcoal">Best Selling Items</h3>
          </div>
          
          <div className="space-y-4">
            {summary.topItems.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-slate-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal">{item.name}</h4>
                    <p className="text-xs text-sage font-medium">{item.sold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif font-black text-charcoal">{Number(item.revenue).toLocaleString()} ETB</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Distribution */}
        <section className="rounded-[2.5rem] bg-white p-8 shadow-lg border border-slate-100">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2 bg-violet-50 rounded-xl">
              <PieChartIcon className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="text-xl font-serif font-black text-charcoal">Sales Mix</h3>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary.categorySales}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  nameKey="category"
                  stroke="none"
                >
                  {summary.categorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-slate-600 font-bold text-xs uppercase tracking-wider">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
