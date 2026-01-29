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

    const sellsByBuyId = {};
    sorted.forEach(t => {
      if (t.type === "SELL" && t.sourceTransactionId) {
        const id = t.sourceTransactionId;
        sellsByBuyId[id] = sellsByBuyId[id] || [];
        sellsByBuyId[id].push(t);
      }
    });

    const isQuantityAsset = (asset) =>
      ["AKCJE", "KRYPTOWALUTY", "OBLIGACJE_SKARBOWE"].includes(asset);

    const computeCurrentTotalAt = (date) => {
      const buys = sorted.filter(t => t.type === "BUY" && t.__date <= date);

      let total = 0;
      for (const buy of buys) {
        const id = buy.id;
        const asset = buy.asset;
        const rawCurrent = currentValues?.[id] ?? currentValues?.[asset] ?? buy.value ?? 0;
        const currentNum = Number(rawCurrent);
        if (!Number.isFinite(currentNum) || currentNum <= 0) continue;

        if (isQuantityAsset(asset)) {
          const buyAmount = Number(buy.metadata?.amount) || 0;
          const soldUpTo = (sellsByBuyId[id] || [])
            .filter(s => new Date(s.transactionDate ?? s.createdAt) <= date)
            .reduce((acc, s) => acc + (Number(s.metadata?.sellAmount) || 0), 0);

          const remaining = Math.max(0, buyAmount - soldUpTo);
          const ratio = buyAmount ? remaining / buyAmount : 0;
          total += currentNum * ratio;
        } else {
          const soldBefore = (sellsByBuyId[id] || [])
            .some(s => new Date(s.transactionDate ?? s.createdAt) <= date);
          if (!soldBefore) {
            total += currentNum;
          }
        }
      }
      return total;
    };

    let investedRunning = 0;
    const history = sorted.map(tx => {

      if (tx.type === "BUY") {
        investedRunning += Number(tx.value) || 0;
      }

      if (tx.type === "SELL") {
        investedRunning -= Number(tx.value) || 0;
      }

      investedRunning = Math.max(0, investedRunning);

      const currentTotal = computeCurrentTotalAt(tx.__date);

      return {
        date: tx.__date.toISOString().slice(0, 10),
        invested: investedRunning,
        current: currentTotal,
      };
    });


    const investedTotal = investedRunning;
    const currentTotal = computeCurrentTotalAt(sorted[sorted.length - 1].__date);

    const diffPercent =
      investedTotal > 0 ? ((currentTotal - investedTotal) / investedTotal) * 100 : 0;

    return {
      investedTotal,
      currentTotal,
      diffPercent,
      history,
    };
  }, [transactions, currentValues]);
}
