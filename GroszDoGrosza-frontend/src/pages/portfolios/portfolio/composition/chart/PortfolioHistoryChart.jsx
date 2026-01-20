import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";

const COLORS = {
  invested: "#2563eb", // niebieski
  current: "#f97316",  // pomarańczowy
};

const formatPLN = (value) =>
  new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export function PortfolioHistoryChart({ history }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={history} margin={{ top: 20, right: 24, left: 10, bottom: 24 }}>
        {/* delikatna siatka */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#6b7280" }}
          tickMargin={8}
        >
          <Label
            value="Data"
            position="insideBottom"
            offset={-18}
            style={{ fill: "#6b7280", fontSize: 12 }}
          />
        </XAxis>

        <YAxis
          tick={{ fontSize: 12, fill: "#6b7280" }}
          tickFormatter={(v) => formatPLN(v)}
        >
          <Label
            value="Wartość (zł)"
            angle={-90}
            position="insideLeft"
            offset={-4}
            style={{ fill: "#6b7280", fontSize: 12 }}
          />
        </YAxis>

        <Tooltip
          formatter={(value, name) => [`${formatPLN(value)} zł`, name]}
          labelStyle={{ fontWeight: 600 }}
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            fontSize: 13,
          }}
        />

        <Line
          type="monotone"
          dataKey="invested"
          name="Zainwestowano"
          stroke={COLORS.invested}
          strokeWidth={2}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="current"
          name="Wartość aktualna"
          stroke={COLORS.current}
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
