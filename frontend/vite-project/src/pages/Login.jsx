import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      const data = await res.json();
      login(data.token);

      // decode token to get role
      const payload = JSON.parse(atob(data.token.split(".")[1]));

      if (payload.role === "admin") {
        navigate("/admin");
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Admin Login</h1>

      <input
        placeholder="Username"
        className="border p-2 mb-2"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loading}
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default Login;
