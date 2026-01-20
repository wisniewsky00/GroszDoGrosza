import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { assetLabelMap } from "./assetTypes";

const COLORS = ["#2FAF6E", "#3B82F6", "#F59E0B", "#8B5CF6", "#EF4444"];

const renderLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  index,
  name,
  value,
  isMobile,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + (isMobile ? 8 : 32);

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const color = COLORS[index % COLORS.length];
  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={isMobile ? 11 : 14}
    >
      {name}{" "}
      <tspan fontWeight="700">
        {value}%
      </tspan>
    </text>
  );
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0];
  const label = p.payload.label ?? p.payload.asset ?? "";
  const val = p.value;
  return (
    <div className="recharts-tooltip">
      <div style={{ fontWeight: 700 }}>{label}</div>
      <div>{val}%</div>
    </div>
  );
}

export function ModelWeightsChart({ data }) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 640
  );

  useEffect(() => {
    const onResize = () =>
      setIsMobile(window.innerWidth < 640);

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const chartData = data.map((d) => ({
    ...d,
    label: assetLabelMap[d.asset] ?? d.asset,
  }));

  return (
    <div className="chart-container">
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 420 : 360}
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={(props) =>
              renderLabel({ ...props, isMobile })
            }
            labelLine={!isMobile}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
