import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

export default function UsageBarChart({ data, onBarClick }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="totalUnits" fill="#8884d8" onClick={onBarClick}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill="#8884d8" style={{ cursor: 'pointer' }} />
        ))}
      </Bar>
    </BarChart>
  );
}
