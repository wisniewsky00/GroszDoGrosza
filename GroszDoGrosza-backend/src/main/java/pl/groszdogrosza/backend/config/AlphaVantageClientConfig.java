package pl.groszdogrosza.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

@Configuration
public class AlphaVantageClientConfig {

    @Bean
    RestClient alphaVantageRestClient() {
        return RestClient.builder()
                .baseUrl("https://www.alphavantage.co")
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}

