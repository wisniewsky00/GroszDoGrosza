package pl.groszdogrosza.backend.dto;

import pl.groszdogrosza.backend.transaction.asset.AssetType;
import java.math.BigDecimal;

public record ModelWeightRequest(
        AssetType asset,
        BigDecimal value
) {}
