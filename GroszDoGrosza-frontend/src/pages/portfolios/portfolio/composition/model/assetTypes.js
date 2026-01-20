export const ASSET_TYPES = [
  { value: "AKCJE", label: "Akcje" },
  { value: "OBLIGACJE_SKARBOWE", label: "Obligacje skarbowe" },
  { value: "ZLOTO", label: "Złoto" },
  { value: "NIERUCHOMOSCI", label: "Nieruchomości" },
  { value: "KRYPTOWALUTY", label: "Kryptowaluty" },
];

export const assetLabelMap = ASSET_TYPES.reduce((acc, a) => {
  acc[a.value] = a.label;
  return acc;
}, {});