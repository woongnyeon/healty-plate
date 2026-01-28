package com.healthy_plate.post.domain.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "draft")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Draft {

    @Id
    @Column(name = "draft_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "writer_id")
    private Long writerId;

    @OneToMany(mappedBy = "draft", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostImage> draftImages = new ArrayList<>();

    @Column(length = 200, name = "title")
    private String title;

    @Column(length = 150, name = "description")
    private String description;

    @Column(name = "content")
    private String content;

    @Column(name = "thumbnail_image_url")
    private String thumbnailImageUrl;

    public static Draft createByWriter(final Long writerId) {
        final Draft draft = new Draft();
        draft.writerId = writerId;
        return draft;
    }

    public void addImage(final PostImage image) {
        draftImages.add(image);
        image.assignToDraft(this);
    }

    public void removeImage(final PostImage image) {
        draftImages.remove(image);
    }

    public List<PostImage> getImages() {
        return new ArrayList<>(draftImages);
    }
}
