package com.waracle.cakemgr.domain;

import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Data transfer object which represents a Cake
 * Used for communication between server and client with Javax validation
 *
 * @author Gavin Martin
 */
public class CakeDto {
    private final Long id;
    @NotBlank
    @Size(max=250)
    private final String title;
    @NotBlank
    @Size(max=250)
    private final String description;
    @NotBlank
    @Size(max=4000)
    @URL
    private final String imageUrl;
    private String createdBy;

    public CakeDto(Long id, String title, String description, String imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
