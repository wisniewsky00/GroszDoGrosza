import { useEffect, useState } from "react";
import { backendApi } from "../../../../../../../services/backendApi";

export function useCryptoCurrentValue(tx) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!tx || tx.asset !== "KRYPTOWALUTY") {
      setResult(null);
      return;
    }

    

    const { coinId, amount } = tx.metadata ?? {};
    const buyValue = Number(tx.value);

    if (!coinId || !amount || !buyValue) {
      setResult(null);
      return;
    }

    backendApi
      .get(`/assets/crypto/${coinId}/price`)
      .then((res) => {
        if (!res.data?.fromApi) {
          setResult(null);
          return;
        }

        const pricePln = Number(res.data.pricePln);
        const currentValue = pricePln * Number(amount);

        const diffPercent =
          ((currentValue - buyValue) / buyValue) * 100;

        setResult({
          currentValue,
          diffPercent,
        });
      })
      .catch(() => setResult(null));
  }, [tx]);

  return result;
}
