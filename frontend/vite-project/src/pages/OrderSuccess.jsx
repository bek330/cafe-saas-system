import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Coffee, Hash, ArrowRight, Utensils, HelpCircle, XCircle } from "lucide-react";

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
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md border border-slate-100">
          <XCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-black text-charcoal mb-4 uppercase tracking-tighter">Order Not Found</h1>
          <p className="text-sage mb-8 leading-relaxed">The order you're looking for doesn't exist or may have expired. Let's get you back to the menu.</p>
          <button
            onClick={() => navigate("/menu")}
            className="w-full rounded-full bg-charcoal px-8 py-4 text-sm font-bold text-cream transition-all hover:bg-charcoal/90 active:scale-95 shadow-xl shadow-charcoal/20"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 text-center mb-8 border border-white">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-sage/10 rounded-full mb-8">
            <CheckCircle className="w-12 h-12 text-sage" />
          </div>
          <h1 className="text-5xl font-serif font-black text-charcoal mb-4 tracking-tighter uppercase">Order Confirmed!</h1>
          <p className="text-xl text-sage max-w-md mx-auto leading-relaxed">
            Thank you for choosing <span className="text-oat-gold font-bold">Safeland Cafe</span>. Your delicious meal is being prepared with care!
          </p>
        </div>

        {/* Order Number Focus Box */}
        <div className="bg-charcoal rounded-[2rem] shadow-2xl p-10 text-center mb-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="inline-flex items-center gap-2 bg-oat-gold/20 px-4 py-1 rounded-full mb-4 border border-oat-gold/30">
            <Hash className="w-4 h-4 text-oat-gold" />
            <span className="text-xs font-bold text-oat-gold uppercase tracking-[0.2em]">Transaction ID</span>
          </div>
          <p className="text-7xl font-serif font-black text-cream tracking-tighter">#{orderId}</p>
          <p className="mt-4 text-sage text-sm font-medium uppercase tracking-widest opacity-80">Please keep this number for your reference</p>
        </div>

        {/* Details Grid */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="bg-white rounded-3xl shadow-md p-8 flex items-center gap-6 border border-white">
            <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center">
              <Coffee className="w-7 h-7 text-oat-gold" />
            </div>
            <div>
              <p className="text-[10px] text-sage font-black uppercase tracking-widest mb-1">Table Assigned</p>
              <p className="text-2xl font-serif font-black text-charcoal">{tableNumber ?? "Self-Pickup"}</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-md p-8 flex items-center gap-6 border border-white">
            <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center">
              <span className="text-xl font-black text-sage">ETB</span>
            </div>
            <div>
              <p className="text-[10px] text-sage font-black uppercase tracking-widest mb-1">Total Paid</p>
              <p className="text-2xl font-serif font-black text-charcoal">{total} <span className="text-sm font-medium">.00</span></p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-[2rem] shadow-lg p-10 mb-10 border border-slate-50">
          <div className="flex items-center gap-3 mb-8">
            <Utensils className="w-6 h-6 text-oat-gold" />
            <h2 className="text-2xl font-serif font-black text-charcoal uppercase tracking-tighter">Order Summary</h2>
          </div>
          <div className="space-y-6">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-dashed border-slate-100 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-charcoal font-black text-sm">
                      {item.quantity}x
                    </div>
                    <div>
                      <p className="font-bold text-charcoal uppercase text-sm tracking-tight">{item.name}</p>
                      <p className="text-[10px] text-sage font-bold uppercase tracking-widest">{item.price} ETB / Unit</p>
                    </div>
                  </div>
                  <p className="font-black text-charcoal">{item.price * item.quantity} ETB</p>
                </div>
              ))
            ) : (
              <p className="text-sage text-center font-serif italic">No item details available.</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/menu")}
            className="flex-1 rounded-full bg-oat-gold px-8 py-5 text-sm font-black text-charcoal uppercase tracking-widest shadow-xl shadow-oat-gold/20 transition-all hover:bg-oat-gold/90 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            Order Something Else
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="mailto:support@safelandcafe.com"
            className="rounded-full bg-white border-2 border-slate-100 text-charcoal px-8 py-5 text-sm font-black uppercase tracking-widest transition-all hover:border-oat-gold hover:text-oat-gold flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
