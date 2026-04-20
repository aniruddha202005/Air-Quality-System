import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Charts({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="pm25" />
    </LineChart>
  );
}