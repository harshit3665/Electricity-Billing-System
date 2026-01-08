export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div>Electricity Billing</div>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
