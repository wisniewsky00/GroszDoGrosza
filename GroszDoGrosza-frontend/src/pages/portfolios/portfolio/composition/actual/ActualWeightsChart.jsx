import React, { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { assetLabelMap } from "../model/assetTypes";
import "./ActualWeightsChart.css";

const COLORS = ["#2FAF6E", "#3B82F6", "#F59E0B", "#8B5CF6", "#EF4444"];

const renderLabel = ({ cx, cy, midAngle, outerRadius, index, payload, value, isMobile }) => {
  if (!payload) return null;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + (isMobile ? 8 : 32);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const color = COLORS[index % COLORS.length];
  const label = payload.label ?? payload.asset ?? "";
  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={isMobile ? 11 : 14}
    >
      {label}{" "}
      <tspan fontWeight="700">
        {value}%
      </tspan>
    </text>
  );
};

export function ActualWeightsChart({
  transactions = [],
  modelWeights = [],
  currentValues = {},
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [balanceOpen, setBalanceOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  const { totals, sum, data } = useMemo(() => {
    const totalsLocal = {};
    let sumLocal = 0;

    const buys = transactions.filter(t => t.type === "BUY");
    const sells = transactions.filter(t => t.type === "SELL");

    const sellsByBuy = {};
    sells.forEach(s => {
      if (!s.sourceTransactionId) return;
      sellsByBuy[s.sourceTransactionId] = sellsByBuy[s.sourceTransactionId] || [];
      sellsByBuy[s.sourceTransactionId].push(s);
    });

    const isQuantityAsset = (asset) =>
      ["AKCJE", "KRYPTOWALUTY", "OBLIGACJE_SKARBOWE"].includes(asset);

    buys.forEach(buy => {
      const id = buy.id;
      const asset = buy.asset;
      const rawCurrent = currentValues?.[id] ?? currentValues?.[asset] ?? buy.value ?? 0;
      let currentNum = Number(rawCurrent);
      if (!Number.isFinite(currentNum) || currentNum <= 0) return;

      if (isQuantityAsset(asset)) {
        const buyAmount = Number(buy.metadata?.amount) || 0;
        const sold = (sellsByBuy[id] || [])
          .reduce((acc, s) => acc + (Number(s.metadata?.sellAmount) || 0), 0);
        const remaining = Math.max(0, buyAmount - sold);
        const ratio = buyAmount ? remaining / buyAmount : 0;
        const adjusted = currentNum * ratio;

        totalsLocal[asset] = (totalsLocal[asset] || 0) + adjusted;
        sumLocal += adjusted;
      } else {
        const soldWhole = (sellsByBuy[id] || []).length > 0;
        if (!soldWhole) {
          totalsLocal[asset] = (totalsLocal[asset] || 0) + currentNum;
          sumLocal += currentNum;
        }
      }
    });

    if (sumLocal === 0) {
      return { totals: {}, sum: 0, data: [] };
    }

    const raw = Object.entries(totalsLocal).map(([asset, value]) => ({
      asset,
      label: assetLabelMap[asset] ?? asset,
      value,
      percentRaw: (value / sumLocal) * 100,
      percentRounded: 0,
    }));

    let roundedSum = 0;
    raw.forEach((r) => {
      r.percentRounded = Math.round(r.percentRaw);
      roundedSum += r.percentRounded;
    });

    if (raw.length > 0) {
      const diff = 100 - roundedSum;
      if (diff !== 0) {
        let maxIdx = 0;
        let maxVal = -Infinity;
        raw.forEach((r, i) => {
          if (r.percentRaw > maxVal) {
            maxVal = r.percentRaw;
            maxIdx = i;
          }
        });
        raw[maxIdx].percentRounded += diff;
      }
    }

    const finalData = raw.map((r) => ({
      asset: r.asset,
      label: r.label,
      value: r.percentRounded,
      _rawValue: r.value,
    }));

    return { totals: totalsLocal, sum: sumLocal, data: finalData };
  }, [transactions, currentValues]);

  const formatPLN = (value, digits = 0) =>
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);

  const balanceInfo = useMemo(() => {
    return (Array.isArray(modelWeights) ? modelWeights : []).map((mw) => {
      const targetValue = (Number(mw.value) / 100) * sum; // PLN
      const actualValue = totals[mw.asset] || 0;
      const diff = targetValue - actualValue;
      return {
        asset: mw.asset,
        label: assetLabelMap[mw.asset] ?? mw.asset,
        targetValue,
        actualValue,
        diff,
      };
    });
  }, [modelWeights, totals, sum]);

  if (!sum || sum === 0 || !data.length) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0];
    const label = p.payload.label ?? p.payload.asset;
    const percent = p.value;
    const raw = p.payload._rawValue ?? 0;
    return (
      <div className="recharts-tooltip">
        <div><strong>{label}</strong></div>
        <div>{formatPLN(raw, 2)} zł</div>
        <div>{percent}%</div>
      </div>
    );
  };

  return (
    <div className="chart-container actual-weights-chart">
      <ResponsiveContainer width="100%" height={isMobile ? 420 : 360}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={(props) => renderLabel({ ...props, isMobile })}
            labelLine={!isMobile}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <button className="balance-toggle" onClick={() => setBalanceOpen((v) => !v)}>
        {balanceOpen ? "Ukryj" : "Zrównoważenie"}
      </button>

      <div className={`balance-panel ${balanceOpen ? "open" : ""}`} aria-hidden={!balanceOpen}>
        <div className="balance-title">Zrównoważenie do wag modelowych</div>

        {balanceInfo.map((b) => (
          <div
            key={b.asset}
            className={`balance-row ${b.diff > 0 ? "buy" : b.diff < 0 ? "sell" : "ok"}`}
          >
            <span>{b.label}</span>
            <span>
              {b.diff > 0 ? "+" : ""}
              {formatPLN(b.diff, 0)} zł
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
