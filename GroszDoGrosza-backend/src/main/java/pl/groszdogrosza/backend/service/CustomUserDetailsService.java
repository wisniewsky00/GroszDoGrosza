package pl.groszdogrosza.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import pl.groszdogrosza.backend.user.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  
  private final UserRepository userRepository;

  @Autowired
  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      return userRepository.findByEmail(email)
          .map(user -> new org.springframework.security.core.userdetails.User(
                  user.getEmail(),
                  user.getPassword(),
                  user.getAuthorities()
          ))
          .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }

}
