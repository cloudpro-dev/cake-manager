package com.waracle.cakemgr.repository;

import javax.persistence.*;

/**
 * Persistent entity which represents a Cake
 *
 * @author Gavin Martin
 */
@Entity
@Table(name = "CAKES")
public class CakeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="created_by")
    private String createdBy;

    public CakeEntity() {}

    public CakeEntity(String title, String description, String imageUrl) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public CakeEntity(String title, String description, String imageUrl, String createdBy) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdBy = createdBy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public String toString() {
        return "CakeEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", createdBy='" + createdBy + '\'' +
                '}';
    }
}
