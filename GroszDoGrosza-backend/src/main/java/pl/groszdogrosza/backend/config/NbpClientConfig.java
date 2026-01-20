package pl.groszdogrosza.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

@Configuration
public class NbpClientConfig {

    @Bean
    RestClient nbpRestClient() {
        return RestClient.builder()
                .baseUrl("http://api.nbp.pl/api")
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
