package com.healthy_plate.post.infrastructure;

import com.healthy_plate.post.domain.model.Draft;
import com.healthy_plate.post.domain.repository.DraftRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaDraftRepository extends JpaRepository<Draft,Long>, DraftRepository {
}
