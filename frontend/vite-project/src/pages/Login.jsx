import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        alert("Invalid credentials");
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);

      // decode token to get role
      const payload = JSON.parse(atob(data.token.split(".")[1]));

      if (payload.role === "admin") {
        navigate("/admin");
      } else{
        alert("Unknown role");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Admin Login</h1>

      <input
        placeholder="Username"
        className="border p-2 mb-2"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="bg-black text-white px-4 py-2">
        Login
      </button>
    </div>
  );
}

export default Login;
