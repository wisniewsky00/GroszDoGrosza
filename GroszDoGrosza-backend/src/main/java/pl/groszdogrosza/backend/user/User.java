package pl.groszdogrosza.backend.user;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
  private Integer id;

  @Column(name="username")
  private String username;

  @Column(name="email")
  private String email;
  
  @Column(name="password")
  private String password;

  @Column(name="created_at")
  private LocalDateTime createTime;

  @Column(name="role")
  private String role;

  @PrePersist
  protected void onCreate() {
    this.createTime = LocalDateTime.now();
  }
}
