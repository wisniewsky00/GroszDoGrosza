package pl.groszdogrosza.backend.dto;

import java.math.BigDecimal;

public record GoldPriceResponse(
        String data,
        BigDecimal cena
) {}
