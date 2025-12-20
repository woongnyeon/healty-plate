package com.healthy_plate.user.infrastructure;

import com.healthy_plate.auth.domain.model.OAuth2Provider;
import com.healthy_plate.user.domain.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByProviderAndProviderId(OAuth2Provider provider, String providerId);
}
