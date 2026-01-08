import { useState } from "react";
import { login } from "../../api/authApi";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check against local users
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.username === formData.username && u.password === formData.password);

      if (user) {
        localStorage.setItem("user", JSON.stringify({ username: user.username, role: user.role }));
        window.location.href = "/user/dashboard";
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials: user / 1234</p>
          <p><a href="/admin/login" style={{ color: '#667eea', textDecoration: 'none' }}>Admin Login →</a></p>
        </div>
      </div>
    </div>
  );
}
