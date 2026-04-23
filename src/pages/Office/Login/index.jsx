import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Basic validation
      if (!form.email || !form.password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      // Simulate successful login
      localStorage.setItem(
        "summacapital_token",
        "mock-jwt-token-" + Date.now(),
      );
      localStorage.setItem(
        "summacapital_user",
        JSON.stringify({
          email: form.email,
          name: form.email.split("@")[0],
        }),
      );

      navigate("/office/dashboard");
    } catch (err) {
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg" />

      <div className="login-content">
        {/* Left - Branding */}
        <div className="login-brand">
          <div className="login-logo">
            <img
              src="/images/logo-gold.png"
              alt="Summa Capital Logo"
              className="login-logo-icon"
            />
          </div>
          {/* <h1 className="login-title">Summa Capital</h1> */}
          {/* <p className="login-subtitle">CMS Dashboard</p> */}
          {/* <p className="login-description">
            Content and asset management portal for Summa Capital administrators.
          </p> */}
        </div>

        {/* Right - Form */}
        <div className="login-form-wrap">
          <div className="login-form-card">
            <h2 className="login-form-title">Login to Dashboard</h2>
            <p className="login-form-desc">
              Use your credentials to access
            </p>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="admin@summacapital.co.id"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>

              <div className="form-row">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={form.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>
                <a href="/office/forgot-password" className="form-link">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Processing..." : "Login"}
              </button>
            </form>

            <div className="login-footer">
              <p>Demo: use any email with any password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
