import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Admin access password - you can change this
  const ADMIN_PASSWORD = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if password is correct
    if (password === ADMIN_PASSWORD) {
      // Store admin access in session storage
      sessionStorage.setItem("adminAccess", "true");
      navigate("/admin/login");
    } else {
      setError("Incorrect password. Access denied.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔒 Admin Access</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Enter the admin password to access the administration panel.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="adminPassword">Admin Password</label>
            <input
              type="password"
              id="adminPassword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Access Admin Panel"}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo password: admin123</p>
          <p><a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>← Back to User Login</a></p>
        </div>
      </div>
    </div>
  );
}