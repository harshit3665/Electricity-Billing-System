import { useEffect, useState } from "react";
import { getMyUsage } from "../../api/userApi";

export default function UsageHistory() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.username) {
      getMyUsage(user.username).then((res) => {
        setData(res.data);
      });
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Usage History</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Total Units (kWh)</th>
            <th>Total Bill (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4">No records found</td>
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
