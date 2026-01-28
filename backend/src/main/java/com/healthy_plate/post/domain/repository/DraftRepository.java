package com.healthy_plate.post.domain.repository;

import com.healthy_plate.post.domain.model.Draft;

public interface DraftRepository {
    Draft save(Draft draft);
}
