package pl.groszdogrosza.backend.transaction.asset.crypto;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.groszdogrosza.backend.dto.CryptoPriceResult;

@Service
@RequiredArgsConstructor
public class CryptoService {

    private final CoinGeckoClient client;

    public CryptoPriceResult getCryptoPriceHint(String coinId) {
        return client.tryGetPricePln(coinId)
                .map(price -> CryptoPriceResult.api(coinId, price))
                .orElseGet(() ->
                        CryptoPriceResult.fallback(coinId,"Nie znaleziono coina: " + coinId + ". Podaj wartości ręcznie.")
                );
    }
}
