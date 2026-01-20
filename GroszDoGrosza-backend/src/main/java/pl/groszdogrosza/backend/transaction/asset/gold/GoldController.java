package pl.groszdogrosza.backend.transaction.asset.gold;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.groszdogrosza.backend.dto.GoldPriceResult;

@RestController
@RequestMapping("/api/assets/gold")
@RequiredArgsConstructor
public class GoldController {

    private final GoldService goldService;

    @GetMapping("/price")
    public GoldPriceResult price() {
        return goldService.getGoldPriceHint();
    }
}

