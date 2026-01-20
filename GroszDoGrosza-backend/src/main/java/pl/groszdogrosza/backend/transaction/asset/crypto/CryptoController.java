package pl.groszdogrosza.backend.transaction.asset.crypto;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.dto.CryptoPriceResult;

@RestController
@RequestMapping("/api/assets/crypto")
@RequiredArgsConstructor
public class CryptoController {

    private final CryptoService cryptoService;

    @GetMapping("/{coinId}/price")
    public CryptoPriceResult price(@PathVariable String coinId) {
        return cryptoService.getCryptoPriceHint(coinId.toLowerCase());
    }
}
