import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login as loginApi } from "../api/authApi";

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
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage to-oat-gold flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-charcoal rounded-full mb-4">
            <span className="text-2xl text-white">🔐</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">Welcome Back</h1>
          <p className="text-sage">Sign in to access the admin panel</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-slate-300 rounded-3xl focus:ring-2 focus:ring-oat-gold focus:border-transparent outline-none transition-colors"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-3xl focus:ring-2 focus:ring-oat-gold focus:border-transparent outline-none transition-colors"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={loading}
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full rounded-3xl bg-oat-gold px-6 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-oat-gold/20 transition hover:bg-oat-gold/80 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
