package pl.groszdogrosza.backend.transaction.asset.gold;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.groszdogrosza.backend.dto.GoldPriceResult;

@Service
@RequiredArgsConstructor
public class GoldService {

    private final GoldNBPClient client;

    public GoldPriceResult getGoldPriceHint() {
        return client.tryGetLatestGoldPrice()
                .map(r -> GoldPriceResult.api(
                        r.cena(),
                        r.data()
                ))
                .orElseGet(() ->
                        GoldPriceResult.fallback(
                                "Nie udało się pobrać ceny z NBP"
                        )
                );
    }
}
