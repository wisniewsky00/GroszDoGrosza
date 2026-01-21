package pl.groszdogrosza.backend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import pl.groszdogrosza.backend.portfolio.Portfolio;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="id")
  private Long id;

  @Column(name="username")
  private String username;

  @Column(name="email")
  private String email;
  
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(name="password")
  private String password;

  @Column(name="created_at")
  private LocalDateTime createTime;

  @Column(name="role")
  private String role;

  @Column(name = "email_verified", nullable = false)
  private Boolean emailVerified;

  @PrePersist
  protected void onCreate() {
    this.createTime = LocalDateTime.now();
    this.emailVerified = false;
  }

  public Collection<SimpleGrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_" + this.role));
  }

  @OneToMany(
          mappedBy = "owner",
          cascade = CascadeType.ALL,
          orphanRemoval = true
  )
  private List<Portfolio> portfolios;

}
