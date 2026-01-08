import { useEffect, useState } from "react";
import { getMyUsage } from "../../api/userApi";
import UsageBarChart from "../../components/Charts/BarChart";
import UsagePieChart from "../../components/Charts/PieChart";

export default function UserGraphs() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.username) {
      getMyUsage(user.username).then((res) => {
        setBarData(res.data);

        // pie data (month-wise)
        const pie = res.data.map((d) => ({
          name: d.month,
          value: d.totalUnits,
        }));
        setPieData(pie);
      });
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Electricity Usage Graphs</h2>

      <h4>Month-wise Usage (Bar Chart)</h4>
      <UsageBarChart data={barData} />

      <h4>Units Distribution (Pie Chart)</h4>
      <UsagePieChart data={pieData} />
    </div>
  );
}
