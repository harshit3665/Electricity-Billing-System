import { useState } from "react";
import { getUserUsage } from "../../api/adminApi";

export default function Reports() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    if (!username) {
      alert("Enter username");
      return;
    }

    try {
      const res = await getUserUsage(username);
      setData(res.data);
    } catch (err) {
      alert("No data found");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Electricity Reports</h2>

      <input
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <br /><br />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Total Units</th>
            <th>Total Bill (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4">No records</td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <td>{row.month}</td>
                <td>{row.year}</td>
                <td>{row.totalUnits}</td>
                <td>{row.totalBill}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
