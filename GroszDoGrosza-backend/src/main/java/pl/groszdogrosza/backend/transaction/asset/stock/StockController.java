package pl.groszdogrosza.backend.transaction.asset.stock;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.dto.StockPriceResult;
import pl.groszdogrosza.backend.dto.StockSearchResult;

import java.util.List;

@RestController
@RequestMapping("/api/assets/stocks")
@RequiredArgsConstructor
public class StockController {

    private final StockService service;

    @GetMapping("/search")
    public List<StockSearchResult> search(@RequestParam String q) {
        return service.search(q);
    }

    @GetMapping("/{symbol}/price")
    public StockPriceResult price(@PathVariable String symbol) {
        return service.price(symbol);
    }
}

