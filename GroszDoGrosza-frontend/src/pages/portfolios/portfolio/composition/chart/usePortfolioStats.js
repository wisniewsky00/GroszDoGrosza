import { useMemo } from "react";

export function usePortfolioStats(transactions = [], currentValues = {}) {
  return useMemo(() => {
    if (!transactions.length) {
      return {
        investedTotal: 0,
        currentTotal: 0,
        diffPercent: 0,
        history: [],
      };
    }

    const sorted = [...transactions]
      .map(tx => ({
        ...tx,
        __date: new Date(tx.transactionDate ?? tx.createdAt),
      }))
      .sort((a, b) => a.__date - b.__date);

    let investedRunning = 0;

    const history = sorted.map(tx => {
      investedRunning += Number(tx.value) || 0;

      const currentTotal = Object.values(currentValues)
        .filter(v => Number.isFinite(v))
        .reduce((a, b) => a + b, 0);

      return {
        date: tx.__date.toISOString().slice(0, 10),
        invested: investedRunning,
        current: currentTotal,
      };
    });

    const investedTotal = investedRunning;
    const currentTotal = Object.values(currentValues)
      .filter(v => Number.isFinite(v))
      .reduce((a, b) => a + b, 0);

    const diffPercent =
      investedTotal > 0
        ? ((currentTotal - investedTotal) / investedTotal) * 100
        : 0;

    return {
      investedTotal,
      currentTotal,
      diffPercent,
      history,
    };
  }, [transactions, currentValues]);
}
