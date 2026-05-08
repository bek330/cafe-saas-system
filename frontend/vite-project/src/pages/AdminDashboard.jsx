import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/adminApi";

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
      color: "text-cyan-600",
    },
    {
      title: "Pending Orders",
      value: summary.pendingOrders,
      color: "text-amber-500",
    },
    {
      title: "Completed Orders",
      value: summary.completedOrders,
      color: "text-emerald-600",
    },
    {
      title: "Revenue",
      value: `${summary.revenue} ETB`,
      color: "text-violet-400",
    },
    {
      title: "Active Menu Items",
      value: summary.activeItems,
      color: "text-slate-700",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">
          Analytics overview
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor orders, revenue, and restaurant activity in real time.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[2rem] bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <p className="text-sm text-slate-500">{card.title}</p>

            <h2 className={`mt-3 text-base font-bold ${card.color}`}>
              {card.value}
            </h2>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminDashboard;
