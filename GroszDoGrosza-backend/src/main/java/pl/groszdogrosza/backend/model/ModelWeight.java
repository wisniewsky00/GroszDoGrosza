package pl.groszdogrosza.backend.model;

import jakarta.persistence.*;
import lombok.*;
import pl.groszdogrosza.backend.transaction.asset.AssetType;
import pl.groszdogrosza.backend.portfolio.Portfolio;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "model_weights",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"portfolio_id", "asset_type"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModelWeight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;

    @Enumerated(EnumType.STRING)
    @Column(name = "asset_type", nullable = false)
    private AssetType assetType;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

