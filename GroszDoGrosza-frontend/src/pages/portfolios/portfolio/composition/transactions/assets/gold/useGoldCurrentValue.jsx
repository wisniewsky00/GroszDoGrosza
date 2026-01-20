import { useEffect, useState } from "react";
import { backendApi } from "../../../../../../../services/backendApi";

const OZ_TO_GRAMS = 31.1034768;

export function useGoldCurrentValue(tx) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    
    if (!tx || tx.asset !== "ZLOTO") {
      setResult(null);
      return;
    }

    backendApi.get("/assets/gold/price").then(res => {
      const pricePerGram = res.data.pricePerGram;

      const amount = Number(tx.metadata.amount);
      const grams =
        tx.metadata.unit === "oz"
          ? amount * OZ_TO_GRAMS
          : amount;

      const currentValue = grams * pricePerGram;
      const buyValue = Number(tx.value);

      const diffPercent =
        ((currentValue - buyValue) / buyValue) * 100;

      setResult({
        currentValue,
        diffPercent
      });
    });
  }, [tx]);

  return result;
}
