import { useLocation, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { 
  IoCheckmarkCircle, 
  IoCafeOutline, 
  IoArrowForward, 
  IoRestaurantOutline, 
  IoHelpCircleOutline, 
  IoCloseCircleOutline,
  IoPrintOutline,
  IoShareSocialOutline
} from "react-icons/io5";

function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderId = state?.orderId;
  const total = state?.total;
  const items = state?.items || [];
  const tableNumber = state?.tableNumber || items[0]?.tableNumber;

  if (!orderId) {
    return (
      <div className="min-h-screen bg-coffee-900 flex items-center justify-center px-6">
        <Motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-coffee-800/50 backdrop-blur-xl rounded-[3rem] shadow-2xl p-12 text-center max-w-md border border-coffee-700/30"
        >
          <IoCloseCircleOutline className="w-24 h-24 text-red-400 mx-auto mb-8" />
          <h1 className="text-3xl font-serif font-black text-coffee-50 mb-4 uppercase tracking-tighter leading-tight">Order Session <br /> Expired</h1>
          <p className="text-coffee-300 mb-10 leading-relaxed font-light">The order details could not be retrieved. Let's get you back to our selection.</p>
          <button
            onClick={() => navigate("/menu")}
            className="w-full rounded-2xl bg-coffee-400 px-8 py-5 text-xs font-black text-coffee-900 uppercase tracking-widest transition-all hover:bg-coffee-300 active:scale-95 shadow-xl shadow-coffee-400/20"
          >
            Back to Menu
          </button>
        </Motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-28 h-28 bg-coffee-400/10 rounded-full mb-10 border border-coffee-400/20">
            <IoCheckmarkCircle className="w-16 h-16 text-coffee-200" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-coffee-50 mb-6 tracking-tight leading-none uppercase">
            Order <span className="italic font-normal text-coffee-300">Confirmed</span>
          </h1>
          <p className="text-xl text-coffee-300 max-w-lg mx-auto leading-relaxed font-light italic">
            Thank you for choosing Safeland Cafe. Your selection is being masterfully prepared by our chefs.
          </p>
        </Motion.div>

        {/* Transaction Focus Box */}
        <Motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-coffee-400 to-coffee-300 rounded-[3rem] shadow-2xl p-12 text-center mb-12 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 text-coffee-900/10 transition-transform group-hover:scale-110">
            <IoCafeOutline size={180} />
          </div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-black text-coffee-900/60 uppercase tracking-[0.5em] mb-4 block">Transaction ID</span>
            <p className="text-7xl md:text-9xl font-serif font-black text-coffee-900 tracking-tighter leading-none mb-4">#{orderId}</p>
            <p className="text-coffee-900 text-xs font-black uppercase tracking-widest opacity-70 italic">A sanctuary for taste and tranquility</p>
          </div>
        </Motion.div>

        {/* Details Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-coffee-800/30 backdrop-blur-md rounded-[2.5rem] p-10 flex items-center gap-8 border border-coffee-700/30"
          >
            <div className="w-16 h-16 bg-coffee-900 rounded-2xl flex items-center justify-center text-coffee-400">
              <IoRestaurantOutline size={28} />
            </div>
            <div>
              <p className="text-[10px] text-coffee-400 font-black uppercase tracking-[0.3em] mb-2">Service Point</p>
              <p className="text-3xl font-serif font-light text-white">{tableNumber ?? "Collection"}</p>
            </div>
          </Motion.div>
          
          <Motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-coffee-800/30 backdrop-blur-md rounded-[2.5rem] p-10 flex items-center gap-8 border border-coffee-700/30"
          >
            <div className="w-16 h-16 bg-coffee-900 rounded-2xl flex items-center justify-center text-coffee-400 font-black">
              ETB
            </div>
            <div>
              <p className="text-[10px] text-coffee-400 font-black uppercase tracking-[0.3em] mb-2">Total Amount</p>
              <p className="text-3xl font-serif font-light text-white">{total}.00</p>
            </div>
          </Motion.div>
        </div>

        {/* Order Summary Summary */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-coffee-800/20 backdrop-blur-sm rounded-[3rem] p-12 mb-16 border border-coffee-700/20"
        >
          <div className="flex items-center justify-between mb-12 border-b border-coffee-800 pb-8">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-coffee-400"></div>
              <h2 className="text-2xl font-serif font-light text-white uppercase tracking-tight">Order Summary</h2>
            </div>
            <div className="flex gap-4">
              <button className="p-3 rounded-full border border-coffee-700 text-coffee-400 hover:text-white hover:border-coffee-400 transition-all">
                <IoPrintOutline size={18} />
              </button>
              <button className="p-3 rounded-full border border-coffee-700 text-coffee-400 hover:text-white hover:border-coffee-400 transition-all">
                <IoShareSocialOutline size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-coffee-900 rounded-2xl flex items-center justify-center text-coffee-400 font-serif font-black text-lg border border-coffee-800 group-hover:border-coffee-400 transition-all">
                      {item.quantity}
                    </div>
                    <div>
                      <p className="font-light text-white text-xl tracking-wide italic">{item.name}</p>
                      <p className="text-[9px] text-coffee-500 font-black uppercase tracking-[0.2em] mt-1">{item.price} ETB / Piece</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-light text-white text-xl">{item.price * item.quantity}.00</p>
                    <p className="text-[8px] text-coffee-500 font-black uppercase tracking-widest">ETB</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-coffee-500 text-center font-serif italic py-10">No item details available.</p>
            )}
          </div>
        </Motion.div>

        {/* Final Actions */}
        <Motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={() => navigate("/menu")}
            className="group flex-1 rounded-2xl bg-coffee-400 px-8 py-6 text-xs font-black text-coffee-900 uppercase tracking-widest shadow-2xl shadow-coffee-400/20 transition-all hover:bg-coffee-300 flex items-center justify-center gap-3"
          >
            Explore More Delights
            <IoArrowForward className="transition-transform group-hover:translate-x-1" size={18} />
          </button>
          <a
            href="mailto:concierge@safelandcafe.com"
            className="rounded-2xl bg-transparent border border-coffee-700 text-coffee-400 px-10 py-6 text-xs font-black uppercase tracking-widest transition-all hover:border-coffee-400 hover:text-white hover:bg-white/5 flex items-center justify-center gap-3"
          >
            <IoHelpCircleOutline size={20} />
            Concierge Support
          </a>
        </Motion.div>
      </div>
    </div>
  );
}

export default OrderSuccess;
