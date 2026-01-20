package pl.groszdogrosza.backend.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ModelWeightRepository
        extends JpaRepository<ModelWeight, Long> {

    List<ModelWeight> findByPortfolioId(Long portfolioId);
    @Modifying
    @Query("delete from ModelWeight mw where mw.portfolio.id = :portfolioId")
    void deleteByPortfolioId(@Param("portfolioId") Long portfolioId);
}

