import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login as loginApi } from "../api/authApi";
import { motion as Motion } from "framer-motion";
import { IoLockClosedOutline, IoPersonOutline, IoKeyOutline, IoAlertCircleOutline } from "react-icons/io5";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await loginApi(username, password);
      login(data.token);

      // decode token to get role
      const payload = JSON.parse(atob(data.token.split(".")[1]));

      if (payload.role) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid role");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-coffee-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a68a6d 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-coffee-400/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-coffee-300/10 rounded-full blur-[120px]"></div>

      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-coffee-900/40 backdrop-blur-xl rounded-[3rem] shadow-2xl p-10 md:p-16 w-full max-w-lg border border-white/5 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-coffee-800/50 rounded-2xl mb-8 border border-coffee-700/30 text-coffee-400">
            <IoLockClosedOutline size={32} />
          </div>
          <h1 className="text-4xl font-serif font-light text-white mb-3 tracking-tight uppercase">Admin <span className="italic font-normal text-coffee-400">Sanctuary</span></h1>
          <p className="text-coffee-500 font-light italic">Enter your credentials to manage the experience.</p>
        </div>

        <form className="space-y-8">
          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-coffee-600 ml-1">Username</label>
            <div className="relative">
              <IoPersonOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-coffee-700" size={20} />
              <input
                type="text"
                placeholder="Staff ID or Username"
                className="w-full pl-14 pr-6 py-5 bg-coffee-800/30 border border-coffee-700/50 focus:border-coffee-400 rounded-2xl font-serif text-coffee-50 outline-none transition-all placeholder:text-coffee-700 placeholder:italic"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-coffee-600 ml-1">Password</label>
            <div className="relative">
              <IoKeyOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-coffee-700" size={20} />
              <input
                type="password"
                placeholder="Access Key"
                className="w-full pl-14 pr-6 py-5 bg-coffee-800/30 border border-coffee-700/50 focus:border-coffee-400 rounded-2xl font-serif text-coffee-50 outline-none transition-all placeholder:text-coffee-700 placeholder:italic"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={loading}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleLogin}
              className="group relative w-full bg-coffee-400 text-coffee-900 py-6 text-xs font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-coffee-300 disabled:opacity-30 transition-all overflow-hidden"
              disabled={loading}
            >
              <span className="relative z-10">{loading ? "Authenticating..." : "Establish Access"}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {error && (
            <Motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-950/20 border border-red-500/20 rounded-2xl p-5 flex items-center justify-center gap-3"
            >
              <IoAlertCircleOutline className="text-red-400" size={20} />
              <p className="text-red-400 text-xs font-medium">{error}</p>
            </Motion.div>
          )}
        </form>

        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate("/")}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-coffee-700 hover:text-coffee-400 transition-colors"
          >
            Back to Public Menu
          </button>
        </div>
      </Motion.div>
    </div>
  );
}

export default Login;
