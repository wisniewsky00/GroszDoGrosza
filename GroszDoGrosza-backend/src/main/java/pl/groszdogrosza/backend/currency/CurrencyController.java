package pl.groszdogrosza.backend.currency;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.groszdogrosza.backend.dto.CurrencyRateResult;

@RestController
@RequestMapping("/api/currency")
@RequiredArgsConstructor
public class CurrencyController {

    private final CurrencyService currencyService;

    @GetMapping("/rate")
    public CurrencyRateResult rate(
            @RequestParam String from,
            @RequestParam String to
    ) {
        return currencyService.getRate(from.toUpperCase(), to.toUpperCase());
    }
}

