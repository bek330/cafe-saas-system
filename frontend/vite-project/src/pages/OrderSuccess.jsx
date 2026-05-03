import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderId = state?.orderId;
  const total = state?.total;
  const items = state?.items || [];
  const tableNumber = state?.tableNumber || items[0]?.tableNumber;

  if (!orderId) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-serif font-bold text-charcoal mb-2">Order Not Found</h1>
          <p className="text-sage mb-6">The order you're looking for doesn't exist or may have expired.</p>
          <button
            onClick={() => navigate("/menu")}
            className="rounded-full bg-oat-gold px-6 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-oat-gold/20 transition hover:bg-oat-gold/80"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sage rounded-full mb-6">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-charcoal mb-4">Order Confirmed!</h1>
          <p className="text-xl text-sage">Thank you for your order. Your delicious meal is being prepared!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200">
            <div className="text-2xl mb-2">📋</div>
            <p className="text-sm text-sage uppercase tracking-wide">Order Number</p>
            <p className="text-2xl font-serif font-bold text-charcoal">#{orderId}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200">
            <div className="text-2xl mb-2">🪑</div>
            <p className="text-sm text-sage uppercase tracking-wide">Table</p>
            <p className="text-2xl font-serif font-bold text-charcoal">{tableNumber ?? "Not specified"}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200">
            <div className="text-2xl mb-2">💰</div>
            <p className="text-sm text-sage uppercase tracking-wide">Total</p>
            <p className="text-2xl font-serif font-bold text-charcoal">{total} ETB</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-slate-200">
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Order Summary</h2>
          <div className="space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{item.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-charcoal">{item.name}</p>
                      <p className="text-sage">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-charcoal">{item.price * item.quantity} ETB</p>
                </div>
              ))
            ) : (
              <p className="text-sage text-center">No items found in this order.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/menu")}
            className="rounded-full bg-oat-gold px-8 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-oat-gold/20 transition hover:bg-oat-gold/80"
          >
            Continue Shopping
          </button>
          <a
            href="mailto:support@cafe.com"
            className="rounded-full border-2 border-oat-gold text-oat-gold hover:bg-oat-gold hover:text-charcoal px-8 py-3 text-sm font-semibold transition-colors text-center"
          >
            Need Help?
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
