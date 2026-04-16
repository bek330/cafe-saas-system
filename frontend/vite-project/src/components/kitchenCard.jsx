export default function KitchenCard({ order }) {
  return (
    <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">#{order.id}</h2>

        <span className={`text-sm px-2 py-1 rounded ${
          order.status === "pending" ? "bg-red-500" : "bg-yellow-500"
        }`}>
          {order.status}
        </span>
      </div>

      {order.table_number && (
        <p className="mb-2">Table: {order.table_number}</p>
      )}

      <div className="space-y-1 text-2xl font-semibold">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-lg">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-400">
        {new Date(order.created_at).toLocaleTimeString()}
      </p>
    </div>
  );
}