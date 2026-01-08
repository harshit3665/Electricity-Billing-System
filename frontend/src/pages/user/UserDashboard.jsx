import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UsageBarChart from "../../components/Charts/BarChart";
import UsagePieChart from "../../components/Charts/PieChart";

export default function UserDashboard() {
  const [usage, setUsage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.username) {
      // Load usage data from localStorage
      const allUsages = JSON.parse(localStorage.getItem("usages") || "{}");
      const userUsages = allUsages[user.username] || [];
      setUsage(userUsages);
      setLoading(false);
    }
  }, [user?.username]);

  // Handle bar click to select month for pie chart
  const handleBarClick = (data) => {
    if (data && data.month) {
      setSelectedMonth(data.month);
    }
  };

  // Prepare data for pie chart (component usage for selected month or latest)
  const displayUsage = selectedMonth 
    ? usage.find(u => u.month === selectedMonth) 
    : (usage.length > 0 ? usage[usage.length - 1] : null);
  
  const pieData = displayUsage && displayUsage.applianceUnits ?
    Object.entries(displayUsage.applianceUnits).map(([name, hours]) => {
      const component = JSON.parse(localStorage.getItem("components") || "{}")[user.username]?.find(c => c.name === name);
      const units = component ? (component.watt / 1000) * hours * 30 : 0; // Approximate calculation
      return {
        name: name,
        value: parseFloat(units.toFixed(2))
      };
    }).filter(item => item.value > 0) : [];

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Welcome, {user?.username}</h2>

        <h3>Monthly Electricity Usage</h3>

        {loading && <p>Loading usage data...</p>}

        {!loading && usage.length === 0 && (
          <p>No usage data available. Please contact admin to add your usage records.</p>
        )}

        {!loading && usage.length > 0 && (
          <><div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            marginBottom: "40px",
            justifyContent: "center"
          }}>
            <div style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              minWidth: "500px"
            }}>
              <h4 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
                Usage Bar Chart
                {selectedMonth && (
                  <div style={{ fontSize: "12px", color: "#007bff", marginTop: "5px" }}>
                    Clicked: {selectedMonth} 
                    <button 
                      onClick={() => setSelectedMonth(null)}
                      style={{ 
                        marginLeft: "10px", 
                        padding: "2px 6px", 
                        fontSize: "10px", 
                        background: "#dc3545", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "3px", 
                        cursor: "pointer" 
                      }}
                    >
                      Reset
                    </button>
                  </div>
                )}
              </h4>
              <UsageBarChart data={usage} onBarClick={handleBarClick} />
            </div>
            <div style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              minWidth: "400px"
            }}>
              <h4 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
                Component Usage Distribution
                {displayUsage && <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                  {displayUsage.month} {displayUsage.year}
                  {selectedMonth && <span style={{ color: "#007bff", fontWeight: "bold" }}> (Selected)</span>}
                </div>}
              </h4>
              {pieData.length > 0 ? (
                <UsagePieChart data={pieData} />
              ) : (
                <p style={{ textAlign: "center", color: "#666" }}>No component data available</p>
              )}
            </div>
          </div><div style={{ marginTop: "40px" }}>
            <h4>Monthly Usage Summary</h4>
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}>
                <thead>
                  <tr style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Month</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Year</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Units</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Bill (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {usage.map((u, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "12px" }}>{u.month}</td>
                      <td style={{ padding: "12px" }}>{u.year}</td>
                      <td style={{ padding: "12px" }}>{u.totalUnits}</td>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "#28a745" }}>{u.totalBill}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div></>
        )}
      </div>
    </>
  );
}
