import { useEffect, useState } from "react";
import { backendApi } from "../../../services/backendApi";

const OZ_TO_GRAMS = 31.1034768;

export function useCurrentValues(transactions) {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (!transactions.length) {
      setValues({});
      return;
    }

    async function load() {
      const result = {};

      const goldTxs = transactions.filter(t => t.asset === "ZLOTO");
      if (goldTxs.length) {
        const res = await backendApi.get("/assets/gold/price");
        const pricePerGram = res.data.pricePerGram;

        goldTxs.forEach(tx => {
          const amount = Number(tx.metadata.amount);
          const grams =
            tx.metadata.unit === "oz"
              ? amount * OZ_TO_GRAMS
              : amount;

          result[tx.id] = grams * pricePerGram;
        });
      }

      const realEstateTxs = transactions.filter(t => t.asset === "NIERUCHOMOSCI");
      realEstateTxs.forEach(tx => {
        const areaM2 = Number(tx.metadata.areaM2);
        const currentPricePerM2 = Number(tx.metadata.currentPricePerM2);
        if (areaM2 > 0 && currentPricePerM2 > 0) {
          result[tx.id] = areaM2 * currentPricePerM2;
        }
      });

      const cryptoTxs = transactions.filter(t => t.asset === "KRYPTOWALUTY");

      for (const tx of cryptoTxs) {
        const { coinId, amount } = tx.metadata ?? {};
        const qty = Number(amount);

        if (!coinId || qty <= 0) continue;

        try {
          const res = await backendApi.get(
            `/assets/crypto/${coinId}/price`
          );

          if (res.data?.fromApi) {
            result[tx.id] = qty * Number(res.data.pricePln);
          }
        } catch {
          // celowo ignorujemy – brak ceny ≠ crash
        }
      }

      const stockTxs = transactions.filter(t => t.asset === "AKCJE");

      for (const tx of stockTxs) {
        const qty = Number(tx.metadata?.amount);
        if (!qty || qty <= 0) continue;

        let currentPrice = null;


        try {
          if (tx.metadata?.symbol) {
            const res = await backendApi.get(`/assets/stocks/${tx.metadata.symbol}/price`);
            const apiPrice = Number(res.data?.pricePln);
            if (Number.isFinite(apiPrice) && apiPrice > 0) {
              currentPrice = apiPrice;
            }
          }
        } catch {
          //
        }


        if (currentPrice === null) {
          const fallback = Number(tx.metadata?.currentPrice);
          if (Number.isFinite(fallback) && fallback > 0) {
            currentPrice = fallback;
          }
        }

        if (currentPrice !== null) {
          result[tx.id] = qty * currentPrice;
        }
      }

      const bondTxs = transactions.filter(t => t.asset === "OBLIGACJE_SKARBOWE");

      bondTxs.forEach(tx => {
        const cv = Number(tx.metadata?.currentValue);

        if (Number.isFinite(cv) && cv > 0) {
          result[tx.id] = cv;
        }
      });


      setValues(result);
    }


    load();
  }, [transactions]);

  return values;
}
