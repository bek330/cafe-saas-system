import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/adminApi";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Banknote, 
  UtensilsCrossed,
  LayoutDashboard
} from "lucide-react";

function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    revenue: 0,
    activeItems: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchSummary();
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: summary.totalOrders,
      icon: TrendingUp,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Pending Orders",
      value: summary.pendingOrders,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Completed Orders",
      value: summary.completedOrders,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Revenue",
      value: `${Number(summary.revenue).toLocaleString()} ETB`,
      icon: Banknote,
      color: "text-violet-500",
      bg: "bg-violet-50"
    },
    {
      title: "Active Menu Items",
      value: summary.activeItems,
      icon: UtensilsCrossed,
      color: "text-charcoal",
      bg: "bg-slate-50"
    },
  ];

  return (
    <div className="space-y-8 bg-cream min-h-screen p-6">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-100">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-oat-gold/10 rounded-2xl">
            <LayoutDashboard className="w-6 h-6 text-oat-gold" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-oat-gold font-bold">Analytics overview</p>
            <h1 className="mt-1 text-4xl font-serif font-black text-charcoal">Dashboard</h1>
          </div>
        </div>
        <p className="mt-4 text-sage italic">Monitor orders, revenue, and restaurant activity in real time.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative rounded-[2.5rem] border border-white bg-white p-8 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.bg} rounded-bl-[4rem] opacity-50 group-hover:scale-110 transition-transform duration-500`} />
            
            <div className="relative z-10">
              <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              
              <p className="text-[10px] text-sage font-black uppercase tracking-widest mb-1">{card.title}</p>
              <h2 className="text-3xl font-serif font-black text-charcoal tracking-tight">
                {card.value}
              </h2>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminDashboard;
