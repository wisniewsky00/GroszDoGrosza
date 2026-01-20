import { BondFields } from "./bond/BondFields";
import { CryptoFields } from "./crypto/CryptoFields";
import { GoldFields } from "./gold/GoldFields";
import { RealEstateFields } from "./real-estate/RealEstateFields";
import { StockFields } from "./stock/StockFields";

export function AssetSpecificFields({ asset, metadata, onChange, onValueCalculated, showErrors }) {
  switch (asset) {
    case "ZLOTO":
      return (
        <GoldFields
          value={metadata}
          onChange={onChange}
          onValueCalculated={onValueCalculated}
          showErrors={showErrors}
        />
      );

    case "NIERUCHOMOSCI":
      return (
        <RealEstateFields
          value={metadata}
          onChange={onChange}
          onValueCalculated={onValueCalculated}
          showErrors={showErrors}
        />
      )

    case "KRYPTOWALUTY":
      return (
        <CryptoFields
          value={metadata}
          onChange={onChange}
          onValueCalculated={onValueCalculated}
          showErrors={showErrors}
        />
      )

    case "AKCJE":
      return (
        <StockFields
          value={metadata}
          onChange={onChange}
          onValueCalculated={onValueCalculated}
          showErrors={showErrors}
        />
      );

    case "OBLIGACJE_SKARBOWE":
      return (
        <BondFields
          value={metadata}
          onChange={onChange}
          onValueCalculated={onValueCalculated}
          showErrors={showErrors}
        />
      )

    default:
      return null;
  }
}
