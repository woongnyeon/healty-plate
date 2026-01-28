package com.healthy_plate.post.application;

import com.healthy_plate.post.domain.model.Draft;
import com.healthy_plate.post.domain.repository.DraftRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DraftService {

    private final DraftRepository draftRepository;

    public Long create(final Long writerId) {
        final Draft draft = Draft.createByWriter(writerId);
        final Draft savedDraft = draftRepository.save(draft);
        return savedDraft.getId();
    }
}
