import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Cart from "../components/cart";
import Footer from "../components/Footer";
import { useCart } from "../contexts/useCart";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  IoCafeOutline, 
  IoPizzaOutline, 
  IoWineOutline,
  IoLeafOutline
} from "react-icons/io5";
import { GiCupcake, GiCroissant } from "react-icons/gi";

function OrderLayout() {
  const { cart } = useCart();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-coffee-950 flex flex-col selection:bg-coffee-400 selection:text-coffee-900 relative overflow-hidden font-sans">
      {/* Animated & Geometric Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Geometric Dot Grid */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `radial-gradient(#a68a6d 1px, transparent 1px)`, 
            backgroundSize: '40px 40px',
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
          }}
        ></div>

        {/* Large Rotating Architectural Arcs */}
        <Motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] border-[0.5px] border-coffee-400/10 rounded-full"
        />
        <Motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[90vw] h-[90vw] border-[0.5px] border-coffee-300/10 rounded-full"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border-[0.5px] border-coffee-400/5 rounded-full" />
        </Motion.div>

        {/* Luxury Geometric Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, #a68a6d 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `linear-gradient(#a68a6d 0.5px, transparent 0.5px), linear-gradient(90deg, #a68a6d 0.5px, transparent 0.5px)`,
            backgroundSize: '128px 128px'
          }}
        ></div>

        {/* Drifting Cafe Icons (Global) */}
        <Motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] text-coffee-400/5 hidden lg:block"
        >
          <IoCafeOutline size={120} />
        </Motion.div>
        
        <Motion.div 
          animate={{ y: [0, 40, 0], x: [0, -25, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[15%] text-coffee-400/5 hidden lg:block"
        >
          <GiCroissant size={80} />
        </Motion.div>

        <Motion.div 
          animate={{ y: [0, -50, 0], x: [0, -30, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] right-[10%] text-coffee-400/5 hidden lg:block"
        >
          <GiCupcake size={100} />
        </Motion.div>

        <Motion.div 
          animate={{ y: [0, 35, 0], x: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[10%] right-[25%] text-coffee-400/5 hidden lg:block"
        >
          <IoPizzaOutline size={70} />
        </Motion.div>

        <Motion.div 
          animate={{ y: [0, -20, 0], x: [0, 40, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[10%] right-[30%] text-coffee-400/5 hidden lg:block"
        >
          <IoWineOutline size={90} />
        </Motion.div>

        <Motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[60%] left-[40%] text-coffee-400/5 hidden lg:block"
        >
          <IoLeafOutline size={60} />
        </Motion.div>

        {/* Interactive Spotlight */}
        <Motion.div 
          className="absolute inset-0 z-0 opacity-40"
          animate={{
            background: `radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(166, 138, 109, 0.08), transparent 80%)`
          }}
        />

        {/* Drifting Blobs */}
        <Motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-coffee-800/10 rounded-full blur-[120px]"
        />
        <Motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-coffee-900/30 rounded-full blur-[150px]"
        />

        {/* Subtle Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col flex-1">
        <Header />

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 px-4 py-8 md:py-16 lg:flex-row items-start flex-1">
          <main className="flex-1 w-full bg-coffee-900/40 rounded-[3rem] shadow-2xl p-6 md:p-16 border border-white/5 backdrop-blur-md relative overflow-hidden">
            {/* Subtle local light effect in the corner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-400/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <Outlet />
            </div>
          </main>

          <AnimatePresence>
            {cart.length > 0 && (
              <Motion.aside 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full lg:w-[400px] sticky top-28"
              >
                <Cart />
              </Motion.aside>
            )}
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default OrderLayout;
