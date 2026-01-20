package pl.groszdogrosza.backend.dto;

import java.util.Map;

public record CoinGeckoPriceResponse(
        Map<String, Map<String, Object>> prices
) {
}
