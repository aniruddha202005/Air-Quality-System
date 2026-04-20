import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [fan, setFan] = useState("OFF");

  // FETCH SENSOR DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const fetchFan = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/fan");
        const json = await res.json();
        setFan(json.status);
      } catch (err) {
        console.error("Error fetching fan status:", err);
      }
    };

    fetchData();
    fetchFan();

    const interval = setInterval(fetchData, 2000);
    const fanInterval = setInterval(fetchFan, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(fanInterval);
    };
  }, []);

  const latest = data.length > 0 ? data[data.length - 1] : {};

  // STATUS LOGIC
  const getStatus = (pm25 = 0) => {
    if (pm25 < 50) return "Good";
    if (pm25 < 100) return "Moderate";
    return "Hazardous";
  };

  const getStatusColor = (pm25 = 0) => {
    if (pm25 < 50) return "#22c55e";
    if (pm25 < 100) return "#facc15";
    return "#ef4444";
  };

  // LOADING STATE
  if (data.length === 0) {
    return (
      <h2 style={{ color: "white", padding: "20px" }}>
        Loading sensor data...
      </h2>
    );
  }

  return (
    <div className="container">
      {/* TITLE */}
      <h1 className="title">Indoor Air Quality Dashboard</h1>

      {/* STATUS */}
      <h2
        className="status"
        style={{ color: getStatusColor(latest?.pm25) }}
      >
        Status: {getStatus(latest?.pm25)}
      </h2>

      {/* CARDS */}
      <div className="grid">
        {[
          { label: "Temperature", value: latest?.temperature || 0, unit: "°C" },
          { label: "Humidity", value: latest?.humidity || 0, unit: "%" },
          { label: "Gas", value: latest?.gas || 0, unit: "" },
          { label: "PM2.5", value: latest?.pm25 || 0, unit: "" }
        ].map((item, index) => (
          <div key={index} className="card">
            <h3>{item.label}</h3>
            <h1>
              {item.value} {item.unit}
            </h1>
          </div>
        ))}
      </div>
      <div style={{ width: "100%", height: 300, marginTop: "40px" }}>
  <h2 style={{ color: "white", marginBottom: "10px" }}>
    PM2.5 Trend
  </h2>

  <ResponsiveContainer>
    <LineChart data={data}>
      <CartesianGrid stroke="#444" strokeDasharray="5 5" />
      <XAxis dataKey="pm25" stroke="#ccc" />
      <YAxis stroke="#ccc" />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="pm25"
        stroke="#00e5ff"
        strokeWidth={3}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

      {/* FAN CONTROL */}
      <button
        className="btn"
        onClick={async () => {
          try {
            await fetch("http://127.0.0.1:8000/control?action=toggle");
          } catch (err) {
            console.error("Error toggling fan:", err);
          }
        }}
      >
        Fan: {fan}
      </button>
    </div>
  );
}