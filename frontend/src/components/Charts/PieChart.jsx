import { PieChart, Pie, Tooltip } from "recharts";

export default function UsagePieChart({ data }) {
  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" fill="#82ca9d" />
      <Tooltip />
    </PieChart>
  );
}
