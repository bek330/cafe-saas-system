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
      <div className="min-h-screen bg-coffee-900 flex items-center justify-center px-4">
        <div className="bg-coffee-800 rounded-[2.5rem] shadow-2xl p-10 text-center max-w-md border border-coffee-700/30">
          <XCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-black text-coffee-50 mb-4 uppercase tracking-tighter">Order Not Found</h1>
          <p className="text-coffee-300 mb-8 leading-relaxed">The order you're looking for doesn't exist or may have expired. Let's get you back to the menu.</p>
          <button
            onClick={() => navigate("/menu")}
            className="w-full rounded-full bg-coffee-400 px-8 py-4 text-sm font-bold text-coffee-900 transition-all hover:bg-coffee-300 active:scale-95 shadow-xl shadow-coffee-400/20"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-coffee-800/50 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-10 text-center mb-8 border border-coffee-700/30">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-coffee-400/10 rounded-full mb-8">
            <CheckCircle className="w-12 h-12 text-coffee-400" />
          </div>
          <h1 className="text-5xl font-serif font-black text-coffee-50 mb-4 tracking-tighter uppercase">Order Confirmed!</h1>
          <p className="text-xl text-coffee-300 max-w-md mx-auto leading-relaxed">
            Thank you for choosing <span className="text-coffee-400 font-bold italic">Safeland Cafe</span>. Your delicious meal is being prepared with care!
          </p>
        </div>

        {/* Order Number Focus Box */}
        <div className="bg-coffee-400 rounded-[2.5rem] shadow-2xl p-10 text-center mb-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="inline-flex items-center gap-2 bg-coffee-900/10 px-4 py-1 rounded-full mb-4 border border-coffee-900/10">
            <Hash className="w-4 h-4 text-coffee-900" />
            <span className="text-xs font-black text-coffee-900 uppercase tracking-[0.2em]">Transaction ID</span>
          </div>
          <p className="text-7xl font-serif font-black text-coffee-900 tracking-tighter">#{orderId}</p>
          <p className="mt-4 text-coffee-800 text-sm font-black uppercase tracking-widest opacity-80">Please keep this number for your reference</p>
        </div>

        {/* Details Grid */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="bg-coffee-800/40 rounded-3xl shadow-md p-8 flex items-center gap-6 border border-coffee-700/30">
            <div className="w-14 h-14 bg-coffee-900 rounded-2xl flex items-center justify-center">
              <Coffee className="w-7 h-7 text-coffee-400" />
            </div>
            <div>
              <p className="text-[10px] text-coffee-400 font-black uppercase tracking-widest mb-1">Table Assigned</p>
              <p className="text-2xl font-serif font-black text-coffee-50">{tableNumber ?? "Self-Pickup"}</p>
            </div>
          </div>
          <div className="bg-coffee-800/40 rounded-3xl shadow-md p-8 flex items-center gap-6 border border-coffee-700/30">
            <div className="w-14 h-14 bg-coffee-900 rounded-2xl flex items-center justify-center">
              <span className="text-xl font-black text-coffee-400">ETB</span>
            </div>
            <div>
              <p className="text-[10px] text-coffee-400 font-black uppercase tracking-widest mb-1">Total Paid</p>
              <p className="text-2xl font-serif font-black text-coffee-50">{total} <span className="text-sm font-medium">.00</span></p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-coffee-800/40 rounded-[2.5rem] shadow-lg p-10 mb-10 border border-coffee-700/30">
          <div className="flex items-center gap-3 mb-8">
            <Utensils className="w-6 h-6 text-coffee-400" />
            <h2 className="text-2xl font-serif font-black text-coffee-50 uppercase tracking-tighter">Order Summary</h2>
          </div>
          <div className="space-y-6">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-4 border-b border-dashed border-coffee-700/30 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-coffee-900 rounded-xl flex items-center justify-center text-coffee-400 font-black text-sm">
                      {item.quantity}
                    </div>
                    <div>
                      <p className="font-bold text-coffee-50 uppercase text-sm tracking-tight">{item.name}</p>
                      <p className="text-[10px] text-coffee-400 font-bold uppercase tracking-widest">{item.price} ETB / Unit</p>
                    </div>
                  </div>
                  <p className="font-black text-coffee-50">{item.price * item.quantity} ETB</p>
                </div>
              ))
            ) : (
              <p className="text-coffee-400 text-center font-serif italic">No item details available.</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/menu")}
            className="flex-1 rounded-full bg-coffee-400 px-8 py-5 text-xs font-black text-coffee-900 uppercase tracking-widest shadow-xl shadow-coffee-400/20 transition-all hover:bg-coffee-300 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            Order Something Else
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="mailto:support@safelandcafe.com"
            className="rounded-full bg-transparent border-2 border-coffee-700 text-coffee-50 px-8 py-5 text-xs font-black uppercase tracking-widest transition-all hover:border-coffee-400 hover:text-coffee-400 flex items-center justify-center gap-2"
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
