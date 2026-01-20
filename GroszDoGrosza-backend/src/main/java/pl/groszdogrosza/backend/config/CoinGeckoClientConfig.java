package pl.groszdogrosza.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

@Configuration
public class CoinGeckoClientConfig {

    @Bean
    RestClient coinGeckoRestClient() {
        return RestClient.builder()
                .baseUrl("https://api.coingecko.com/api/v3")
                .defaultHeader("x-cg-demo-api-key", "CG-rqWwqUZgsZKuXC5hcTYYrY2v")
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
